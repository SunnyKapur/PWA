import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "offline-bidu",
        short_name: "ob",
        description: "this is our first pwa project",
        theme_color: "#ffffff",
      },

      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return (
                url.origin === "https://fakestoreapi.com" &&
                url.pathname === "/products"
              );
            },

            handler: "NetworkFirst",

            options: {
              cacheName: "products-cache",

              networkTimeoutSeconds: 3,

              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
              },
            },
          },
        ],

        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: true,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
});
