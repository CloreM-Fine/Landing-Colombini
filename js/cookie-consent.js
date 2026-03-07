/**
 * COLOMBINI LELIO SRL - Cookie Consent Banner
 * GDPR-compliant cookie consent management
 */

(function () {
    'use strict';

    // Configuration
    const COOKIE_NAME = 'cookieConsent';
    const COOKIE_EXPIRY_DAYS = 365;

    // Check if consent has already been given
    function hasConsent() {
        return localStorage.getItem(COOKIE_NAME) !== null;
    }

    // Get consent preferences
    function getConsent() {
        const consent = localStorage.getItem(COOKIE_NAME);
        if (consent) {
            try {
                return JSON.parse(consent);
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    // Save consent preferences
    function saveConsent(preferences) {
        localStorage.setItem(COOKIE_NAME, JSON.stringify(preferences));
    }

    // Create and show the cookie banner
    function showCookieBanner() {
        // Don't show if already consented
        if (hasConsent()) return;

        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-banner-content">
                <div class="cookie-banner-text">
                    <svg class="cookie-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <circle cx="8" cy="9" r="1" fill="currentColor"/>
                        <circle cx="15" cy="8" r="1" fill="currentColor"/>
                        <circle cx="10" cy="14" r="1" fill="currentColor"/>
                        <circle cx="16" cy="13" r="1" fill="currentColor"/>
                        <circle cx="13" cy="17" r="0.5" fill="currentColor"/>
                    </svg>
                    <div>
                        <p class="cookie-banner-title">Questo sito utilizza i cookie</p>
                        <p class="cookie-banner-desc">Utilizziamo cookie tecnici per il funzionamento del sito e, con il tuo consenso, cookie analitici per migliorare la tua esperienza. 
                        <a href="cookies-policy.html" class="cookie-link">Maggiori informazioni</a></p>
                    </div>
                </div>
                <div class="cookie-banner-actions">
                    <button id="cookie-accept-all" class="cookie-btn cookie-btn-accept">Accetta tutti</button>
                    <button id="cookie-accept-necessary" class="cookie-btn cookie-btn-necessary">Solo necessari</button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        // Bind events
        document.getElementById('cookie-accept-all').addEventListener('click', function () {
            acceptAllCookies();
        });

        document.getElementById('cookie-accept-necessary').addEventListener('click', function () {
            acceptNecessaryCookies();
        });

        // Animate in
        setTimeout(() => {
            banner.classList.add('visible');
        }, 100);
    }

    // Accept all cookies
    function acceptAllCookies() {
        saveConsent({
            necessary: true,
            analytics: true,
            timestamp: new Date().toISOString()
        });
        hideBanner();
        loadAnalytics();
    }

    // Accept only necessary cookies
    function acceptNecessaryCookies() {
        saveConsent({
            necessary: true,
            analytics: false,
            timestamp: new Date().toISOString()
        });
        hideBanner();
    }

    // Hide the banner
    function hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.remove('visible');
            setTimeout(() => {
                banner.remove();
            }, 300);
        }
    }

    // Load analytics (if consented)
    function loadAnalytics() {
        const consent = getConsent();
        if (consent && consent.analytics) {
            // Placeholder for Google Analytics or other analytics
            // Uncomment and add your tracking code here:
            /*
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
            ga('create', 'UA-XXXXX-Y', 'auto');
            ga('send', 'pageview');
            */
            console.log('Analytics cookie accepted - tracking enabled');
        }
    }

    // Initialize - check if DOM already loaded (since we're loaded via footer component)
    function init() {
        // Show banner if no consent
        if (!hasConsent()) {
            // Ensure body is available before showing banner
            if (document.body) {
                setTimeout(showCookieBanner, 300);
            } else {
                // Wait for body
                document.addEventListener('DOMContentLoaded', function () {
                    setTimeout(showCookieBanner, 300);
                });
            }
        } else {
            // Load analytics if previously consented
            loadAnalytics();
        }
    }

    // Run init immediately since script is loaded at end of body
    init();

    // Expose function to reopen banner
    window.showCookieBanner = function () {
        localStorage.removeItem(COOKIE_NAME);
        showCookieBanner();
    };

    // Expose function to check analytics consent
    window.hasAnalyticsConsent = function () {
        const consent = getConsent();
        return consent && consent.analytics === true;
    };

})();
