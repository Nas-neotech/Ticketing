import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { api } from "../api_url";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/freeside": {
        target: `${api}`,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
