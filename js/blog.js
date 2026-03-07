/**
 * COLOMBINI LELIO - Blog System
 * Sistema di gestione blog dinamico
 */

class BlogSystem {
    constructor() {
        this.posts = [];
        // Rileva se siamo nella cartella blog o nella root
        const isInBlogFolder = window.location.pathname.includes('/blog-assets/') && !window.location.pathname.endsWith('/blog/');
        this.baseUrl = isInBlogFolder ? 'posts.json?v=4' : '/blog-assets/posts.json?v=2';
    }

    /**
     * Carica tutti i post dal JSON
     */
    async loadPosts() {
        try {
            const response = await fetch(this.baseUrl);
            const data = await response.json();
            this.posts = data.posts || [];
            return this.posts;
        } catch (error) {
            console.error('Errore caricamento post:', error);
            return [];
        }
    }

    /**
     * Ottieni un post specifico per slug
     */
    getPostBySlug(slug) {
        return this.posts.find(post => post.slug === slug);
    }

    /**
     * Ottieni un post specifico per ID
     */
    getPostById(id) {
        return this.posts.find(post => post.id === id);
    }

    /**
     * Ottieni gli ultimi N post (esclusi quelli nascosti)
     */
    getLatestPosts(count = 3) {
        return this.posts
            .filter(post => !post.hidden)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, count);
    }

    /**
     * Ottieni tutti i post visibili (esclusi quelli nascosti)
     */
    getVisiblePosts() {
        return this.posts.filter(post => !post.hidden);
    }

    /**
     * Filtra post per categoria
     */
    getPostsByCategory(category) {
        return this.posts.filter(post => post.category === category);
    }

    /**
     * Filtra post per tag
     */
    getPostsByTag(tag) {
        return this.posts.filter(post => !post.hidden && post.tags.includes(tag));
    }

    /**
     * Cerca nei post
     */
    searchPosts(query) {
        const lowerQuery = query.toLowerCase();
        return this.posts.filter(post => 
            !post.hidden && (
                post.title.toLowerCase().includes(lowerQuery) ||
                post.excerpt.toLowerCase().includes(lowerQuery) ||
                post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
            )
        );
    }

    /**
     * Formatta la data in italiano
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('it-IT', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    /**
     * Crea la card HTML per un post
     */
    createPostCard(post) {
        return `
            <article class="blog-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                <a href="/blog-assets/post.html?id=${post.id}" class="block">
                    <div class="relative overflow-hidden aspect-video">
                        <img 
                            src="${post.coverImage}" 
                            alt="${post.title}"
                            class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                        >
                        <div class="absolute top-4 left-4">
                            <span class="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                ${post.category}
                            </span>
                        </div>
                    </div>
                </a>
                <div class="p-6">
                    <div class="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span class="flex items-center gap-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                            ${this.formatDate(post.date)}
                        </span>
                        <span class="flex items-center gap-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            ${post.readingTime} di lettura
                        </span>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-green-700 transition-colors">
                        <a href="/blog-assets/post.html?id=${post.id}">${post.title}</a>
                    </h3>
                    <p class="text-gray-600 mb-4 line-clamp-3">${post.excerpt}</p>
                    <a href="/blog-assets/post.html?id=${post.id}" class="inline-flex items-center text-green-700 font-semibold hover:text-green-800 transition-colors">
                        Leggi articolo
                        <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                        </svg>
                    </a>
                </div>
            </article>
        `;
    }

    /**
     * Renderizza la lista dei post nel container
     */
    renderPostsList(containerId, posts = null) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const postsToRender = posts || this.posts.filter(post => !post.hidden);
        
        if (postsToRender.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <p class="text-gray-500 text-lg">Nessun articolo trovato.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = postsToRender.map(post => this.createPostCard(post)).join('');
    }

    /**
     * Renderizza i post recenti (sidebar/widget)
     */
    renderRecentPosts(containerId, count = 3, posts = null) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const recentPosts = posts ? posts.slice(0, count) : this.getLatestPosts(count);
        
        container.innerHTML = recentPosts.map(post => `
            <a href="/blog-assets/post.html?id=${post.id}" class="flex gap-4 group">
                <img src="${post.coverImage}" alt="${post.title}" class="w-20 h-20 object-cover rounded-lg flex-shrink-0">
                <div>
                    <h4 class="font-semibold text-gray-800 group-hover:text-green-700 transition-colors line-clamp-2 text-sm">
                        ${post.title}
                    </h4>
                    <span class="text-xs text-gray-500">${this.formatDate(post.date)}</span>
                </div>
            </a>
        `).join('');
    }

    /**
     * Renderizza i tag cloud
     */
    renderTagsCloud(containerId, posts = null) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const postsToUse = posts || this.posts.filter(p => !p.hidden);
        const allTags = [...new Set(postsToUse.flatMap(post => post.tags))];
        
        container.innerHTML = allTags.map(tag => `
            <a href="/blog.html?tag=${encodeURIComponent(tag)}" 
               class="inline-block bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-700 px-3 py-1 rounded-full text-sm transition-colors">
                ${tag}
            </a>
        `).join('');
    }

    /**
     * Renderizza il contenuto completo di un post
     */
    renderFullPost(containerId, postId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const post = this.getPostById(postId);
        if (!post) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <h1 class="text-2xl font-bold text-gray-800 mb-4">Articolo non trovato</h1>
                    <p class="text-gray-600 mb-6">L'articolo che stai cercando non esiste o è stato rimosso.</p>
                    <a href="/blog.html" class="btn btn-primary px-6 py-3 rounded-lg">
                        Torna al Blog
                    </a>
                </div>
            `;
            return;
        }

        // Aggiorna meta tag SEO
        this.updateMetaTags(post);

        // Genera contenuto HTML
        let sectionsHtml = '';
        post.content.sections.forEach(section => {
            sectionsHtml += this.renderSection(section);
        });

        container.innerHTML = `
            <article class="blog-post">
                <!-- Header -->
                <header class="mb-8">
                    <div class="flex items-center gap-3 mb-4">
                        <span class="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            ${post.category}
                        </span>
                        <span class="text-gray-500 text-sm">${this.formatDate(post.date)}</span>
                    </div>
                    <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        ${post.title}
                    </h1>
                    <div class="flex items-center gap-6 text-gray-600">
                        <span class="flex items-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                            ${post.author}
                        </span>
                        <span class="flex items-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            ${post.readingTime} di lettura
                        </span>
                    </div>
                </header>

                <!-- Immagine Copertina -->
                <div class="mb-8 rounded-xl overflow-hidden">
                    <img src="${post.coverImage}" alt="${post.title}" class="w-full h-auto object-cover">
                </div>

                <!-- Intro -->
                <div class="prose prose-lg max-w-none mb-8">
                    <p class="text-xl text-gray-600 leading-relaxed">${post.content.intro}</p>
                </div>

                <!-- Contenuto -->
                <div class="prose prose-lg max-w-none">
                    ${sectionsHtml}
                </div>

                <!-- Tags -->
                <div class="mt-12 pt-8 border-t border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Tag</h3>
                    <div class="flex flex-wrap gap-2">
                        ${post.tags.map(tag => `
                            <a href="/blog.html?tag=${encodeURIComponent(tag)}" 
                               class="bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-700 px-4 py-2 rounded-full text-sm transition-colors">
                                ${tag}
                            </a>
                        `).join('')}
                    </div>
                </div>

                <!-- Share -->
                <div class="mt-8 pt-8 border-t border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Condividi</h3>
                    <div class="flex gap-3">
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" 
                           target="_blank" rel="noopener"
                           class="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                            </svg>
                        </a>
                        <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}" 
                           target="_blank" rel="noopener"
                           class="w-10 h-10 bg-sky-500 hover:bg-sky-600 text-white rounded-full flex items-center justify-center transition-colors">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/>
                            </svg>
                        </a>
                        <a href="https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}" 
                           target="_blank" rel="noopener"
                           class="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                        </a>
                        <button onclick="navigator.clipboard.writeText(window.location.href); alert('Link copiato!');"
                                class="w-10 h-10 bg-gray-600 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </article>
        `;
    }

    /**
     * Renderizza una singola sezione
     */
    renderSection(section) {
        let html = `<section id="${section.id}" class="mb-12">`;
        html += `<h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">${section.title}</h2>`;
        
        if (section.content) {
            html += `<div class="text-gray-700 leading-relaxed">${section.content}</div>`;
        }

        if (section.image) {
            html += `
                <figure class="my-8 rounded-xl overflow-hidden shadow-lg">
                    <img src="${section.image}" alt="${section.imageAlt || ''}" class="w-full h-auto">

                </figure>
            `;
        }

        if (section.subsections) {
            section.subsections.forEach(sub => {
                html += `<div class="mt-8">`;
                html += `<h3 class="text-xl font-bold text-gray-800 mb-4">${sub.title}</h3>`;
                html += `<div class="text-gray-700 leading-relaxed">${sub.content}</div>`;
                
                if (sub.image) {
                    html += `
                        <figure class="my-6 rounded-xl overflow-hidden shadow-lg">
                            <img src="${sub.image}" alt="${sub.imageAlt || ''}" class="w-full h-auto">

                        </figure>
                    `;
                }
                html += `</div>`;
            });
        }

        html += `</section>`;
        return html;
    }

    /**
     * Aggiorna i meta tag per SEO
     */
    updateMetaTags(post) {
        // Title
        document.title = post.metaTitle || post.title;
        
        // Meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.content = post.metaDescription || post.excerpt;
        }

        // Meta keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords && post.keywords) {
            metaKeywords.content = post.keywords;
        }

        // Open Graph
        this.setMetaProperty('og:title', post.title);
        this.setMetaProperty('og:description', post.excerpt);
        this.setMetaProperty('og:image', post.coverImage);
        this.setMetaProperty('og:url', window.location.href);

        // Twitter Card
        this.setMetaProperty('twitter:title', post.title);
        this.setMetaProperty('twitter:description', post.excerpt);
        this.setMetaProperty('twitter:image', post.coverImage);

        // Canonical
        let canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            canonical.href = window.location.href;
        }
    }

    setMetaProperty(property, content) {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (meta) {
            meta.content = content;
        }
    }
}

// Inizializza il sistema blog
const blogSystem = new BlogSystem();

// Esporta per uso globale
window.BlogSystem = BlogSystem;
window.blogSystem = blogSystem;
