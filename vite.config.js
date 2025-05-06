import { defineConfig } from "vite";
import path from "path"
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from 'vite-plugin-pwa'
// https://vite.dev/config/

const manifestForPlugin={
  registerTypes:"prompt",
  manifest:{
    "short_name": "ByteChat",
    "name": "ByteChat",
    "description":"Chat App",
    "icons": [
      {
        src: "/ByteChat.png",
        sizes: "192x192",
        type: "image/png",
     },
     {
        src: "/ByteChat.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon"
     },
  ],
  theme_color: "#2196f3",
  background_color: "#2196f3",
  display: "standalone",
  scope: "/",
  start_url: "/"
}
}

export default defineConfig({
  plugins: [react(), tailwindcss(),VitePWA(manifestForPlugin)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
