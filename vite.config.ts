import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@cyopo/App": path.resolve(__dirname, "src/common/app"),
      "@cyopo/Components": path.resolve(__dirname, "src/common/components"),
      "@cyopo/Constants": path.resolve(__dirname, "src/common/constants"),
      "@cyopo/Hooks": path.resolve(__dirname, "src/common/hooks"),
      "@cyopo/Models": path.resolve(__dirname, "src/common/models"),
      "@cyopo/Services": path.resolve(__dirname, "src/common/services"),
      "@cyopo/Theme": path.resolve(__dirname, "src/common/theme"),
      "@cyopo/Utils": path.resolve(__dirname, "src/common/utils"),
      "@cyopo/Redux": path.resolve(__dirname, "src/common/redux"),
      "@cyopo/Pages": path.resolve(__dirname, "src/pages"),
      "@cyopo/Mock": path.resolve(__dirname, "src/test/mock"),
    },
  },
  server: {
    port: 3000,
  },
});
