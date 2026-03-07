#!/bin/bash

# ==========================================
# DEPLOY CON GIT SECRETS - Colombini Lelio
# Usa variabili d'ambiente da Git Secrets
# ==========================================

# Colori
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Leggi da variabili d'ambiente (Git Secrets)
SERVER="${FTP_SERVER:-ftp.colombinilelio.it}"
USERNAME="${FTP_USERNAME:-u758834859}"
PASSWORD="${FTP_PASSWORD}"
REMOTE_DIR="public_html"

echo -e "${BLUE}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║${NC}        ${GREEN}DEPLOY CON GIT SECRETS${NC}                          ${BLUE}║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""

# Verifica variabili
if [ -z "$PASSWORD" ]; then
    echo -e "${RED}ERRORE: FTP_PASSWORD non trovata nelle variabili d'ambiente!${NC}"
    echo ""
    echo "Opzioni:"
    echo "1. Esporta le variabili:"
    echo "   export FTP_PASSWORD='tua_password'"
    echo ""
    echo "2. Oppure esegui con:"
    echo "   FTP_PASSWORD='tua_password' ./deploy-secrets.sh"
    echo ""
    echo "3. Oppure usa lo script deploy-auto.sh (chiede password)"
    exit 1
fi

# File da caricare
FILES=(
    ".htaccess"
    "robots.txt"
    "index.html"
    "chi-siamo.html"
    "servizi.html"
    "contatti.html"
    "blog.html"
    "faq.html"
    "contatto.php"
    "csrf.php"
    "errore.html"
    "thank-you.html"
    "components/schema-org.json"
    "components/footer.html"
    "components/header.html"
    "site.webmanifest"
    "sitemap.xml"
)

echo -e "${BLUE}Server:${NC}   $SERVER"
echo -e "${BLUE}Username:${NC} $USERNAME"
echo -e "${BLUE}File:${NC}     ${#FILES[@]} file da caricare"
echo ""
echo -e "${YELLOW}Inizio caricamento...${NC}"
echo "─────────────────────────────────────────────────────────────"

SUCCESS=0
FAILED=0

for file in "${FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo -e "${YELLOW}⚠${NC}  $file ${YELLOW}(skip)${NC}"
        continue
    fi
    
    echo -n "📤 $file ... "
    
    curl -s --ftp-ssl-reqd -T "$file" \
        "ftp://$USERNAME:$PASSWORD@$SERVER/$REMOTE_DIR/$file" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ OK${NC}"
        ((SUCCESS++))
    else
        echo -e "${RED}✗ ERRORE${NC}"
        ((FAILED++))
    fi
done

echo "─────────────────────────────────────────────────────────────"
echo ""
echo -e "${GREEN}✓ Completati:${NC} $SUCCESS"
[ $FAILED -gt 0 ] && echo -e "${RED}✗ Falliti:${NC} $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 DEPLOY COMPLETATO!${NC}"
    echo ""
    echo -e "${BLUE}Verifica:${NC} https://www.colombinilelio.it"
else
    echo -e "${YELLOW}⚠ Alcuni file non caricati${NC}"
fi
