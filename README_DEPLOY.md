# 🚀 Guida Deploy - Colombini Lelio SRL

## Metodo 1: Script FTP Automatico (Consigliato)

### 1. Configura lo script
Apri `deploy-ftp.sh` e modifica le credenziali:
```bash
FTP_SERVER="ftp.colombinilelio.it"
FTP_USERNAME="u758834859"
FTP_PASSWORD="LA_TUA_PASSWORD"
```

### 2. Rendi eseguibile e lancia
```bash
chmod +x deploy-ftp.sh
./deploy-ftp.sh
```

### 3. Requisiti
- **Mac**: `brew install lftp`
- **Linux**: `sudo apt-get install lftp`

---

## Metodo 2: FTP Manuale con FileZilla

### Configurazione FileZilla:
```
Host: ftp.colombinilelio.it
Username: u758834859
Password: [la tua password]
Porta: 21
Crittografia: Usare FTP esplicito su TLS
```

### File da caricare in `/public_html/`:
- `.htaccess` (modificato)
- `robots.txt` (modificato)
- `chi-siamo.html` (H1 ottimizzato + lazy loading)
- `servizi.html` (title accorciato + lazy loading)
- `faq.html` (+ FAQPage schema)
- `index.html` (+ lazy loading)
- `blog.html` (+ lazy loading)
- `contatti.html`
- `contatto.php` (nuovo)
- `csrf.php` (nuovo)
- `errore.html` (nuovo)
- `thank-you.html` (email aggiornata)
- `components/schema-org.json`
- `components/footer.html`
- `components/header.html`

---

## Metodo 3: SiteGround File Manager

1. Accedi a **Site Tools > Gestione File**
2. Seleziona i file da caricare
3. Clicca **Upload** o trascina i file
4. Verifica che finiscano in `/public_html/`

---

## ✅ Checklist Post-Deploy

- [ ] Sito accessibile: https://www.colombinilelio.it
- [ ] Form di contatto funzionante
- [ ] Redirect HTTPS attivo
- [ ] Clean URLs funzionanti (/chi-siamo, /servizi)
- [ ] Immagini con lazy loading
- [ ] Schema.org validato

---

## 🔧 Configurazione Git (già fatto)

```bash
# Aggiungi remote
git remote add origin https://github.com/CloreM-Fine/Landing-Colombini.git

# Push
git push -u origin main
```

---

## 🆘 Troubleshooting

**Errore "Connection refused"**
- Verifica firewall
- Prova porta 21 (FTP) o 22 (SFTP)

**Errore "Permission denied"**
- Verifica che i file PHP abbiano permessi 644
- Verifica che le cartelle abbiano permessi 755

**File non visibili**
- SiteGround usa `public_html` come root
- Non creare sottocartelle
