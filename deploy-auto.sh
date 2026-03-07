#!/bin/bash

# ==========================================
# DEPLOY AUTOMATICO - Colombini Lelio SRL
# Caricamento file su SiteGround via FTP
# ==========================================

# Colori
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configurazione
SERVER="ftp.colombinilelio.it"
USERNAME="u758834859"
REMOTE_DIR="public_html"

# File da caricare (modificati per SEO e form)
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

# Header
echo -e "${BLUE}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║${NC}           ${GREEN}DEPLOY AUTOMATICO${NC}                            ${BLUE}║${NC}"
echo -e "${BLUE}║${NC}           Colombini Lelio SRL → SiteGround             ${BLUE}║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""

# Chiedi password
echo -e "${YELLOW}Inserisci la password FTP per $USERNAME:${NC}"
read -s PASSWORD
echo ""

if [ -z "$PASSWORD" ]; then
    echo -e "${RED}ERRORE: Password richiesta!${NC}"
    exit 1
fi

# Verifica curl
if ! command -v curl &> /dev/null; then
    echo -e "${RED}ERRORE: curl non trovato!${NC}"
    exit 1
fi

echo -e "${BLUE}Server:${NC} $SERVER"
echo -e "${BLUE}Username:${NC} $USERNAME"
echo -e "${BLUE}File da caricare:${NC} ${#FILES[@]}"
echo ""
echo -e "${YELLOW}Inizio caricamento...${NC}"
echo "─────────────────────────────────────────────────────────────"

# Contatori
SUCCESS=0
FAILED=0

# Carica ogni file
for file in "${FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo -e "${YELLOW}⚠${NC}  $file ${YELLOW}(non trovato, skip)${NC}"
        continue
    fi
    
    # Mostra progresso
    echo -n "📤 $file ... "
    
    # Carica con curl (FTPES - FTP con TLS esplicito)
    RESULT=$(curl -s -w "\n%{http_code}" --ftp-ssl-reqd \
        -T "$file" \
        "ftp://$USERNAME:$PASSWORD@$SERVER/$REMOTE_DIR/$file" 2>&1)
    
    HTTP_CODE=$(echo "$RESULT" | tail -n1)
    
    # Verifica risultato
    if [ $? -eq 0 ] && [ "$HTTP_CODE" = "226" -o "$HTTP_CODE" = "200" -o "$HTTP_CODE" = "000" ]; then
        echo -e "${GREEN}✓ OK${NC}"
        ((SUCCESS++))
    else
        echo -e "${RED}✗ ERRORE${NC}"
        ((FAILED++))
    fi
done

echo "─────────────────────────────────────────────────────────────"
echo ""

# Riepilogo
echo -e "${GREEN}✓ Completati:${NC} $SUCCESS"
if [ $FAILED -gt 0 ]; then
    echo -e "${RED}✗ Falliti:${NC} $FAILED"
fi
echo ""

# Verifica finale
if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}╔══════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║${NC}     🎉 DEPLOY COMPLETATO CON SUCCESSO!                   ${GREEN}║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${BLUE}Verifica il sito:${NC}"
    echo "  • Homepage:     https://www.colombinilelio.it"
    echo "  • Chi Siamo:    https://www.colombinilelio.it/chi-siamo"
    echo "  • Contatti:     https://www.colombinilelio.it/contatti"
    echo ""
    echo -e "${YELLOW}Prova il form di contatto per verificare il funzionamento!${NC}"
else
    echo -e "${YELLOW}⚠  Alcuni file non sono stati caricati${NC}"
    echo -e "${YELLOW}   Riprova o usa FileZilla per i file mancanti${NC}"
fi

echo ""
