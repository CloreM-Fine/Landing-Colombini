/**
 * COLOMBINI LELIO SRL - Components Loader
 * Carica dinamicamente header e footer in ogni pagina
 */

document.addEventListener('DOMContentLoaded', function () {
    loadComponent('header-placeholder', 'components/header.html');
    loadComponent('footer-placeholder', 'components/footer.html');
});

/**
 * Carica un componente HTML in un elemento placeholder
 * @param {string} placeholderId - ID dell'elemento placeholder
 * @param {string} componentPath - Percorso del file del componente
 */
async function loadComponent(placeholderId, componentPath) {
    const placeholder = document.getElementById(placeholderId);

    if (!placeholder) {
        console.warn(`Placeholder '${placeholderId}' non trovato`);
        return;
    }

    try {
        const response = await fetch(componentPath);

        if (!response.ok) {
            throw new Error(`Errore nel caricamento del componente: ${response.status}`);
        }

        const html = await response.text();
        placeholder.innerHTML = html;

        // Dopo il caricamento, inizializza le funzionalità specifiche
        if (placeholderId === 'header-placeholder') {
            initHeader();
        }

        if (placeholderId === 'footer-placeholder') {
            initFooter();
        }

        // Evidenzia il link di navigazione attivo
        setActiveNavLink();

    } catch (error) {
        console.error(`Errore nel caricamento di ${componentPath}:`, error);
        placeholder.innerHTML = `<p class="text-red-500 p-4">Errore nel caricamento del componente</p>`;
    }
}

/**
 * Inizializza le funzionalità dell'header
 */
function initHeader() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (mobileMenuOverlay && mobileMenu) {
        mobileMenuOverlay.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Chiudi menu mobile cliccando sui link
    const mobileNavLinks = mobileMenu?.querySelectorAll('a');
    mobileNavLinks?.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Header sticky on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

/**
 * Inizializza le funzionalità del footer
 */
function initFooter() {
    // Aggiorna l'anno nel copyright
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Imposta il link di navigazione attivo basato sulla pagina corrente
 */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Desktop navigation
    const navLinks = document.querySelectorAll('nav a[href]');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('text-primary', 'font-semibold');
            link.classList.remove('text-gray-700');
        }
    });

    // Mobile navigation
    const mobileNavLinks = document.querySelectorAll('#mobile-menu a[href]');
    mobileNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('bg-green-50', 'text-primary');
        }
    });
}
