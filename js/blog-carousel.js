/**
 * COLOMBINI LELIO SRL - Blog Carousel Component
 * Script riutilizzabile per il carosello blog
 */

// Funzione globale per scrollare il carousel
function scrollBlogCarousel(direction) {
    const container = document.getElementById('home-blog-posts');
    if (container) {
        const scrollAmount = 350;
        if (direction === 'left') {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }
}

/**
 * Carica e renderizza i post del blog nel carousel
 * @param {string} containerId - ID del container (default: 'home-blog-posts')
 * @param {number} limit - Numero di post da caricare (default: 6)
 */
async function loadBlogCarousel(containerId = 'home-blog-posts', limit = 6) {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
        const response = await fetch('/blog-assets/posts.json?v=4');
        if (!response.ok) throw new Error('Errore nel caricamento dei post');
        
        const data = await response.json();
        const posts = data.posts || []; // Supporta sia {posts: []} che array diretto
        
        // Filtra i post nascosti e prendi solo i primi N
        const visiblePosts = posts.filter(post => !post.hidden);
        const postsToShow = visiblePosts.slice(0, limit);
        
        // Renderizza i post
        container.innerHTML = postsToShow.map(post => `
            <article class="flex-shrink-0 w-80 md:w-96 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow snap-start">
                <a href="/blog-assets/post.html?id=${post.id}" class="block">
                    <div class="relative h-48 overflow-hidden">
                        <img src="${post.coverImage}" alt="${post.title}" 
                             class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                             onerror="this.src='images/placeholder.webp'">
                        <span class="absolute top-4 left-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            ${post.category}
                        </span>
                    </div>
                    <div class="p-6">
                        <div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                            ${new Date(post.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-green-700 transition-colors">
                            ${post.title}
                        </h3>
                        <p class="text-gray-600 text-sm line-clamp-2 mb-4">
                            ${post.excerpt}
                        </p>
                        <span class="inline-flex items-center text-green-700 font-medium text-sm">
                            Leggi l'articolo
                            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                            </svg>
                        </span>
                    </div>
                </a>
            </article>
        `).join('');
        
    } catch (error) {
        console.error('Errore nel caricamento dei post del blog:', error);
        container.innerHTML = `
            <div class="flex-shrink-0 w-full text-center py-8">
                <p class="text-gray-500">Impossibile caricare gli articoli. <a href="/blog.html" class="text-green-700 hover:underline">Visita il blog</a></p>
            </div>
        `;
    }
}

// Inizializzazione automatica se il container esiste
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('home-blog-posts')) {
        loadBlogCarousel();
    }
});
