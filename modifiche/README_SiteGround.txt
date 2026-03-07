===============================================
CONFIGURAZIONE SITEGROUND - Colombini Lelio SRL
===============================================

1. INOLTRO EMAIL
----------------
Vai su: Site Tools > Email > Inoltri

Crea regola:
  Da: info@colombinilelio.it
  A: lelio.colombini@alice.it

Verifica che l'inoltro sia attivo.

2. CREAZIONE ACCOUNT EMAIL
--------------------------
Vai su: Site Tools > Email > Account

Crea account: info@colombinilelio.it
Assegna password sicura e conservala.

3. SPF RECORD (anti-spam)
-------------------------
Vai su: Site Tools > Domain > DNS Zone Editor

Verifica esistenza record TXT:
  v=spf1 +a +mx +ip4:[TUO_IP_SERVER] ~all

Oppure usa il record di SiteGround:
  v=spf1 +a +mx +ip4:xxx.xxx.xxx.xxx include:siteground.com ~all

(Sostituisci xxx.xxx.xxx.xxx con l'IP del tuo server)

4. PHP CONFIGURATION (opzionale)
--------------------------------
Crea file .user.ini nella root con:

display_errors = Off
log_errors = On
error_log = /home/[username]/logs/php_error.log
session.cookie_httponly = 1
session.use_only_cookies = 1
session.cookie_secure = 1

5. FILE PERMESSI
----------------
Verifica che questi file abbiano permessi 644:
  - contatto.php
  - csrf.php
  - thank-you.html (esistente)
  - errore.html
  - contatti.html

Verifica che la cartella rate_limit sia scrivibile (755).

6. TEST FORM
------------
1. Vai su https://colombinilelio.it/contatti
2. Compila il form con dati di test
3. Verifica ricezione email su info@colombinilelio.it
4. Verifica inoltro su lelio.colombini@alice.it

7. RATE LIMITING
----------------
Il sistema limita a 3 invii per IP ogni 10 minuti.
I log sono in /rate_limit/ (protetti da .htaccess).

8. LOG ERRORI
-------------
Gli errori sono salvati in: log_errori.txt
Non accessibile via web (protetto da .htaccess).

===============================================
