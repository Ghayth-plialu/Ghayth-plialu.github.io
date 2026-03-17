/* ============================================================
   PLIALU — data.js
   Données produits, tarifs et configurations
   Auteur : Ghayth Benyoucef — Alternant technico-commercial
   Année  : 2026
============================================================ */

// ════════════════════════════════════════
// ÉPAISSEURS DISPONIBLES
// ════════════════════════════════════════
const EPAISSEURS = [
  { valeur: "10", label: "10/10 — 1,0 mm" },
  { valeur: "15", label: "15/10 — 1,5 mm" },
  { valeur: "20", label: "20/10 — 2,0 mm" },
  { valeur: "25", label: "25/10 — 2,5 mm" },
  { valeur: "30", label: "30/10 — 3,0 mm" },
];

// ════════════════════════════════════════
// FINITIONS / ASPECTS
// ════════════════════════════════════════
const FINITIONS = [
  { valeur: "brut",        label: "Brut aluminium" },
  { valeur: "laque_std",   label: "Laqué standard (RAL courant)" },
  { valeur: "laque_spec",  label: "Laqué spécial (RAL sur demande)" },
  { valeur: "anodise",     label: "Anodisé" },
];

// ════════════════════════════════════════
// CATÉGORIES DE PIÈCES
// ════════════════════════════════════════
const CATEGORIES = [
  { valeur: "bavette",      label: "Bavette" },
  { valeur: "couvertine",   label: "Couvertine" },
  { valeur: "appui",        label: "Appui de fenêtre" },
  { valeur: "larmier",      label: "Larmier" },
  { valeur: "habillage",    label: "Habillage de façade" },
  { valeur: "depart",       label: "Départ / Pied de façade" },
  { valeur: "profil",       label: "Profil de finition" },
  { valeur: "autre",        label: "Autre pièce sur mesure" },
];

// ════════════════════════════════════════
// TARIFS AU ML — Prix de base (€ HT / ml)
// Structure : tarifs[categorie][epaisseur]
// ════════════════════════════════════════
const TARIFS = {
  bavette: {
    "10": 4.20,
    "15": 5.50,
    "20": 6.80,
    "25": 8.10,
    "30": 9.50,
  },
  couvertine: {
    "10": 5.00,
    "15": 6.50,
    "20": 8.00,
    "25": 9.60,
    "30": 11.20,
  },
  appui: {
    "10": 4.80,
    "15": 6.20,
    "20": 7.70,
    "25": 9.20,
    "30": 10.80,
  },
  larmier: {
    "10": 4.00,
    "15": 5.20,
    "20": 6.50,
    "25": 7.80,
    "30": 9.10,
  },
  habillage: {
    "10": 5.50,
    "15": 7.00,
    "20": 8.60,
    "25": 10.20,
    "30": 12.00,
  },
  depart: {
    "10": 4.50,
    "15": 5.80,
    "20": 7.20,
    "25": 8.60,
    "30": 10.10,
  },
  profil: {
    "10": 3.80,
    "15": 5.00,
    "20": 6.20,
    "25": 7.50,
    "30": 8.80,
  },
  autre: {
    "10": 5.00,
    "15": 6.50,
    "20": 8.00,
    "25": 9.50,
    "30": 11.00,
  },
};

// ════════════════════════════════════════
// COEFFICIENTS FINITION
// Multiplicateur appliqué sur le prix de base
// ════════════════════════════════════════
const COEFF_FINITION = {
  brut       : 1.00,
  laque_std  : 1.30,
  laque_spec : 1.50,
  anodise    : 1.45,
};

// ════════════════════════════════════════
// TVA
// ════════════════════════════════════════
const TVA = 0.20; // 20 %

// ════════════════════════════════════════
// INFOS SOCIÉTÉ — pour l'entête des devis
// ════════════════════════════════════════
const SOCIETE = {
  nom       : "PLIALU",
  activite  : "Façonnage tôle aluminium — Enveloppe du bâtiment",
  email     : "contact@plialu.fr",
  tel       : "XX XX XX XX XX",
  siret     : "XXX XXX XXX XXXXX",
  tva_intra : "FR XX XXXXXXXXX",
};

// ════════════════════════════════════════
// EXPORT GLOBAL (accessible par tous les scripts)
// ════════════════════════════════════════
// (pas de module ES6 — utilisation directe via <script>)

