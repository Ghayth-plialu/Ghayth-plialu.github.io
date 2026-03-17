
/* ═══════════════════════════════════════
   RESET & BASE
════════════════════════════════════════ */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --bg:        #0f1923;
  --bg-card:   #1a2635;
  --bg-input:  #111d2b;
  --border:    #2a3a4a;
  --text:      #e8edf2;
  --text-muted:#8a9bb0;
  --or:        #e8fc69;
  --or-dark:   #c8dc49;
  --accent:    #0d2933;
  --success:   #2ecc71;
  --danger:    #e74c3c;
  --radius:    12px;
  --shadow:    0 4px 20px rgba(0,0,0,0.4);
}

html { scroll-behavior: smooth; }

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  line-height: 1.6;
}

/* ═══════════════════════════════════════
   NAVBAR
════════════════════════════════════════ */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 60px;
  background: #0a1520;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  gap: 20px;
}

.navbar-brand {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--or);
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.navbar-links {
  display: flex;
  gap: 8px;
}

.navbar-links a {
  text-decoration: none;
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 500;
  padding: 6px 16px;
  border-radius: 8px;
  transition: background 0.15s, color 0.15s;
}

.navbar-links a:hover {
  background: var(--border);
  color: var(--text);
}

.navbar-links a.active {
  background: var(--or);
  color: #0a1520;
  font-weight: 700;
}

/* ═══════════════════════════════════════
   HERO HOME (index.html)
════════════════════════════════════════ */
.hero-home {
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at 50% 40%, #1a2e40 0%, var(--bg) 70%);
}

.hero-content {
  text-align: center;
  padding: 40px 20px;
}

.hero-logo-img {
  width: 90px;
  height: 90px;
  object-fit: contain;
  margin-bottom: 24px;
  border-radius: 16px;
  box-shadow: 0 0 40px rgba(232,252,105,0.15);
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: var(--or);
  margin: 0 0 8px;
  letter-spacing: 4px;
}

.hero-sub {
  font-size: 1.15rem;
  color: var(--text);
  margin: 0 0 10px;
  font-weight: 500;
}

.hero-desc {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin: 0 0 48px;
}

.hero-btns {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-hero {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 18px 44px;
  font-size: 1.05rem;
  font-weight: 700;
  border-radius: 12px;
  text-decoration: none;
  transition: transform 0.15s, box-shadow 0.15s;
  letter-spacing: 0.5px;
}

.btn-hero:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
}

.btn-hero-primary {
  background: var(--or);
  color: #0a1520;
  border: 2px solid var(--or-dark);
}

.btn-hero-secondary {
  background: transparent;
  color: var(--text);
  border: 2px solid var(--border);
}

.btn-hero-secondary:hover {
  background: var(--border);
}

/* ═══════════════════════════════════════
   HERO PAGES INTERNES (calcul / devis)
════════════════════════════════════════ */
.hero {
  background: linear-gradient(135deg, #0a1520 0%, #1a2e40 100%);
  border-bottom: 1px solid var(--border);
  padding: 48px 32px 40px;
  text-align: center;
}

.hero h1 {
  font-size: 2rem;
  font-weight: 800;
  color: var(--or);
  margin-bottom: 10px;
}

.hero p {
  font-size: 1rem;
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto;
}

/* ═══════════════════════════════════════
   CONTAINER
════════════════════════════════════════ */
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 20px 60px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ═══════════════════════════════════════
   CARD
════════════════════════════════════════ */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px 32px;
  box-shadow: var(--shadow);
}

.card h2 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--or);
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
  flex-wrap: wrap;
  gap: 12px;
}

.card-header h2 {
  margin: 0;
  padding: 0;
  border: none;
}

/* ═══════════════════════════════════════
   FORM
════════════════════════════════════════ */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group.full {
  grid-column: 1 / -1;
}

.form-group label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input,
.form-group select,
.form-group textarea {
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  font-size: 0.95rem;
  padding: 10px 14px;
  outline: none;
  transition: border-color 0.15s;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--or);
}

.form-group input[readonly] {
  opacity: 0.5;
  cursor: default;
}

.form-group textarea {
  resize: vertical;
}

select option {
  background: #1a2635;
}

/* ═══════════════════════════════════════
   RESULT BOX
════════════════════════════════════════ */
.result-box {
  background: #0d1e2c;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px 24px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.result-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
  color: var(--text-muted);
  padding: 6px 0;
  border-bottom: 1px solid var(--border);
}

.result-row:last-child { border-bottom: none; }

.result-row strong {
  color: var(--text);
  font-size: 1rem;
}

.result-row.highlight {
  background: rgba(232,252,105,0.05);
  border-radius: 8px;
  padding: 8px 12px;
  margin: 0 -12px;
}

.result-row.highlight strong {
  color: var(--or);
  font-size: 1.1rem;
}

.result-row.highlight-ttc {
  background: rgba(46,204,113,0.07);
  border-radius: 8px;
  padding: 8px 12px;
  margin: 0 -12px;
}

.result-row.highlight-ttc strong {
  color: var(--success);
  font-size: 1.1rem;
}

/* ═══════════════════════════════════════
   BUTTONS
════════════════════════════════════════ */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 24px;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.15s, transform 0.1s;
  font-family: inherit;
}

.btn:hover { opacity: 0.85; transform: translateY(-1px); }
.btn:active { transform: translateY(0); }

.btn-primary   { background: var(--or);     color: #0a1520; }
.btn-secondary { background: var(--border); color: var(--text); }
.btn-success   { background: var(--success);color: #fff; }
.btn-danger    { background: var(--danger);  color: #fff; }

.btn-sm {
  padding: 7px 16px;
  font-size: 0.82rem;
}

.btn-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

/* ═══════════════════════════════════════
   ALERTS
════════════════════════════════════════ */
.alert {
  padding: 12px 18px;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-bottom: 12px;
}

.alert-error {
  background: rgba(231,76,60,0.12);
  border: 1px solid rgba(231,76,60,0.4);
  color: #ff8a7a;
}

/* ═══════════════════════════════════════
   TABLE
════════════════════════════════════════ */
.table-wrapper {
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid var(--border);
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}

.table thead tr {
  background: #0d1e2c;
}

.table th {
  padding: 12px 14px;
  text-align: left;
  color: var(--text-muted);
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid var(--border);
}

.table td {
  padding: 11px 14px;
  border-bottom: 1px solid rgba(42,58,74,0.6);
  color: var(--text);
  vertical-align: middle;
}

.table tbody tr:last-child td { border-bottom: none; }

.table tbody tr:hover {
  background: rgba(255,255,255,0.02);
}

.table tbody tr:empty td,
.table td[colspan] {
  text-align: center;
  color: var(--text-muted);
  padding: 24px;
}

/* ═══════════════════════════════════════
   TOTAUX BOX
════════════════════════════════════════ */
.totaux-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;
  padding: 20px 24px;
  background: #0d1e2c;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  max-width: 340px;
  margin-left: auto;
}

.totaux-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  color: var(--text-muted);
  padding: 5px 0;
  border-bottom: 1px solid var(--border);
}

.totaux-row:last-child { border-bottom: none; }

.totaux-row strong { color: var(--text); }

.totaux-ttc {
  margin-top: 4px;
  padding-top: 10px;
}

.totaux-ttc span { color: var(--text); font-weight: 700; font-size: 1rem; }
.totaux-ttc strong { color: var(--success); font-size: 1.1rem; }

/* ═══════════════════════════════════════
   NOTE
════════════════════════════════════════ */
.note {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 12px;
  font-style: italic;
}

/* ═══════════════════════════════════════
   MODAL
════════════════════════════════════════ */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.modal {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px 32px;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0,0,0,0.6);
}

.modal-large { max-width: 800px; }

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border);
}

.modal-header h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--or);
}

.modal-close {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.1rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.15s;
}

.modal-close:hover {
  background: var(--border);
  color: var(--text);
}

/* ═══════════════════════════════════════
   APERÇU DEVIS
════════════════════════════════════════ */
.apercu-devis {
  font-size: 0.88rem;
  color: var(--text);
}

.apercu-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--or);
  flex-wrap: wrap;
  gap: 16px;
}

.apercu-logo {
  font-size: 1.4rem;
  font-weight: 900;
  color: var(--or);
  letter-spacing: 2px;
  margin-bottom: 4px;
}

.apercu-parties {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

@media (max-width: 520px) {
  .apercu-parties { grid-template-columns: 1fr; }
}

.apercu-bloc {
  background: #0d1e2c;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 14px 18px;
  font-size: 0.85rem;
  line-height: 1.8;
  color: var(--text-muted);
}

.apercu-bloc strong { color: var(--text); }

.apercu-bloc-titre {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: var(--or);
  text-transform: uppercase;
  margin-bottom: 8px;
}

.apercu-totaux {
  max-width: 300px;
  margin-left: auto;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.apercu-total-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: var(--text-muted);
  padding: 5px 0;
  border-bottom: 1px solid var(--border);
}

.apercu-total-row:last-child { border-bottom: none; }

.apercu-ttc {
  font-weight: 700;
  font-size: 1rem !important;
}

.apercu-ttc span { color: var(--text); }
.apercu-ttc span:last-child { color: var(--success); }

/* ═══════════════════════════════════════
   FOOTER
════════════════════════════════════════ */
.footer {
  text-align: center;
  padding: 24px;
  font-size: 0.8rem;
  color: var(--text-muted);
  border-top: 1px solid var(--border);
  background: #0a1520;
}

/* ═══════════════════════════════════════
   SCROLLBAR
════════════════════════════════════════ */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #3a4a5a; }

/* ═══════════════════════════════════════
   RESPONSIVE
════════════════════════════════════════ */
@media (max-width: 768px) {
  .navbar { padding: 0 16px; }
  .navbar-links a { padding: 6px 10px; font-size: 0.82rem; }
  .hero { padding: 32px 16px 28px; }
  .hero h1 { font-size: 1.5rem; }
  .hero-title { font-size: 2.2rem; }
  .card { padding: 20px 16px; }
  .container { padding: 20px 12px 48px; }
  .modal { padding: 20px 16px; }
  .totaux-box { max-width: 100%; }
  .btn-group { flex-direction: column; }
  .btn { justify-content: center; }
}

@media print {
  .navbar, .hero, .footer, .btn, .btn-group, .alert { display: none !important; }
  body { background: white; color: black; }
  .card { border: 1px solid #ccc; box-shadow: none; background: white; }
  .modal-overlay { position: static; background: none; display: block !important; }
  .modal { max-width: 100%; box-shadow: none; border: none; }
  #modal-overlay { display: none !important; }
  #apercu-overlay { position: static !important; background: none !important; display: block !important; padding: 0 !important; }
  .apercu-devis { color: black; }
  .apercu-bloc { background: #f5f5f5; border-color: #ccc; color: #333; }
  .apercu-logo, .apercu-bloc-titre { color: #333; }
  .table th, .table td { color: black; border-color: #ccc; }
}
