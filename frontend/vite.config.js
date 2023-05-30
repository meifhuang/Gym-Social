import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: (id) => {
        return /^react(-.*)?|^react\/jsx-runtime|react-is/.test(id);
      },
    },
  },
});
