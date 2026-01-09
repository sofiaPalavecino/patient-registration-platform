import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                includePaths: [path.resolve(__dirname, 'resources/scss')],
                additionalData: `@use "variables" as *;`,
            },
        },
    },
    server: {
        host: '0.0.0.0', // Bind to all interfaces inside the container
        port: 5173,
        hmr: {
            host: 'localhost', // The host name you use in your browser
        },
    },
    esbuild: {
        jsx: 'automatic',
    },
});
