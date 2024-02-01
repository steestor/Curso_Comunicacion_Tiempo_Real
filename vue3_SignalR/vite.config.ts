import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), AutoImport({ imports: ["vue", "vue-router"] })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "devextreme/ui": "devextreme/esm/ui",
    },
  },
  server: {
    port: 4000,
    open: true,
  },
  build: {
    outDir: "dist",
  },
});
