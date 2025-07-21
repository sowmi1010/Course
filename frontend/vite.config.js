import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: {
        darkMode: "class", // ✅ Enables class-based dark mode
        content: [
          "./index.html",
          "./src/**/*.{js,ts,jsx,tsx}", // ✅ Add paths to scan
        ],
        theme: {
          extend: {
            colors: {
              orange: {
                500: "#FF9800",
                600: "#FB8C00",
              },
            },
          },
        },
        plugins: [],
      },
    }),
  ],
});
