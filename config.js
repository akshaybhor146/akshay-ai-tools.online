/**
 * AKSHAY AI TOOLS - GLOBAL CONFIGURATION
 * 
 * Edit this file to update the brand name, contact info, logos, and API keys 
 * across the entire website from one single place.
 */

const CONFIG = {
    // Brand & Identity
    siteName: "Akshay AI Tools",
    siteUrl: "https://akshay-ai-tools.online",
    authorName: "Akshay Bhor",
    logoPath: "favicon.png", // Kept from original, not explicitly removed by instruction
    contactEmail: "akshaybhor146@gmail.com",
    contactPhone: "+91 7249558414",
    social: {
        instagram: "https://instagram.com/akshaybhor_146",
        github: "https://github.com/akshaybhor146",
        linkedin: "https://linkedin.com/in/akshaybhor",
        youtube: "https://youtube.com/@akshaybhor"
    },

    // API Keys & Secrets
    // Keys have been securely moved to Insforge Edge Function (ai-proxy.js)
    apiKeys: {
        gemini: "",
        openrouter: "",
        huggingface: "" 
    },

    // AI Tool Routing Configuration
    // Assign specific models and API keys to different tools
    // OpenRouter model strings: https://openrouter.ai/models
    tools: {
        'tool-chat': { provider: "openrouter", model: "google/gemini-2.0-flash-001" },
        'tool-code': { provider: "openrouter", model: "google/gemini-2.0-flash-001" },
        'tool-text': { provider: "openrouter", model: "google/gemini-2.0-flash-001" },
        'tool-image': { provider: "openrouter", model: "google/gemini-2.0-flash-001" },
        'tool-reels': { provider: "openrouter", model: "google/gemini-2.0-flash-001" },
        'tool-social': { provider: "openrouter", model: "google/gemini-2.0-flash-001" },
        'tool-translator': { provider: "openrouter", model: "google/gemini-2.0-flash-001" },
        'tool-youtube': { provider: "openrouter", model: "google/gemini-2.0-flash-001" },
        'tool-resume': { provider: "openrouter", model: "google/gemini-2.0-flash-001" },
        'tool-bg-remover': { provider: "openrouter", model: "google/gemini-2.0-flash-001" },
        'tool-interior': { provider: "openrouter", model: "google/gemini-2.0-flash-001" },
        'tool-voice-text': { provider: "openrouter", model: "google/gemini-2.0-flash-001" },
        'tool-avatar-video': { provider: "openrouter", model: "google/gemini-2.0-flash-001" },
        'tool-pdf-chat': { provider: "openrouter", model: "google/gemini-2.0-flash-001" },
        'tool-voiceover': { provider: "openrouter", model: "google/gemini-2.0-flash-001" },
        'tool-presentation': { provider: "openrouter", model: "google/gemini-2.0-flash-001" },
        'tool-ai-detector': { provider: "openrouter", model: "google/gemini-2.0-flash-001" },
        'default': { provider: "openrouter", model: "google/gemini-2.0-flash-001" }
    },

    // Optional Links
    links: {
        twitter: "https://twitter.com/",
        github: "https://github.com/",
    }
};

// Auto-apply configuration to the DOM when the page loads
document.addEventListener("DOMContentLoaded", () => {
    // Helper function to safely replace text within specific tags
    const replaceTextInElements = (selector, oldText, newText) => {
        document.querySelectorAll(selector).forEach(el => {
            if (el.innerHTML.includes(oldText)) {
                // If the element has children, only replace text nodes to avoid killing HTML
                if (el.children.length === 0) {
                    el.textContent = el.textContent.replace(new RegExp(oldText, 'g'), newText);
                } else {
                    el.childNodes.forEach(node => {
                        if (node.nodeType === 3 && node.nodeValue.includes(oldText)) {
                            node.nodeValue = node.nodeValue.replace(new RegExp(oldText, 'g'), newText);
                        }
                    });
                }
            }
        });
    };

    // 1. Update Brand Name where it usually appears (spans, headers, titles)
    replaceTextInElements('span, h1, h2, p, title', 'Akshay AI Tools', CONFIG.siteName);

    // 2. Update Contact Emails
    document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
        if (a.href.includes('bhorakshay146@gmail.com')) {
            a.href = `mailto:${CONFIG.contactEmail}`;
            a.innerHTML = a.innerHTML.replace('bhorakshay146@gmail.com', CONFIG.contactEmail);
        }
    });

    // 3. Update Contact Phones
    document.querySelectorAll('a[href^="tel:"]').forEach(a => {
        if (a.href.includes('+917249558414') || a.href.includes('+91 7249558414')) {
            const cleanPhone = CONFIG.contactPhone.replace(/\s+/g, '');
            a.href = `tel:${cleanPhone}`;
            a.innerHTML = a.innerHTML.replace('+91 7249558414', CONFIG.contactPhone);
        }
    });

    // 4. Update Logos
    document.querySelectorAll('img').forEach(img => {
        if (img.src.includes('favicon.png')) {
            img.src = CONFIG.logoPath;
        }
    });
});
