# 🚀 Guida Deploy - Colombini Lelio SRL

## ⚠️ IMPORTANTE: Cartella public_html su SiteGround

SiteGround utilizza già la cartella `public_html` come root del sito. **NON creare una sottocartella public_html!**

### Struttura corretta:
```
✅ CORRETTO:
/home/username/public_html/          ← sei già qui quando ti connetti in FTP
    ├── index.html
    ├── .htaccess
    └── ...

❌ SBAGLIATO (crea doppia cartella):
/home/username/public_html/public_html/   ← NON fare questo!
    ├── index.html
    └── ...
```

---

## Metodo 1: Script FTP Automatico (Consigliato)

### 1. Configura lo script
Apri `deploy-auto.sh` (già configurato correttamente).

### 2. Lancia lo script
```bash
./deploy-auto.sh
```

Lo script è già configurato per caricare i file nella cartella corretta (root = public_html).

---

## Metodo 2: FTP Manuale con FileZilla

### Configurazione FileZilla:
```
Host: ftp.colombinilelio.it
Username: u758834859
Password: [la tua password]
Porta: 21
Crittografia: Usare FTP esplicito su TLS se disponibile
```

### ⚠️ ATTENZIONE ALLA CARTELLA REMOTA:

Quando ti connetti con FileZilla, potresti vedere queste situazioni:

**CASO A - Sei già in public_html:**
```
Remote site: /public_html
├── .htaccess
├── index.html
└── ...
```
→ Carica i file direttamente qui (NON creare sottocartelle!)

**CASO B - Sei nella home (/):**
```
Remote site: /
├── public_html/     ← ENTRA in questa cartella
├── private/
└── ...
```
→ Fai doppio click su `public_html` ed entra, POI carica i file

**Verifica:** Dopo il caricamento, i file devono essere accessibili direttamente da:
- `https://www.colombinilelio.it/index.html` ✅
- NON da `https://www.colombinilelio.it/public_html/index.html` ❌

---

## Metodo 3: SiteGround File Manager

1. Accedi a **Site Tools > Gestione File (File Manager)**
2. Assicurati di essere nella cartella **`public_html`** (controlla il percorso in alto)
3. Se vedi una sottocartella `public_html` DENTRO la cartella `public_html`, **eliminala**
4. Carica i file direttamente nella cartella `public_html` principale
5. Verifica che il file `index.html` sia direttamente in `public_html/`, non in `public_html/public_html/`

---

## ✅ Checklist Post-Deploy

- [ ] Sito accessibile: https://www.colombinilelio.it
- [ ] NON deve essere: https://www.colombinilelio.it/public_html/
- [ ] Form di contatto funzionante
- [ ] Redirect HTTPS attivo
- [ ] Clean URLs funzionanti (/chi-siamo, /servizi)

---

## 🆘 Troubleshooting

### Problema: "Vedo una doppia cartella public_html"

**Soluzione:**
1. Entra in SiteGround File Manager
2. Vai in `public_html/`
3. Se vedi un'altra cartella `public_html` dentro:
   - Elimina la cartella nidificata
   - Oppure sposta i file dalla sottocartella alla cartella principale

### Problema: "Il sito non si vede o dà errore 404"

**Verifica:**
```bash
# Il file index.html deve essere qui:
https://www.colombinilelio.it/index.html

# NON qui:
https://www.colombinilelio.it/public_html/index.html
```

Se il secondo URL funziona ma il primo no, hai la doppia cartella. Correggi seguendo i passaggi sopra.

---

## File da caricare

- `.htaccess` (modificato)
- `robots.txt` (modificato)
- `index.html` (lazy loading)
- `chi-siamo.html` (H1 ottimizzato)
- `servizi.html` (title accorciato)
- `faq.html` (FAQPage schema)
- `blog.html` (lazy loading)
- `contatti.html`
- `contatto.php` (nuovo)
- `csrf.php` (nuovo)
- `errore.html` (nuovo)
- `thank-you.html`
- `components/` (cartella)
- `blog-assets/` (cartella con post e immagini)
- `images/` (cartella)
- `css/` (cartella)
- `js/` (cartella)

---

## 🔧 Configurazione Git

```bash
# Aggiungi remote
git remote add origin https://github.com/CloreM-Fine/Landing-Colombini.git

# Push
git push -u origin main
```

---

## GitHub Actions (Deploy Automatico)

Il workflow è configurato in `.github/workflows/deploy.yml` e punta automaticamente alla cartella corretta (`./` = root = public_html).

Per attivarlo:
1. Aggiungi i secrets in GitHub repository settings
2. Fai push su main
