#!/bin/bash

# ==========================================
# DEPLOY SCRIPT - Colombini Lelio (curl)
# ==========================================

# CONFIGURAZIONE - INSERISCI I TUOI DATI
SERVER="ftp.colombinilelio.it"
USERNAME="u758834859"
PASSWORD="INSERISCI_PASSWORD_QUI"

# Colori
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}====================================${NC}"
echo -e "${GREEN}  DEPLOY Colombini Lelio${NC}"
echo -e "${GREEN}====================================${NC}"
echo ""

# Verifica password
if [ "$PASSWORD" == "INSERISCI_PASSWORD_QUI" ]; then
    echo -e "${RED}ERRORE: Inserisci la password nello script!${NC}"
    echo "Modifica la riga: PASSWORD=\"...\""
    exit 1
fi

# Lista file da caricare
FILES=(
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

echo -e "${YELLOW}Server:${NC} $SERVER"
echo -e "${YELLOW}User:${NC} $USERNAME"
echo ""

# Carica ogni file
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -n "Caricamento $file... "
        
        # Usa curl per FTPES (FTP con TLS esplicito)
        curl -s --ftp-ssl-reqd -T "$file" "ftp://$USERNAME:$PASSWORD@$SERVER/public_html/$file" 2>&1
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}OK${NC}"
        else
            echo -e "${RED}ERRORE${NC}"
        fi
    else
        echo -e "${RED}File mancante: $file${NC}"
    fi
done

echo ""
echo -e "${GREEN}====================================${NC}"
echo -e "${GREEN}  DEPLOY COMPLETATO!${NC}"
echo -e "${GREEN}====================================${NC}"
