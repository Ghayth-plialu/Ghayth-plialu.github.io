/* ============================================================
   PLIALU — script.js
   Logique commune : navigation, calcul, utilitaires
   Auteur : Ghayth Benyoucef — Alternant technico-commercial
   Année  : 2026
============================================================ */

// ════════════════════════════════════════
// UTILITAIRES GÉNÉRAUX
// ════════════════════════════════════════

/**
 * Formate un nombre en euros HT
 * @param {number} val
 * @returns {string} ex: "12,50 € HT"
 */
function formatEuro(val) {
  return parseFloat(val).toFixed(2).replace(".", ",") + " € HT";
}

/**
 * Formate un nombre en euros TTC
 * @param {number} val
 * @returns {string} ex: "15,00 € TTC"
 */
function formatEuroTTC(val) {
  return parseFloat(val).toFixed(2).replace(".", ",") + " € TTC";
}

/**
 * Arrondi à 2 décimales
 * @param {number} val
 * @returns {number}
 */
function arrondi(val) {
  return Math.round(val * 100) / 100;
}

/**
 * Génère un numéro de devis unique
 * Format : PLI-YYYYMMDD-XXXX
 * @returns {string}
 */
function genererNumeroDevis() {
  const now   = new Date();
  const date  = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand  = Math.floor(1000 + Math.random() * 9000);
  return `PLI-${date}-${rand}`;
}

/**
 * Retourne la date du jour formatée JJ/MM/AAAA
 * @returns {string}
 */
function dateAujourdhui() {
  const now = new Date();
  return now.toLocaleDateString("fr-FR");
}

// ════════════════════════════════════════
// CALCUL PRIX UNITAIRE
// ════════════════════════════════════════

/**
 * Calcule le prix HT au ml pour une pièce
 * @param {string} categorie  — clé dans TARIFS
 * @param {string} epaisseur  — "10" | "15" | "20" | "25" | "30"
 * @param {string} finition   — clé dans COEFF_FINITION
 * @returns {number} prix HT au ml
 */
function calculPrixML(categorie, epaisseur, finition) {
  const base  = TARIFS[categorie]?.[epaisseur] ?? 0;
  const coeff = COEFF_FINITION[finition]       ?? 1;
  return arrondi(base * coeff);
}

/**
 * Calcule le montant HT total pour une ligne
 * @param {number} prixML   — prix HT au ml
 * @param {number} quantite — en ml
 * @returns {number}
 */
function calculLigneHT(prixML, quantite) {
  return arrondi(prixML * quantite);
}

/**
 * Calcule la TVA sur un montant HT
 * @param {number} ht
 * @returns {number}
 */
function calculTVA(ht) {
  return arrondi(ht * TVA);
}

/**
 * Calcule le TTC depuis un HT
 * @param {number} ht
 * @returns {number}
 */
function calculTTC(ht) {
  return arrondi(ht * (1 + TVA));
}

// ════════════════════════════════════════
// REMPLISSAGE DYNAMIQUE DES <SELECT>
// ════════════════════════════════════════

/**
 * Remplit un <select> avec les épaisseurs disponibles
 * @param {string} selectId — id du <select>
 */
function remplirEpaisseurs(selectId) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  sel.innerHTML = `<option value="">-- Épaisseur --</option>`;
  EPAISSEURS.forEach(e => {
    sel.innerHTML += `<option value="${e.valeur}">${e.label}</option>`;
  });
}

/**
 * Remplit un <select> avec les finitions disponibles
 * @param {string} selectId
 */
function remplirFinitions(selectId) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  sel.innerHTML = `<option value="">-- Finition --</option>`;
  FINITIONS.forEach(f => {
    sel.innerHTML += `<option value="${f.valeur}">${f.label}</option>`;
  });
}

/**
 * Remplit un <select> avec les catégories de pièces
 * @param {string} selectId
 */
function remplirCategories(selectId) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  sel.innerHTML = `<option value="">-- Type de pièce --</option>`;
  CATEGORIES.forEach(c => {
    sel.innerHTML += `<option value="${c.valeur}">${c.label}</option>`;
  });
}

// ════════════════════════════════════════
// GESTION LIGNES DE DEVIS
// ════════════════════════════════════════

/** Tableau des lignes du devis en cours */
let lignesDevis = [];

/**
 * Ajoute une ligne au devis
 * @param {object} ligne — { description, categorie, epaisseur, finition, quantite }
 */
function ajouterLigne(ligne) {
  const prixML  = calculPrixML(ligne.categorie, ligne.epaisseur, ligne.finition);
  const totalHT = calculLigneHT(prixML, parseFloat(ligne.quantite));

  lignesDevis.push({
    ...ligne,
    prixML,
    totalHT,
    id: Date.now(),
  });

  rafraichirTableau();
  calculerTotaux();
}

/**
 * Supprime une ligne par son id
 * @param {number} id
 */
function supprimerLigne(id) {
  lignesDevis = lignesDevis.filter(l => l.id !== id);
  rafraichirTableau();
  calculerTotaux();
}

// ════════════════════════════════════════
// AFFICHAGE TABLEAU DES LIGNES
// ════════════════════════════════════════

/**
 * Met à jour le tableau HTML des lignes de devis
 */
function rafraichirTableau() {
  const tbody = document.getElementById("tableau-lignes");
  if (!tbody) return;

  if (lignesDevis.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; color:var(--texte-soft); padding:24px;">
          Aucune ligne ajoutée
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = lignesDevis.map(l => `
    <tr>
      <td>${l.description || "—"}</td>
      <td>${CATEGORIES.find(c => c.valeur === l.categorie)?.label ?? l.categorie}</td>
      <td>${EPAISSEURS.find(e => e.valeur === l.epaisseur)?.label ?? l.epaisseur}</td>
      <td>${FINITIONS.find(f => f.valeur === l.finition)?.label ?? l.finition}</td>
      <td>${parseFloat(l.quantite).toFixed(2)} ml</td>
      <td>${formatEuro(l.prixML)} / ml</td>
      <td><strong>${formatEuro(l.totalHT)}</strong></td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="supprimerLigne(${l.id})">
          🗑️
        </button>
      </td>
    </tr>
  `).join("");
}

// ════════════════════════════════════════
// CALCUL & AFFICHAGE DES TOTAUX
// ════════════════════════════════════════

/**
 * Calcule et affiche les totaux HT / TVA / TTC
 */
function calculerTotaux() {
  const totalHT  = arrondi(lignesDevis.reduce((s, l) => s + l.totalHT, 0));
  const montantTVA = calculTVA(totalHT);
  const totalTTC = calculTTC(totalHT);

  const el = (id, val) => {
    const e = document.getElementById(id);
    if (e) e.textContent = val;
  };

  el("total-ht",  formatEuro(totalHT));
  el("total-tva", formatEuro(montantTVA));
  el("total-ttc", formatEuroTTC(totalTTC));
}

// ════════════════════════════════════════
// RÉINITIALISATION
// ════════════════════════════════════════

/**
 * Vide toutes les lignes du devis en cours
 */
function reinitialiserDevis() {
  if (!confirm("Voulez-vous vraiment vider le devis ?")) return;
  lignesDevis = [];
  rafraichirTableau();
  calculerTotaux();
}

// ════════════════════════════════════════
// INIT AU CHARGEMENT
// ════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  // Remplissage auto des selects si présents sur la page
  remplirCategories("select-categorie");
  remplirEpaisseurs("select-epaisseur");
  remplirFinitions("select-finition");

  // Affichage tableau vide initial
  rafraichirTableau();
  calculerTotaux();
});
