#!/bin/bash

# ==========================================
# DEPLOY SCRIPT - Colombini Lelio SRL
# Caricamento file su SiteGround via FTP
# ==========================================

# Configurazione FTP - DA COMPILARE
FTP_SERVER="ftp.colombinilelio.it"      # Es: ftp.colombinilelio.it
FTP_USERNAME="u758834859"               # Username SiteGround
FTP_PASSWORD="INSERISCI_PASSWORD"       # Password FTP
FTP_REMOTE_DIR="."                      # Cartella corrente (SiteGround: sei già in public_html)

# Colori per output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}====================================${NC}"
echo -e "${GREEN}  DEPLOY Colombini Lelio SRL${NC}"
echo -e "${GREEN}====================================${NC}"
echo ""

# Verifica parametri
if [ "$FTP_PASSWORD" == "INSERISCI_PASSWORD" ]; then
    echo -e "${RED}ERRORE: Modifica la password FTP nello script!${NC}"
    echo "Apri deploy-ftp.sh e inserisci la password corretta."
    exit 1
fi

# File da caricare (modificati recentemente)
FILES_TO_UPLOAD=(
    ".htaccess"
    "robots.txt"
    "chi-siamo.html"
    "servizi.html"
    "faq.html"
    "index.html"
    "blog.html"
    "contatti.html"
    "contatto.php"
    "csrf.php"
    "errore.html"
    "thank-you.html"
    "components/schema-org.json"
    "components/footer.html"
    "components/header.html"
)

echo -e "${YELLOW}Server:${NC} $FTP_SERVER"
echo -e "${YELLOW}Username:${NC} $FTP_USERNAME"
echo -e "${YELLOW}Directory remota:${NC} root (public_html)
echo ""
echo -e "${YELLOW}File da caricare:${NC}"
for file in "${FILES_TO_UPLOAD[@]}"; do
    echo "  - $file"
done
echo ""

# Metodo 1: Usando lftp (consigliato)
if command -v lftp &> /dev/null; then
    echo -e "${GREEN}Usando lftp...${NC}"
    
    lftp -u "$FTP_USERNAME","$FTP_PASSWORD" "$FTP_SERVER" <<EOF
set ssl:verify-certificate no
set ftp:ssl-allow yes
set ftp:ssl-force true
set ftp:ssl-protect-data true
cd $FTP_REMOTE_DIR

# Carica file principali
$(for file in "${FILES_TO_UPLOAD[@]}"; do echo "put $file"; done)

# Crea cartella rate_limit se non esiste
mkdir -p rate_limit
bye
EOF

# Metodo 2: Usando curl (alternativa)
elif command -v curl &> /dev/null; then
    echo -e "${GREEN}Usando curl...${NC}"
    
    for file in "${FILES_TO_UPLOAD[@]}"; do
        if [ -f "$file" ]; then
            echo "Caricamento: $file"
            curl -T "$file" "ftp://$FTP_USERNAME:$FTP_PASSWORD@$FTP_SERVER$FTP_REMOTE_DIR/$file" --ftp-ssl-reqd 2>/dev/null
            if [ $? -eq 0 ]; then
                echo -e "${GREEN}✓ $file caricato${NC}"
            else
                echo -e "${RED}✗ Errore caricando $file${NC}"
            fi
        fi
    done

else
    echo -e "${RED}ERRORE: Nessun client FTP trovato!${NC}"
    echo "Installa lftp o curl:"
    echo "  Mac: brew install lftp"
    echo "  Linux: sudo apt-get install lftp"
    exit 1
fi

echo ""
echo -e "${GREEN}====================================${NC}"
echo -e "${GREEN}  DEPLOY COMPLETATO!${NC}"
echo -e "${GREEN}====================================${NC}"
echo ""
echo "Verifica il sito: https://www.colombinilelio.it"
