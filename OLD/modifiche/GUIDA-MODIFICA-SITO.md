# Guida alla Modifica del Sito Web
## Colombini Lelio SRL

Questa guida ti spiega come modificare le principali sezioni del sito web.

---

## 📁 Struttura del Progetto

```
v.1/
├── index.html           ← Homepage
├── chi-siamo.html       ← Pagina Chi Siamo
├── servizi.html         ← Pagina Servizi
├── contatti.html        ← Pagina Contatti
├── 404.html             ← Pagina Errore
├── components/
│   ├── header.html      ← Header (menu e logo)
│   └── footer.html      ← Footer (contatti e mappa)
├── css/
│   └── style.css        ← Stili personalizzati
├── js/
│   ├── main.js          ← Funzionalità (form, FAQ)
│   └── components.js    ← Caricamento header/footer
└── images/              ← Immagini del sito
```

---

## 🖼️ Come Modificare il Logo

### Posizione attuale

Il logo SVG è attualmente in: `images/logo/Logo.svg`

### Nell'Header (components/header.html)

Il logo è integrato in questa riga:

```html
<img src="images/logo/Logo.svg" alt="Colombini Lelio" class="h-10 md:h-12 w-auto">
```

**Per sostituire il logo:**
1. Sostituisci il file `images/logo/Logo.svg` con il nuovo logo
2. Oppure modifica il percorso nell'HTML

### Nel Footer (components/footer.html)

Stessa struttura:

```html
<img src="images/logo/Logo.svg" alt="Colombini Lelio" class="h-12 w-auto">
```

---

## 📞 Come Modificare i Contatti

### Numero di Telefono

1. Apri `components/header.html` e `components/footer.html`
2. Cerca `tel:+390583123456` 
3. Sostituisci con il numero reale, es: `tel:+390583987654`
4. Modifica anche il testo visualizzato

**Esempio:**
```html
<a href="tel:+390583987654" class="...">
    0583 987 654
</a>
```

### Email

Cerca `lelio.colombini@alice.it` e sostituisci con la nuova email.

### Indirizzo

Nel file `components/footer.html`, cerca la sezione "Indirizzo" e modifica:

```html
<div class="text-gray-400 text-sm">
    Via per Camaiore, 4188<br>
    Loc. Cappella<br>
    55100 Lucca (LU)
</div>
```

---

## 💬 Come Configurare WhatsApp

Nel file `js/main.js`, cerca la funzione `openWhatsApp` (riga ~250):

```javascript
function openWhatsApp(message = '') {
    const phoneNumber = '39XXXXXXXXXX'; // TODO: Inserire numero reale
```

**Sostituisci** `39XXXXXXXXXX` con il tuo numero WhatsApp (con prefisso internazionale, senza +):

```javascript
const phoneNumber = '393331234567'; // Esempio: +39 333 123 4567
```

---

## 🗺️ Come Modificare la Mappa Google

1. Vai su [Google Maps](https://maps.google.com)
2. Cerca il tuo indirizzo
3. Clicca su "Condividi" → "Incorpora mappa"
4. Copia il codice `<iframe>`
5. Nel file `components/footer.html`, sostituisci l'iframe esistente

---

## 🎨 Come Modificare i Colori

Apri `css/style.css` e modifica le variabili CSS all'inizio del file:

```css
:root {
    --color-primary: #2D5A27;        /* Verde primario */
    --color-primary-dark: #1E3D1A;   /* Verde scuro */
    --color-primary-light: #4A7C42;  /* Verde chiaro */
}
```

> 🎨 Usa un [color picker](https://htmlcolorcodes.com/) per scegliere i colori

---

## 📝 Come Modificare i Testi

### Homepage (index.html)

**Titolo Hero (riga ~90):**
```html
<h1 class="...">
    Oltre 80 anni di competenza
</h1>
```

**Sottotitolo (riga ~94):**
```html
<p class="...">
    Tradizione, innovazione e affidabilità...
</p>
```

### Servizi

Ogni servizio in `servizi.html` ha questa struttura:

```html
<h3 class="text-xl font-semibold">Nome Servizio</h3>
<p class="text-gray-600">Descrizione del servizio...</p>
```

---

## 🏷️ Come Gestire il Carosello Marchi

Il carosello marchi è presente in `index.html` e `servizi.html`.

### Aggiungere un nuovo marchio

1. Salva l'immagine in `images/brand/` (formato PNG, altezza ~50px)
2. Nel file HTML, trova la sezione `brand-track` e aggiungi:

```html
<img src="images/brand/nuovo-marchio.png" alt="Nome Marchio" class="brand-logo">
```

> ⚠️ Ricorda di aggiungere l'immagine anche nella seconda serie (duplicata per loop continuo)

### Rimuovere un marchio

Cerca `<img src="images/brand/nome-marchio.png"` ed elimina entrambe le occorrenze.

### Velocità del carosello

In `css/style.css`, modifica `animation: scroll 40s` (40 secondi = 1 ciclo completo).

---

## 🖼️ Come Cambiare le Immagini

1. Salva la nuova immagine nella cartella `images/`
2. Nel file HTML, trova l'immagine da sostituire:

```html
<img src="images/DSCF1633.jpg" alt="Descrizione">
```

3. Cambia il nome del file:

```html
<img src="images/nuova-immagine.jpg" alt="Nuova descrizione">
```

> 💡 Consiglio: usa nomi descrittivi come `hero-negozio.jpg`, `servizio-riparazione.jpg`

---

## ➕ Come Aggiungere un Nuovo Servizio

In `servizi.html`, copia questa struttura e incollala nella griglia:

```html
<div class="service-card bg-white rounded-xl shadow-lg overflow-hidden reveal">
    <div class="h-48 overflow-hidden">
        <img src="images/tua-immagine.jpg" alt="Nuovo servizio" 
             class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
    </div>
    <div class="p-6">
        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 -mt-12 relative z-10 shadow-lg">
            <!-- Icona SVG qui -->
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Titolo Servizio</h3>
        <p class="text-gray-600 mb-4">Descrizione del servizio...</p>
        <a href="contatti.html" class="text-green-600 font-medium hover:text-green-700">
            Richiedi info →
        </a>
    </div>
</div>
```

---

## ❓ Come Aggiungere una FAQ

In `contatti.html`, nella sezione FAQ, aggiungi:

```html
<div class="faq-item bg-white rounded-xl shadow-md reveal">
    <button class="faq-question w-full px-6 py-4 text-left flex items-center justify-between">
        <span class="font-semibold text-gray-900">La tua domanda?</span>
        <svg class="faq-icon w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
    </button>
    <div class="faq-answer px-6 pb-4">
        <p class="text-gray-600">La risposta alla domanda...</p>
    </div>
</div>
```

---

## 📧 Come Configurare il Form di Contatto

Il form attualmente **simula** l'invio. Per inviare email reali, devi:

### Opzione 1: Formspree (gratuito)

1. Registrati su [formspree.io](https://formspree.io)
2. Crea un nuovo form e copia l'endpoint
3. In `contatti.html`, modifica il tag form:

```html
<form id="contact-form" action="https://formspree.io/f/tuo-codice" method="POST">
```

4. Rimuovi da `js/main.js` la funzione `submitForm` che simula l'invio

### Opzione 2: EmailJS

1. Registrati su [emailjs.com](https://emailjs.com)
2. Segui la loro guida per integrare con JavaScript

---

## 🔧 Come Modificare gli Orari

Nel file `components/footer.html`, cerca la sezione orari:

```html
<strong class="text-white">Orari:</strong><br>
Lun - Ven: 8:30-12:30, 15:00-19:00<br>
Sab: 8:30-12:30
```

Modifica gli orari secondo necessità.

---

## 🌐 Come Pubblicare il Sito

### Hosting semplice (Netlify, Vercel)

1. Vai su [netlify.com](https://netlify.com) o [vercel.com](https://vercel.com)
2. Trascina la cartella del sito
3. Il sito sarà online in pochi secondi

### Con dominio personalizzato

1. Dopo aver caricato su Netlify/Vercel
2. Vai in Settings → Domains
3. Aggiungi il tuo dominio `colombinilelio.it`
4. Configura i DNS come indicato

---

## ✅ Checklist Prima di Pubblicare

- [ ] Logo inserito in header e footer
- [ ] Numero di telefono corretto
- [ ] Email corretta
- [ ] Numero WhatsApp configurato
- [ ] Mappa Google con indirizzo giusto
- [ ] Form contatti collegato a servizio email
- [ ] Immagini ottimizzate
- [ ] Tutti i link funzionanti
- [ ] Testi controllati per errori

---

## 🆘 Hai Bisogno di Aiuto?

Se riscontri problemi, controlla:

1. La console del browser (F12 → Console) per errori
2. Che tutti i file siano nella posizione corretta
3. Che i nomi dei file siano esatti (maiuscole/minuscole contano!)

---

*Guida creata per Colombini Lelio SRL*
