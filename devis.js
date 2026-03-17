<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PLIALU — Devis</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<!-- ═══════════════════════════════════════
     NAVBAR
════════════════════════════════════════ -->
<nav class="navbar">
  <div class="navbar-brand">🔧 PLIALU</div>
  <div class="navbar-links">
    <a href="index.html">🏠 Accueil</a>
    <a href="calcul.html">🧮 Calculette</a>
    <a href="devis.html" class="active">📄 Devis</a>
  </div>
</nav>

<!-- ═══════════════════════════════════════
     HERO
════════════════════════════════════════ -->
<section class="hero">
  <h1>📄 Générateur de devis</h1>
  <p>Renseignez les informations client et chantier, puis générez votre devis PDF.</p>
</section>

<main class="container">

  <!-- ─────────────────────────────────────
       ÉTAPE 1 — INFORMATIONS DEVIS
  ───────────────────────────────────── -->
  <div class="card">
    <h2>1 — Informations du devis</h2>
    <div class="form-grid">

      <div class="form-group">
        <label for="devis-numero">Numéro de devis</label>
        <input type="text" id="devis-numero" readonly placeholder="Généré automatiquement">
      </div>

      <div class="form-group">
        <label for="devis-date">Date</label>
        <input type="text" id="devis-date" readonly>
      </div>

      <div class="form-group">
        <label for="devis-validite">Validité (jours)</label>
        <input type="number" id="devis-validite" value="30" min="1">
      </div>

      <div class="form-group">
        <label for="devis-commercial">Commercial</label>
        <input type="text" id="devis-commercial" value="Ghayth Benyoucef">
      </div>

    </div>
  </div>

  <!-- ─────────────────────────────────────
       ÉTAPE 2 — INFORMATIONS CLIENT
  ───────────────────────────────────── -->
  <div class="card">
    <h2>2 — Informations client</h2>
    <div class="form-grid">

      <div class="form-group">
        <label for="client-societe">Société *</label>
        <input type="text" id="client-societe" placeholder="Ex : Façades & Co">
      </div>

      <div class="form-group">
        <label for="client-contact">Contact</label>
        <input type="text" id="client-contact" placeholder="Ex : M. Dupont">
      </div>

      <div class="form-group">
        <label for="client-email">Email</label>
        <input type="email" id="client-email" placeholder="contact@exemple.fr">
      </div>

      <div class="form-group">
        <label for="client-tel">Téléphone</label>
        <input type="tel" id="client-tel" placeholder="06 XX XX XX XX">
      </div>

      <div class="form-group full">
        <label for="client-adresse">Adresse</label>
        <input type="text" id="client-adresse" placeholder="Ex : 12 rue des Artisans, 75001 Paris">
      </div>

    </div>
  </div>

  <!-- ─────────────────────────────────────
       ÉTAPE 3 — INFORMATIONS CHANTIER
  ───────────────────────────────────── -->
  <div class="card">
    <h2>3 — Informations chantier</h2>
    <div class="form-grid">

      <div class="form-group full">
        <label for="chantier-nom">Nom du chantier *</label>
        <input type="text" id="chantier-nom" placeholder="Ex : Résidence Les Pins — Bâtiment B">
      </div>

      <div class="form-group full">
        <label for="chantier-adresse">Adresse du chantier</label>
        <input type="text" id="chantier-adresse" placeholder="Ex : 8 avenue des Chênes, 69003 Lyon">
      </div>

      <div class="form-group full">
        <label for="chantier-notes">Notes / Observations</label>
        <textarea id="chantier-notes" rows="3" placeholder="Contraintes techniques, délais, remarques particulières..."></textarea>
      </div>

    </div>
  </div>

  <!-- ─────────────────────────────────────
       ÉTAPE 4 — LIGNES DU DEVIS
  ───────────────────────────────────── -->
  <div class="card">
    <div class="card-header">
      <h2>4 — Lignes du devis</h2>
      <div style="display:flex;gap:10px;">
        <a href="calcul.html" class="btn btn-secondary btn-sm">🧮 Ajouter via calculette</a>
        <button class="btn btn-primary btn-sm" onclick="ouvrirModalLigne()">+ Ligne manuelle</button>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Type</th>
            <th>Épaisseur</th>
            <th>Finition</th>
            <th>Qté (ml)</th>
            <th>Prix / ml HT</th>
            <th>Total HT</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="tableau-lignes">
          <!-- rempli par script.js -->
        </tbody>
      </table>
    </div>

    <!-- Totaux -->
    <div class="totaux-box">
      <div class="totaux-row">
        <span>Total HT</span>
        <strong id="total-ht">0,00 € HT</strong>
      </div>
      <div class="totaux-row">
        <span>TVA 20%</span>
        <strong id="total-tva">0,00 € HT</strong>
      </div>
      <div class="totaux-row totaux-ttc">
        <span>Total TTC</span>
        <strong id="total-ttc">0,00 € TTC</strong>
      </div>
    </div>

  </div>

  <!-- ─────────────────────────────────────
       ÉTAPE 5 — GÉNÉRATION PDF
  ───────────────────────────────────── -->
  <div class="card">
    <h2>5 — Génération du devis</h2>
    <div class="alert alert-error" id="alert-pdf" style="display:none;">
      ⚠️ Veuillez renseigner au minimum la société cliente et le nom du chantier.
    </div>
    <div class="btn-group">
      <button class="btn btn-success" onclick="genererPDF()">📥 Télécharger le devis PDF</button>
      <button class="btn btn-secondary" onclick="aperçuDevis()">👁️ Aperçu devis</button>
      <button class="btn btn-danger" onclick="reinitialiserDevis()">🗑️ Vider le devis</button>
    </div>
  </div>

</main>

<!-- ═══════════════════════════════════════
     MODAL — AJOUT LIGNE MANUELLE
════════════════════════════════════════ -->
<div class="modal-overlay" id="modal-overlay" style="display:none;" onclick="fermerModal(event)">
  <div class="modal">
    <div class="modal-header">
      <h3>➕ Ajouter une ligne manuellement</h3>
      <button class="modal-close" onclick="fermerModalBtn()">✕</button>
    </div>

    <div class="form-grid">

      <div class="form-group full">
        <label for="m-desc">Description</label>
        <input type="text" id="m-desc" placeholder="Ex : Appui de fenêtre RDC">
      </div>

      <div class="form-group">
        <label for="m-categorie">Type de pièce *</label>
        <select id="m-categorie" onchange="majPrixModal()">
          <!-- rempli dynamiquement -->
        </select>
      </div>

      <div class="form-group">
        <label for="m-epaisseur">Épaisseur *</label>
        <select id="m-epaisseur" onchange="majPrixModal()">
          <!-- rempli dynamiquement -->
        </select>
      </div>

      <div class="form-group">
        <label for="m-finition">Finition *</label>
        <select id="m-finition" onchange="majPrixModal()">
          <!-- rempli dynamiquement -->
        </select>
      </div>

      <div class="form-group">
        <label for="m-quantite">Quantité (ml) *</label>
        <input type="number" id="m-quantite" min="0.1" step="0.1" placeholder="Ex : 5.5" oninput="majPrixModal()">
      </div>

      <div class="form-group">
        <label for="m-prix-ml">Prix / ml HT (€)</label>
        <input type="number" id="m-prix-ml" step="0.01" placeholder="Calculé auto ou saisi manuellement">
      </div>

    </div>

    <!-- Aperçu total ligne -->
    <div class="result-box" id="modal-result" style="display:none; margin-top:16px;">
      <div class="result-row highlight">
        <span>Total HT ligne</span>
        <strong id="modal-total-ht">—</strong>
      </div>
    </div>

    <div class="btn-group" style="margin-top:20px;">
      <button class="btn btn-primary" onclick="validerLigneModal()">✅ Ajouter la ligne</button>
      <button class="btn btn-secondary" onclick="fermerModalBtn()">Annuler</button>
    </div>

  </div>
</div>

<!-- ═══════════════════════════════════════
     MODAL — APERÇU DEVIS
════════════════════════════════════════ -->
<div class="modal-overlay" id="apercu-overlay" style="display:none;" onclick="fermerApercu(event)">
  <div class="modal modal-large">
    <div class="modal-header">
      <h3>👁️ Aperçu du devis</h3>
      <button class="modal-close" onclick="fermerApercuBtn()">✕</button>
    </div>
    <div id="apercu-content" class="apercu-devis">
      <!-- généré dynamiquement -->
    </div>
    <div class="btn-group" style="margin-top:20px;">
      <button class="btn btn-success" onclick="genererPDF()">📥 Télécharger PDF</button>
      <button class="btn btn-secondary" onclick="fermerApercuBtn()">Fermer</button>
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════
     FOOTER
════════════════════════════════════════ -->
<footer class="footer">
  <p>PLIALU — Outil interne technico-commercial · Ghayth Benyoucef · 2026</p>
</footer>

<!-- ═══════════════════════════════════════
     SCRIPTS
════════════════════════════════════════ -->
<script src="data.js"></script>
<script src="script.js"></script>
<script>

  // ── Init page devis
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("devis-numero").value = genererNumeroDevis();
    document.getElementById("devis-date").value   = dateAujourdhui();
    remplirSelectModal();
  });

  // ── Remplir les selects de la modal
  function remplirSelectModal() {
    const remplir = (id, items) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.innerHTML = items.map(i =>
        `<option value="${i.valeur}">${i.label}</option>`
      ).join("");
    };
    remplir("m-categorie", CATEGORIES);
    remplir("m-epaisseur", EPAISSEURS);
    remplir("m-finition",  FINITIONS);
  }

  // ── Ouvrir modal ligne
  function ouvrirModalLigne() {
    document.getElementById("modal-overlay").style.display = "flex";
    document.getElementById("modal-result").style.display  = "none";
  }

  // ── Fermer modal (clic overlay)
  function fermerModal(e) {
    if (e.target.id === "modal-overlay")
      document.getElementById("modal-overlay").style.display = "none";
  }

  function fermerModalBtn() {
    document.getElementById("modal-overlay").style.display = "none";
  }

  // ── Mise à jour prix dans la modal
  function majPrixModal() {
    const cat = document.getElementById("m-categorie").value;
    const ep  = document.getElementById("m-epaisseur").value;
    const fin = document.getElementById("m-finition").value;
    const qte = parseFloat(document.getElementById("m-quantite").value);

    if (!cat || !ep || !fin) return;

    const prixML = calculPrixML(cat, ep, fin);
    document.getElementById("m-prix-ml").value = prixML.toFixed(2);

    if (qte > 0) {
      const total = calculLigneHT(prixML, qte);
      document.getElementById("modal-total-ht").textContent = formatEuro(total);
      document.getElementById("modal-result").style.display = "block";
    }
  }

  // ── Valider ligne modal
  function validerLigneModal() {
    const cat    = document.getElementById("m-categorie").value;
    const ep     = document.getElementById("m-epaisseur").value;
    const fin    = document.getElementById("m-finition").value;
    const qte    = parseFloat(document.getElementById("m-quantite").value);
    const desc   = document.getElementById("m-desc").value.trim();
    const prixML = parseFloat(document.getElementById("m-prix-ml").value);

    if (!cat || !ep || !fin || !qte || qte <= 0 || isNaN(prixML)) {
      alert("⚠️ Veuillez remplir tous les champs obligatoires.");
      return;
    }

    ajouterLigne({ description: desc, categorie: cat, epaisseur: ep, finition: fin, quantite: qte, prixMLForce: prixML });
    fermerModalBtn();

    // Reset champs modal
    document.getElementById("m-desc").value     = "";
    document.getElementById("m-quantite").value = "";
    document.getElementById("m-prix-ml").value  = "";
    document.getElementById("modal-result").style.display = "none";
  }

  // ── Aperçu devis
  function aperçuDevis() {
    const num      = document.getElementById("devis-numero").value;
    const date     = document.getElementById("devis-date").value;
    const validite = document.getElementById("devis-validite").value;
    const comm     = document.getElementById("devis-commercial").value;
    const societe  = document.getElementById("client-societe").value || "—";
    const contact  = document.getElementById("client-contact").value || "—";
    const email    = document.getElementById("client-email").value   || "—";
    const tel      = document.getElementById("client-tel").value     || "—";
    const adresse  = document.getElementById("client-adresse").value || "—";
    const chantier = document.getElementById("chantier-nom").value   || "—";
    const chAdr    = document.getElementById("chantier-adresse").value || "—";
    const notes    = document.getElementById("chantier-notes").value  || "—";

    const totalHT  = arrondi(lignesDevis.reduce((s, l) => s + l.totalHT, 0));
    const tva      = calculTVA(totalHT);
    const totalTTC = calculTTC(totalHT);

    const lignesHTML = lignesDevis.length === 0
      ? `<tr><td colspan="5" style="text-align:center;color:#999;">Aucune ligne</td></tr>`
      : lignesDevis.map(l => `
          <tr>
            <td>${l.description || "—"}</td>
            <td>${CATEGORIES.find(c => c.valeur === l.categorie)?.label ?? l.categorie}</td>
            <td>${l.epaisseur}/10</td>
            <td>${parseFloat(l.quantite).toFixed(2)} ml</td>
            <td style="text-align:right;"><strong>${formatEuro(l.totalHT)}</strong></td>
          </tr>
        `).join("");

    document.getElementById("apercu-content").innerHTML = `
      <div class="apercu-header">
        <div>
          <div class="apercu-logo">🔧 PLIALU</div>
          <div style="font-size:0.85rem;color:#888;">${SOCIETE.activite}</div>
          <div style="font-size:0.85rem;color:#888;">${SOCIETE.email} · ${SOCIETE.tel}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:1.4rem;font-weight:700;color:var(--or);">DEVIS</div>
          <div style="font-size:0.9rem;">${num}</div>
          <div style="font-size:0.85rem;color:#888;">Le ${date} · Validité : ${validite} jours</div>
          <div style="font-size:0.85rem;color:#888;">Commercial : ${comm}</div>
        </div>
      </div>

      <div class="apercu-parties">
        <div class="apercu-bloc">
          <div class="apercu-bloc-titre">CLIENT</div>
          <div><strong>${societe}</strong></div>
          <div>${contact}</div>
          <div>${email}</div>
          <div>${tel}</div>
          <div>${adresse}</div>
        </div>
        <div class="apercu-bloc">
          <div class="apercu-bloc-titre">CHANTIER</div>
          <div><strong>${chantier}</strong></div>
          <div>${chAdr}</div>
          <div style="margin-top:8px;font-style:italic;color:#aaa;">${notes}</div>
        </div>
      </div>

      <table class="table" style="margin-top:20px;">
        <thead>
          <tr>
            <th>Description</th>
            <th>Type</th>
            <th>Épaisseur</th>
            <th>Qté (ml)</th>
            <th style="text-align:right;">Total HT</th>
          </tr>
        </thead>
        <tbody>${lignesHTML}</tbody>
      </table>

      <div class="apercu-totaux">
        <div class="apercu-total-row"><span>Total HT</span><span>${formatEuro(totalHT)}</span></div>
        <div class="apercu-total-row"><span>TVA 20%</span><span>${formatEuro(tva)}</span></div>
        <div class="apercu-total-row apercu-ttc"><span>Total TTC</span><span>${formatEuroTTC(totalTTC)}</span></div>
      </div>

      <div style="margin-top:24px;font-size:0.8rem;color:#888;border-top:1px solid #333;padding-top:12px;">
        Devis établi par PLIALU — ${SOCIETE.email} — SIRET ${SOCIETE.siret} — TVA ${SOCIETE.tva_intra}
      </div>
    `;

    document.getElementById("apercu-overlay").style.display = "flex";
  }

  // ── Fermer aperçu
  function fermerApercu(e) {
    if (e.target.id === "apercu-overlay")
      document.getElementById("apercu-overlay").style.display = "none";
  }
  function fermerApercuBtn() {
    document.getElementById("apercu-overlay").style.display = "none";
  }

  // ── Générer PDF (impression navigateur)
  function genererPDF() {
    const societe  = document.getElementById("client-societe").value;
    const chantier = document.getElementById("chantier-nom").value;

    if (!societe || !chantier) {
      document.getElementById("alert-pdf").style.display = "block";
      return;
    }

    document.getElementById("alert-pdf").style.display = "none";
    aperçuDevis();

    setTimeout(() => {
      window.print();
    }, 400);
  }

</script>
</body>
</html>

