import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 9000,
  },
  build: {
    // Generate source maps for better debugging (fixes Lighthouse warning)
    sourcemap: false, // keep false in prod, set true only for debugging
    // Increase chunk warning limit
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Split vendor chunks to enable better caching and reduce initial bundle
        manualChunks: {
          // React core - changes rarely, long cache life
          "react-vendor": ["react", "react-dom"],
          // Router - changes rarely
          "router-vendor": ["react-router-dom"],
          // Animation library - large, isolate it
          "motion-vendor": ["framer-motion"],
          // Data fetching - isolate for caching
          "query-vendor": ["@tanstack/react-query"],
          // HTTP client
          "axios-vendor": ["axios"],
        },
      },
    },
    // Minification settings
    minify: "esbuild",
    // Target modern browsers to reduce polyfill overhead
    target: "es2020",
  },
  // Optimize deps
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "framer-motion"],
  },
});
