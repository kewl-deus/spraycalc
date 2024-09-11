import {VitePWA} from 'vite-plugin-pwa';
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/spraycalc/',
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'script',

            pwaAssets: {
                disabled: true,
                config: true,
            },

            manifest: {
                name: 'Spray Calculator',
                short_name: 'Spray Calc',
                description: 'Spray Calculation App',
                theme_color: '#689f38',
                icons: [
                    {
                        src: "logo-64x64.png",
                        sizes: "64x64",
                        type: "image/png"
                    }, {
                        src: "logo-192x192.png",
                        sizes: "192x192",
                        type: "image/png"
                    }, {
                        src: "logo-512x512.png",
                        sizes: "512x512",
                        type: "image/png"
                    }, {
                        src: "maskable-logo-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable"
                    }
                ]
            },

            workbox: {
                globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
                cleanupOutdatedCaches: true,
                clientsClaim: true,
            },

            devOptions: {
                enabled: false,
                navigateFallback: 'index.html',
                suppressWarnings: true,
                type: 'module',
            },
        })],
})