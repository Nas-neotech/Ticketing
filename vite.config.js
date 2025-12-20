import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { API } from "./API_URL";
// https://vitejs.dev/config/
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
