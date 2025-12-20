import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { API } from "./src/API_URL";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/freeside": {
        target: `${API}`,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
