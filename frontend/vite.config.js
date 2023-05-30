import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: (id) => {
        // Exclude React and modules starting with 'react-' or 'react/jsx-runtime'
        return /^react(-.*)?|^react\/jsx-runtime/.test(id);
      },
    },
  },
});
