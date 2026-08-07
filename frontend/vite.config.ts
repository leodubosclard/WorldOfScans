import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: ["favicon.ico", "logo512.png", "robots.txt"],
            manifest: {
                id: "terter_worldofscans",
                short_name: "WoS",
                name: "World of Scans",
                description:
                    "World of Scans, votre application de scans gratuite et sans-pub préférrée !",
                start_url: ".",
                scope: "/",
                display: "standalone",
                display_override: ["standalone", "minimal-ui", "window-controls-overlay"],
                theme_color: "#000000",
                background_color: "#ffffff",
                orientation: "any",
                categories: ["books", "entertainment", "magazines"],
                lang: "fr",
                dir: "ltr",
                handle_links: "preferred",
                prefer_related_applications: false,
                icons: [
                    { src: "favicon.ico", sizes: "64x64 32x32 24x24 16x16", type: "image/x-icon" },
                    // ponytail: un seul PNG 512 sert toutes les tailles. Ajouter un vrai 192x192
                    // et une variante maskable le jour où les assets existent.
                    { src: "logo512.png", sizes: "512x512 256x256 192x192", type: "image/png" },
                    { src: "logo512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
                ],
            },
            workbox: {
                // json inclus : les traductions doivent être précachées, pas seulement
                // mises en cache après un premier passage en ligne.
                globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2,json,webmanifest}"],
                navigateFallbackDenylist: [/^\/api\//],
                runtimeCaching: [
                    {
                        // i18next charge ses traductions au runtime : sans ça, l'app est vide offline.
                        urlPattern: /\/locales\/.*\/translation\.json$/,
                        handler: "StaleWhileRevalidate",
                        options: { cacheName: "locales" },
                    },
                    {
                        urlPattern:
                            /^https:\/\/(anime-sama\.tv\/s2\/scans|cdn\.statically\.io\/gh\/Anime-Sama\/IMG)\//,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "scans",
                            expiration: { maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 7 },
                            cacheableResponse: { statuses: [0, 200] },
                        },
                    },
                    {
                        urlPattern: /\/api\//,
                        handler: "NetworkOnly",
                    },
                ],
            },
        }),
    ],
    build: {
        // index.tsx fait un `await` top-level avant le render
        target: "esnext",
    },
    server: {
        proxy: {
            "/api": "http://localhost:3000",
        },
    },
    // `vite preview` sert le vrai build : c'est le seul moyen de tester le service worker.
    preview: {
        proxy: {
            "/api": "http://localhost:3000",
        },
    },
});
