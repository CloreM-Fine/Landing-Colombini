/**
 * COLOMBINI LELIO SRL - Main JavaScript
 * Funzionalità principali del sito
 */

document.addEventListener('DOMContentLoaded', function () {
    initScrollAnimations();
    initFAQAccordion();
    initContactForm();
    initCounterAnimation();
    initSmoothScroll();
});

/**
 * Scroll Animations - Intersection Observer
 */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    if (revealElements.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * FAQ Accordion
 */
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('.faq-icon');
            const isOpen = answer.classList.contains('open');

            // Chiudi tutte le altre FAQ
            document.querySelectorAll('.faq-answer').forEach(item => {
                item.classList.remove('open');
            });
            document.querySelectorAll('.faq-question').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle FAQ corrente
            if (!isOpen) {
                answer.classList.add('open');
                question.classList.add('active');
            }
        });
    });
}

/**
 * Contact Form Validation
 */
function initContactForm() {
    const form = document.getElementById('contact-form');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Reset errori
        clearFormErrors();

        // Validazione
        let isValid = true;

        // Nome
        const nome = document.getElementById('nome');
        if (!nome.value.trim()) {
            showError(nome, 'Il nome è obbligatorio');
            isValid = false;
        } else if (nome.value.trim().length < 2) {
            showError(nome, 'Il nome deve avere almeno 2 caratteri');
            isValid = false;
        }

        // Email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError(email, 'L\'email è obbligatoria');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError(email, 'Inserisci un\'email valida');
            isValid = false;
        }

        // Telefono (opzionale ma se inserito deve essere valido)
        const telefono = document.getElementById('telefono');
        if (telefono && telefono.value.trim()) {
            const phoneRegex = /^[\d\s\+\-\(\)]{8,20}$/;
            if (!phoneRegex.test(telefono.value)) {
                showError(telefono, 'Inserisci un numero di telefono valido');
                isValid = false;
            }
        }

        // Messaggio
        const messaggio = document.getElementById('messaggio');
        if (!messaggio.value.trim()) {
            showError(messaggio, 'Il messaggio è obbligatorio');
            isValid = false;
        } else if (messaggio.value.trim().length < 10) {
            showError(messaggio, 'Il messaggio deve avere almeno 10 caratteri');
            isValid = false;
        }

        // Privacy checkbox
        const privacy = document.getElementById('privacy');
        if (privacy && !privacy.checked) {
            showError(privacy, 'Devi accettare la privacy policy');
            isValid = false;
        }

        if (isValid) {
            submitForm(form);
        }
    });

    // Real-time validation on blur
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            validateField(this);
        });

        input.addEventListener('input', function () {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

/**
 * Mostra un errore per un campo
 */
function showError(field, message) {
    field.classList.add('error');
    field.classList.remove('success');

    let errorElement = field.parentElement.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('p');
        errorElement.className = 'error-message visible text-red-500 text-sm mt-1';
        field.parentNode.appendChild(errorElement);
    } else {
        errorElement.classList.add('visible');
    }
    errorElement.textContent = message;
}

/**
 * Rimuove tutti gli errori dal form
 */
function clearFormErrors() {
    document.querySelectorAll('.form-input').forEach(input => {
        input.classList.remove('error', 'success');
    });
    document.querySelectorAll('.error-message').forEach(error => {
        error.classList.remove('visible');
    });
}

/**
 * Valida un singolo campo
 */
function validateField(field) {
    const value = field.value.trim();
    const fieldId = field.id;
    let errorElement = field.parentElement.querySelector('.error-message');

    let isValid = true;
    let message = '';

    switch (fieldId) {
        case 'nome':
            if (!value) {
                isValid = false;
                message = 'Il nome è obbligatorio';
            } else if (value.length < 2) {
                isValid = false;
                message = 'Il nome deve avere almeno 2 caratteri';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                isValid = false;
                message = 'L\'email è obbligatoria';
            } else if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Inserisci un\'email valida';
            }
            break;
        case 'telefono':
            if (value) {
                const phoneRegex = /^[\d\s\+\-\(\)]{8,20}$/;
                if (!phoneRegex.test(value)) {
                    isValid = false;
                    message = 'Inserisci un numero di telefono valido';
                }
            }
            break;
        case 'messaggio':
            if (!value) {
                isValid = false;
                message = 'Il messaggio è obbligatorio';
            } else if (value.length < 10) {
                isValid = false;
                message = 'Il messaggio deve avere almeno 10 caratteri';
            }
            break;
    }

    if (isValid) {
        field.classList.remove('error');
        field.classList.add('success');
        if (errorElement) {
            errorElement.classList.remove('visible');
        }
    } else {
        showError(field, message);
    }

    return isValid;
}

/**
 * Invia il form e reindirizza alla pagina di ringraziamento
 */
function submitForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Mostra stato di caricamento
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Invio in corso...
    `;

    // Invio effettivo a Formspree
    const formData = new FormData(form);
    
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Redirect alla pagina di ringraziamento
            window.location.href = '/thank-you';
        } else {
            throw new Error('Errore nell\'invio');
        }
    }).catch(error => {
        // Ripristina il bottone in caso di errore
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        alert('Si è verificato un errore. Riprova più tardi.');
    });
}

/**
 * Mostra messaggio di successo
 */
function showSuccessMessage(form) {
    // Rimuovi eventuale messaggio precedente
    const existingMessage = document.getElementById('success-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const successDiv = document.createElement('div');
    successDiv.id = 'success-message';
    successDiv.className = 'bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mt-4 flex items-center gap-2 animate-fade-in';
    successDiv.innerHTML = `
        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span><strong>Grazie!</strong> Il tuo messaggio è stato inviato. Ti risponderemo al più presto.</span>
    `;

    form.appendChild(successDiv);

    // Rimuovi dopo 5 secondi
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

/**
 * Counter Animation
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');

    if (counters.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 secondi
                const step = target / (duration / 16); // 60fps
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

/**
 * Smooth Scroll per anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Funzione per aprire WhatsApp con messaggio precompilato
 */
function openWhatsApp(message = '') {
    const phoneNumber = '393534921653';
    const encodedMessage = encodeURIComponent(message || 'Ciao, vorrei maggiori informazioni sui vostri servizi.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Esporta funzioni globali
window.openWhatsApp = openWhatsApp;
