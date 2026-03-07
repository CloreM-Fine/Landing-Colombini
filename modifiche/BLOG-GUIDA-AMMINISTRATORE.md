# 📚 Guida Amministratore - Sistema Blog

Guida completa per aggiungere, modificare e gestire gli articoli del blog di Colombini Lelio SRL.

---

## 🎯 Panoramica del Sistema

Il blog è **completamente dinamico** e utilizza un file JSON come "database" dei post. Non è necessario creare nuove pagine HTML per ogni articolo!

### Come funziona:
1. I dati dei post sono memorizzati in `blog/posts.json`
2. Il file `js/blog.js` carica e renderizza dinamicamente i contenuti
3. Le pagine `blog.html` e `blog/post.html` mostrano i post automaticamente

---

## 📁 Struttura File

```
├── blog/
│   ├── posts.json              ← DATABASE dei post (modifica questo!)
│   ├── post.html               ← Template pagina singola
│   └── NOME-ARTICOLO/          ← Cartella con immagini
│       ├── COPERTINA.jpg
│       ├── immagine1.jpg
│       └── ...
├── blog.html                   ← Pagina lista articoli
├── js/
│   └── blog.js                 ← Logica JavaScript (NON modificare)
└── css/
    └── style.css               ← Stili blog (già configurati)
```

---

## 📝 Come Aggiungere un Nuovo Post

### Passo 1: Crea la cartella delle immagini

1. Crea una nuova cartella in `blog/` con il nome dell'articolo (es: `blog/Come cambiare olio motore/`)
2. Inserisci tutte le immagini necessarie:
   - **COPERTINA.jpg** - Immagine principale (obbligatoria)
   - Altre immagini per il contenuto

> 💡 **Consiglio**: Usa nomi semplici per le immagini (es: `01.jpg`, `02.jpg`, `diagramma.jpg`)

---

### Passo 2: Aggiungi il post al file JSON

Apri `blog/posts.json` e aggiungi un nuovo oggetto nell'array `posts`:

```json
{
  "posts": [
    {
      "id": "cambio-olio-motore",
      "slug": "come-cambiare-olio-motore-auto-guida",
      "title": "Come Cambiare l'Olio del Motore: Guida Completa",
      "metaTitle": "Come Cambiare l'Olio del Motore Auto | Colombini Lelio",
      "metaDescription": "Guida passo passo per cambiare l'olio del motore della tua auto. Consigli professionali, frequenza consigliata e tipologie di olio.",
      "keywords": "cambio olio motore, quando cambiare olio auto, tipo olio motore, manutenzione auto",
      "excerpt": "Il cambio dell'olio è fondamentale per la salute del motore. Scopri quando farlo, come scegliere l'olio giusto e i passaggi per farlo in autonomia.",
      "coverImage": "blog/Come cambiare olio motore/COPERTINA.jpg",
      "author": "Colombini Lelio",
      "date": "2024-12-15",
      "category": "Manutenzione Auto",
      "readingTime": "6 min",
      "tags": [
        "cambio olio motore",
        "manutenzione auto",
        "olio sintetico",
        "filtro olio"
      ],
      "content": {
        "intro": "Testo introduttivo dell'articolo...",
        "sections": [
          {
            "id": "quando-cambiare",
            "title": "1. Quando Cambiare l'Olio del Motore",
            "content": "<p>Contenuto HTML qui...</p><ul class='list-disc pl-6 mb-4 space-y-2'><li>Punto 1</li><li>Punto 2</li></ul>",
            "image": "blog/Come cambiare olio motore/immagine1.jpg",
            "imageAlt": "Descrizione dell'immagine per SEO"
          }
        ]
      }
    }
  ]
}
```

---

## 📋 Campi JSON - Spiegazione Dettagliata

| Campo | Tipo | Obbligatorio | Descrizione |
|-------|------|--------------|-------------|
| `id` | string | ✅ | Identificatore univoco (solo lettere, numeri, trattini) |
| `slug` | string | ✅ | URL-friendly (usato per SEO, senza spazi) |
| `title` | string | ✅ | Titolo completo dell'articolo |
| `metaTitle` | string | ✅ | Titolo per Google (max 60 caratteri) |
| `metaDescription` | string | ✅ | Descrizione per Google (max 155 caratteri) |
| `keywords` | string | ✅ | Parole chiave separate da virgola |
| `excerpt` | string | ✅ | Riassunto per la card (2-3 frasi) |
| `coverImage` | string | ✅ | Percorso immagine principale |
| `author` | string | ✅ | Nome autore |
| `date` | string | ✅ | Data in formato YYYY-MM-DD |
| `category` | string | ✅ | Categoria dell'articolo |
| `readingTime` | string | ✅ | Tempo di lettura stimato (es: "5 min") |
| `tags` | array | ✅ | Lista tag per ricerca e filtri |
| `content` | object | ✅ | Contenuto strutturato dell'articolo |

---

## 🏗️ Struttura del Contenuto

### Introduzione
```json
"intro": "Testo introduttivo che apparirà dopo l'immagine di copertina..."
```

### Sezioni Principali

Ogni sezione può avere:
- `id` - Ancoraggio per link (obbligatorio, unico)
- `title` - Titolo della sezione
- `content` - Contenuto HTML
- `image` - Percorso immagine (opzionale)
- `imageAlt` - Descrizione immagine (opzionale)
- `subsections` - Sottosezioni annidate (opzionale)

#### Esempio Sezione Semplice:
```json
{
  "id": "introduzione",
  "title": "1. Introduzione",
  "content": "<p>Testo con <strong>grassetto</strong> e <a href='...'>link</a>.</p>",
  "image": "blog/nome-cartella/immagine.jpg",
  "imageAlt": "Descrizione immagine"
}
```

#### Esempio con Sottosezioni:
```json
{
  "id": "tipi-olio",
  "title": "2. Tipi di Olio Motore",
  "content": "<p>Introduzione ai tipi...</p>",
  "subsections": [
    {
      "title": "2.1 Olio Minerale",
      "content": "<p>Descrizione olio minerale...</p>",
      "image": "blog/nome-cartella/olio-minerale.jpg",
      "imageAlt": "Bottiglia olio minerale"
    },
    {
      "title": "2.2 Olio Sintetico",
      "content": "<p>Descrizione olio sintetico...</p>"
    }
  ]
}
```

---

## 🎨 HTML Consentito nel Content

Puoi usare questi tag HTML nel campo `content`:

```html
<!-- Testo -->
<p>Paragrafo normale</p>
<p class="mb-4">Paragrafo con margine</p>

<!-- Formattazione -->
<strong>Testo in grassetto verde</strong>
<em>Testo in corsivo</em>
<a href="/pagina">Link interno</a>
<a href="https://..." target="_blank" rel="noopener">Link esterno</a>

<!-- Liste -->
<ul class='list-disc pl-6 mb-4 space-y-2'>
  <li>Elemento lista</li>
</ul>

<ol class='list-decimal pl-6 mb-4 space-y-2'>
  <li>Primo passo</li>
  <li>Secondo passo</li>
</ol>
```

---

## 🔍 SEO - Best Practices

### Meta Title (max 60 caratteri)
```json
"metaTitle": "Come Cambiare l'Olio del Motore Auto | Colombini Lelio"
```
✅ Includi keyword principale + brand

### Meta Description (max 155 caratteri)
```json
"metaDescription": "Guida passo passo per cambiare l'olio del motore. Consigli professionali e tipologie di olio per la tua auto. Scopri di più!"
```
✅ Call to action + keyword + valore

### Slug SEO-friendly
```json
"slug": "come-cambiare-olio-motore-auto-guida"
```
✅ Parole separate da trattini, no spazi, no caratteri speciali

### Tags
```json
"tags": [
  "cambio olio motore",
  "manutenzione auto",
  "olio sintetico",
  "quando cambiare olio"
]
```
✅ 5-10 tag pertinenti, frasi che gli utenti cercano

---

## 🚀 Template Rapido per Nuovo Post

Copia e incolla questo template, poi modifica i valori:

```json
{
  "id": "NOME-UNIVOCO",
  "slug": "titolo-articolo-url-friendly",
  "title": "Titolo Completo dell'Articolo",
  "metaTitle": "Titolo per Google | Colombini Lelio",
  "metaDescription": "Descrizione accattivante per i risultati di ricerca (max 155 caratteri).",
  "keywords": "keyword1, keyword2, keyword3, keyword4",
  "excerpt": "Riassunto di 2-3 frasi che apparirà nella card dell'articolo.",
  "coverImage": "blog/NOME-CARTELLA/COPERTINA.jpg",
  "author": "Colombini Lelio",
  "date": "2024-12-15",
  "category": "Manutenzione Auto",
  "readingTime": "5 min",
  "tags": [
    "tag1",
    "tag2",
    "tag3",
    "tag4"
  ],
  "content": {
    "intro": "Introduzione accattivante che spiega di cosa tratta l'articolo...",
    "sections": [
      {
        "id": "sezione-1",
        "title": "1. Prima Sezione",
        "content": "<p>Contenuto della prima sezione...</p>",
        "image": "blog/NOME-CARTELLA/immagine1.jpg",
        "imageAlt": "Descrizione immagine per SEO"
      },
      {
        "id": "sezione-2",
        "title": "2. Seconda Sezione",
        "content": "<p>Contenuto della seconda sezione...</p>",
        "subsections": [
          {
            "title": "2.1 Sottosezione",
            "content": "<p>Contenuto sottosezione...</p>"
          }
        ]
      },
      {
        "id": "conclusione",
        "title": "Conclusione",
        "content": "<p>Riepilogo finale e call to action...</p>"
      }
    ]
  }
}
```

---

## ✅ Checklist Pre-pubblicazione

Prima di salvare il file JSON, verifica:

- [ ] `id` è univoco e senza spazi
- [ ] `slug` è URL-friendly (solo lettere, numeri, trattini)
- [ ] `metaTitle` ≤ 60 caratteri
- [ ] `metaDescription` ≤ 155 caratteri
- [ ] `date` è nel formato corretto (YYYY-MM-DD)
- [ ] `coverImage` punta a un file esistente
- [ ] Tutte le virgole sono al posto giusto (JSON valido!)
- [ ] Tags contiene almeno 5 elementi pertinenti

---

## 🔧 Validazione JSON

Per verificare che il JSON sia valido:

1. Vai su [jsonlint.com](https://jsonlint.com)
2. Copia tutto il contenuto di `blog/posts.json`
3. Incolla nel validatore
4. Clicca "Validate JSON"
5. Correggi eventuali errori segnalati

⚠️ **IMPORTANTE**: Un JSON non valido farà crashare il blog!

---

## 📸 Immagini - Linee Guida

### Formati consigliati:
- **JPG** per fotografie
- **PNG** per grafiche con trasparenza
- **WebP** per ottimizzazione (se disponibile)

### Dimensioni:
- **Copertina**: 1200x675 px (16:9)
- **Immagini contenuto**: max 1200px di larghezza
- **Peso**: comprimi le immagini (max 200KB ciascuna)

### SEO per immagini:
- Nomi file descrittivi: `batteria-agm-tecnologia.jpg` ❌ non `IMG_1234.jpg`
- Campo `imageAlt` sempre compilato con descrizione pertinente

---

## 📊 Categorie Disponibili

Usa una di queste categorie per mantenere consistenza:

- `Manutenzione Auto`
- `Macchine Agricole`
- `Giardinaggio`
- `Ricambi`
- `Autofficina`
- `Consigli Tecnici`
- `Novità`

---

## 🆘 Risoluzione Problemi

### Il post non appare?
1. Controlla che il JSON sia valido (usa jsonlint.com)
2. Verifica che il campo `id` sia univoco
3. Controlla che le immagini esistano nei percorsi specificati

### Immagini non si vedono?
1. Verifica il percorso: inizia sempre con `blog/`
2. Controlla che il nome file corrisponda esattamente (maiuscole/minuscole!)
3. Apri l'URL dell'immagine direttamente nel browser per testare

### Formattazione strana?
1. Controlla che i tag HTML siano chiusi correttamente
2. Usa apici singoli `'` per gli attributi HTML dentro il JSON
3. Escapa le virgolette doppie con backslash: `\"testo\"`

---

## 💡 Consigli per Ottimi Articoli

1. **Sii specifico**: "Come cambiare l'olio" > "Manutenzione auto"
2. **Usa numeri**: "5 consigli per..." attira più clic
3. **Risposta diretta**: Dai la risposta principale entro le prime 2 righe
4. **Paragrafi brevi**: Max 3-4 righe per paragrafo
5. **Immagini**: Una ogni 300-400 parole
6. **Link interni**: Collega ad altri articoli del blog quando rilevante

---

## 📞 Supporto

Per problemi tecnici o domande:
- Verifica questa guida
- Controlla gli esempi esistenti in `blog/posts.json`
- Consulta il team di sviluppo

---

**Ultimo aggiornamento**: Febbraio 2026

✨ Buona scrittura!
