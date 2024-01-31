import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteSvgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteSvgLoader()],
  base: "/Pokemon_Search/",
  build: {
    outDir: "build",
  },
});
