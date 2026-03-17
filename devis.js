// ════════════════════════════════════════
// devis.js — Logique du générateur de devis
// PLIALU · Ghayth Benyoucef · 2026
// ════════════════════════════════════════

// ── Clé localStorage
const STORAGE_KEY = "plialu_lignes";

// ── État local
let lignes = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
let editIndex = null;

// ════════════════════════════════════════
// INIT
// ════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {

  // Numéro de devis auto
  const annee  = new Date().getFullYear();
  const random = String(Math.floor(Math.random() * 900) + 100);
  document.getElementById("devis-numero").value = `DEV-${annee}-${random}`;

  // Date du jour
  const today = new Date().toLocaleDateString("fr-FR");
  document.getElementById("devis-date").value = today;

  // Remplir les selects depuis data.js
  remplirSelectCategories();
  remplirSelectEpaisseurs();
  remplirSelectFinitions();

  // Afficher les lignes existantes
  rafraichirTableau();
  calculerTotaux();

  // Événements
  document.getElementById("btn-ajouter-ligne").addEventListener("click", ajouterLigne);
  document.getElementById("btn-reinitialiser").addEventListener("click", reinitialiserDevis);
  document.getElementById("btn-apercu").addEventListener("click", apercuDevis);
  document.getElementById("btn-pdf").addEventListener("click", genererPDF);
  document.getElementById("apercu-overlay").addEventListener("click", fermerApercuOverlay);
  document.getElementById("btn-fermer-apercu").addEventListener("click", () => {
    document.getElementById("apercu-overlay").style.display = "none";
  });

  // Calcul auto à chaque changement de champ ligne
  ["ligne-categorie", "ligne-epaisseur", "ligne-finition", "ligne-quantite", "ligne-longueur"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", calculerApercuLigne);
  });

  calculerApercuLigne();
});

// ════════════════════════════════════════
// REMPLISSAGE DES SELECTS
// ════════════════════════════════════════

function remplirSelectCategories() {
  const sel = document.getElementById("ligne-categorie");
  if (!sel) return;
  sel.innerHTML = `<option value="">— Choisir —</option>`;
  CATALOGUE.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat.id;
    opt.textContent = cat.label;
    sel.appendChild(opt);
  });
}

function remplirSelectEpaisseurs() {
  const sel = document.getElementById("ligne-epaisseur");
  if (!sel) return;
  sel.innerHTML = `<option value="">— Choisir —</option>`;
  EPAISSEURS.forEach(ep => {
    const opt = document.createElement("option");
    opt.value = ep.valeur;
    opt.textContent = ep.label;
    sel.appendChild(opt);
  });
}

function remplirSelectFinitions() {
  const sel = document.getElementById("ligne-finition");
  if (!sel) return;
  sel.innerHTML = `<option value="">— Choisir —</option>`;
  FINITIONS.forEach(fin => {
    const opt = document.createElement("option");
    opt.value = fin.id;
    opt.textContent = fin.label;
    sel.appendChild(opt);
  });
}

// ════════════════════════════════════════
// CALCUL APERÇU LIGNE (temps réel)
// ════════════════════════════════════════

function calculerApercuLigne() {
  const categorieId = document.getElementById("ligne-categorie")?.value;
  const epaisseur   = parseFloat(document.getElementById("ligne-epaisseur")?.value) || 0;
  const finitionId  = document.getElementById("ligne-finition")?.value;
  const quantite    = parseFloat(document.getElementById("ligne-quantite")?.value) || 0;
  const longueur    = parseFloat(document.getElementById("ligne-longueur")?.value) || 0;

  const prixUnitaire = calculerPrixUnitaire(categorieId, epaisseur, finitionId);
  const totalLigne   = arrondi(prixUnitaire * quantite * longueur);

  const elPrix  = document.getElementById("apercu-prix-unitaire");
  const elTotal = document.getElementById("apercu-total-ligne");

  if (elPrix)  elPrix.textContent  = prixUnitaire > 0 ? formatEuro(prixUnitaire) + " / ml" : "—";
  if (elTotal) elTotal.textContent = totalLigne   > 0 ? formatEuro(totalLigne)              : "—";
}

// ════════════════════════════════════════
// CALCUL PRIX UNITAIRE
// ════════════════════════════════════════

function calculerPrixUnitaire(categorieId, epaisseur, finitionId) {
  if (!categorieId || !epaisseur || !finitionId) return 0;

  const cat    = CATALOGUE.find(c => c.id === categorieId);
  const fin    = FINITIONS.find(f => f.id === finitionId);
  const epData = EPAISSEURS.find(e => e.valeur === epaisseur);

  if (!cat || !fin || !epData) return 0;

  const base = cat.prixBase * epData.coeff * fin.coeff;
  return arrondi(base);
}

// ════════════════════════════════════════
// AJOUTER / MODIFIER UNE LIGNE
// ════════════════════════════════════════

function ajouterLigne() {
  const categorieId  = document.getElementById("ligne-categorie").value;
  const epaisseur    = parseFloat(document.getElementById("ligne-epaisseur").value) || 0;
  const finitionId   = document.getElementById("ligne-finition").value;
  const quantite     = parseFloat(document.getElementById("ligne-quantite").value) || 0;
  const longueur     = parseFloat(document.getElementById("ligne-longueur").value) || 0;
  const description  = document.getElementById("ligne-description")?.value.trim() || "";

  // Validation
  if (!categorieId || !epaisseur || !finitionId || quantite <= 0 || longueur <= 0) {
    afficherAlerte("alert-ligne", "⚠️ Veuillez remplir tous les champs obligatoires.");
    return;
  }

  cacherAlerte("alert-ligne");

  const cat    = CATALOGUE.find(c => c.id === categorieId);
  const fin    = FINITIONS.find(f => f.id === finitionId);
  const epData = EPAISSEURS.find(e => e.valeur === epaisseur);

  const prixUnitaire = calculerPrixUnitaire(categorieId, epaisseur, finitionId);
  const totalHT      = arrondi(prixUnitaire * quantite * longueur);

  const ligne = {
    id          : Date.now(),
    categorie   : cat?.label    || categorieId,
    epaisseur   : epData?.label || `${epaisseur} mm`,
    finition    : fin?.label    || finitionId,
    description,
    quantite,
    longueur,
    prixUnitaire,
    totalHT
  };

  if (editIndex !== null) {
    lignes[editIndex] = ligne;
    editIndex = null;
    document.getElementById("btn-ajouter-ligne").textContent = "➕ Ajouter la ligne";
  } else {
    lignes.push(ligne);
  }

  sauvegarder();
  reinitialiserFormLigne();
  rafraichirTableau();
  calculerTotaux();
  calculerApercuLigne();
}

// ════════════════════════════════════════
// SUPPRIMER UNE LIGNE
// ════════════════════════════════════════

function supprimerLigne(index) {
  if (!confirm("Supprimer cette ligne ?")) return;
  lignes.splice(index, 1);
  sauvegarder();
  rafraichirTableau();
  calculerTotaux();
}

// ════════════════════════════════════════
// ÉDITER UNE LIGNE
// ════════════════════════════════════════

function editerLigne(index) {
  const l = lignes[index];
  if (!l) return;

  editIndex = index;

  // Retrouver les IDs depuis les labels
  const cat    = CATALOGUE.find(c => c.label === l.categorie);
  const fin    = FINITIONS.find(f => f.label === l.finition);
  const epData = EPAISSEURS.find(e => e.label === l.epaisseur);

  document.getElementById("ligne-categorie").value   = cat?.id          || "";
  document.getElementById("ligne-epaisseur").value   = epData?.valeur   || "";
  document.getElementById("ligne-finition").value    = fin?.id          || "";
  document.getElementById("ligne-quantite").value    = l.quantite;
  document.getElementById("ligne-longueur").value    = l.longueur;
  document.getElementById("ligne-description").value = l.description    || "";

  document.getElementById("btn-ajouter-ligne").textContent = "✏️ Modifier la ligne";

  calculerApercuLigne();

  // Scroll vers le formulaire
  document.getElementById("form-ligne").scrollIntoView({ behavior: "smooth" });
}

// ════════════════════════════════════════
// TABLEAU DES LIGNES
// ════════════════════════════════════════

function rafraichirTableau() {
  const tbody = document.getElementById("tbody-lignes");
  const vide  = document.getElementById("tableau-vide");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (lignes.length === 0) {
    if (vide) vide.style.display = "block";
    return;
  }

  if (vide) vide.style.display = "none";

  lignes.forEach((l, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${l.categorie}</td>
      <td>${l.epaisseur}</td>
      <td>${l.finition}</td>
      <td>${l.description || "—"}</td>
      <td style="text-align:center;">${l.quantite}</td>
      <td style="text-align:center;">${l.longueur} m</td>
      <td style="text-align:right;">${formatEuro(l.prixUnitaire)} / ml</td>
      <td style="text-align:right;font-weight:600;">${formatEuro(l.totalHT)}</td>
      <td style="text-align:center;">
        <button class="btn btn-sm btn-secondary" onclick="editerLigne(${i})">✏️</button>
        <button class="btn btn-sm btn-danger"    onclick="supprimerLigne(${i})">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ════════════════════════════════════════
// TOTAUX
// ════════════════════════════════════════

function calculerTotaux() {
  const totalHT  = arrondi(lignes.reduce((s, l) => s + (l.totalHT || 0), 0));
  const tva      = arrondi(totalHT * 0.2);
  const totalTTC = arrondi(totalHT + tva);

  setText("total-ht",  formatEuro(totalHT));
  setText("total-tva", formatEuro(tva));
  setText("total-ttc", formatEuro(totalTTC));
}

// ════════════════════════════════════════
// APERÇU DEVIS
// ════════════════════════════════════════

function apercuDevis() {
  const societe  = document.getElementById("client-societe")?.value  || "";
  const contact  = document.getElementById("client-contact")?.value  || "";
  const tel      = document.getElementById("client-tel")?.value      || "";
  const email    = document.getElementById("client-email")?.value    || "";
  const chantier = document.getElementById("chantier-nom")?.value    || "";
  const adresse  = document.getElementById("chantier-adresse")?.value|| "";
  const numero   = document.getElementById("devis-numero")?.value    || "";
  const date     = document.getElementById("devis-date")?.value      || "";
  const validite = document.getElementById("devis-validite")?.value  || "30";
  const notes    = document.getElementById("devis-notes")?.value     || "";

  const totalHT  = arrondi(lignes.reduce((s, l) => s + (l.totalHT || 0), 0));
  const tva      = arrondi(totalHT * 0.2);
  const totalTTC = arrondi(totalHT + tva);

  const lignesHTML = lignes.map((l, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${l.categorie} — ${l.epaisseur} — ${l.finition}${l.description ? "<br><small>" + l.description + "</small>" : ""}</td>
      <td style="text-align:center;">${l.quantite}</td>
      <td style="text-align:center;">${l.longueur} m</td>
      <td style="text-align:right;">${formatEuro(l.prixUnitaire)} / ml</td>
      <td style="text-align:right;font-weight:600;">${formatEuro(l.totalHT)}</td>
    </tr>
  `).join("");

  document.getElementById("apercu-contenu").innerHTML = `
    <div class="apercu-header">
      <div>
        <strong>${SOCIETE.nom}</strong><br>
        ${SOCIETE.adresse}<br>
        ${SOCIETE.tel} · ${SOCIETE.email}<br>
        SIRET ${SOCIETE.siret}
      </div>
      <div style="text-align:right;">
        <div class="apercu-ref">Devis ${numero}</div>
        <div>Date : ${date}</div>
        <div>Validité : ${validite} jours</div>
      </div>
    </div>

    <div class="apercu-client">
      <strong>Client :</strong> ${societe || "—"}<br>
      ${contact ? "Contact : " + contact + "<br>" : ""}
      ${tel     ? "Tél : "     + tel     + "<br>" : ""}
      ${email   ? "Email : "   + email   + "<br>" : ""}
      <strong>Chantier :</strong> ${chantier || "—"}<br>
      ${adresse ? adresse : ""}
    </div>

    <table class="apercu-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Désignation</th>
          <th style="text-align:center;">Qté</th>
          <th style="text-align:center;">Long.</th>
          <th style="text-align:right;">P.U. HT</th>
          <th style="text-align:right;">Total HT</th>
        </tr>
      </thead>
      <tbody>${lignesHTML}</tbody>
    </table>

    <div class="apercu-totaux">
      <div class="apercu-total-row"><span>Total HT</span><span>${formatEuro(totalHT)}</span></div>
      <div class="apercu-total-row"><span>TVA 20%</span><span>${formatEuro(tva)}</span></div>
      <div class="apercu-total-row apercu-ttc"><span>Total TTC</span><span>${formatEuro(totalTTC)}</span></div>
    </div>

    ${notes ? `<div class="apercu-notes"><strong>Notes :</strong><br>${notes}</div>` : ""}

    <div class="apercu-footer">
      Devis établi par ${SOCIETE.nom} — ${SOCIETE.email} — SIRET ${SOCIETE.siret} — TVA ${SOCIETE.tva_intra}
    </div>
  `;

  document.getElementById("apercu-overlay").style.display = "flex";
}

// ════════════════════════════════════════
// GÉNÉRER PDF
// ════════════════════════════════════════

function genererPDF() {
  const societe  = document.getElementById("client-societe")?.value || "";
  const chantier = document.getElementById("chantier-nom")?.value   || "";

  if (!societe || !chantier) {
    afficherAlerte("alert-pdf", "⚠️ Veuillez renseigner le client et le chantier avant de générer le PDF.");
    return;
  }

  cacherAlerte("alert-pdf");
  apercuDevis();

  setTimeout(() => window.print(), 400);
}

// ════════════════════════════════════════
// RÉINITIALISER
// ════════════════════════════════════════

function reinitialiserDevis() {
  if (!confirm("Réinitialiser tout le devis ? Les lignes seront supprimées.")) return;
  lignes = [];
  editIndex = null;
  sauvegarder();
  reinitialiserFormLigne();
  rafraichirTableau();
  calculerTotaux();
}

function reinitialiserFormLigne() {
  ["ligne-categorie","ligne-epaisseur","ligne-finition","ligne-description"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  ["ligne-quantite","ligne-longueur"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  editIndex = null;
  document.getElementById("btn-ajouter-ligne").textContent = "➕ Ajouter la ligne";
  calculerApercuLigne();
}

// ════════════════════════════════════════
// FERMER APERÇU
// ════════════════════════════════════════

function fermerApercuOverlay(e) {
  if (e.target.id === "apercu-overlay") {
    document.getElementById("apercu-overlay").style.display = "none";
  }
}

// ════════════════════════════════════════
// UTILITAIRES
// ════════════════════════════════════════

function sauvegarder() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lignes));
}

function arrondi(val) {
  return Math.round(val * 100) / 100;
}

function formatEuro(val) {
  return val.toFixed(2).replace(".", ",") + " €";
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function afficherAlerte(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.style.display = "block";
}

function cacherAlerte(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = "none";
}

