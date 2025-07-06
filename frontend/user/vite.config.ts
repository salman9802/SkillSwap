import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:3000/",
  //       changeOrigin: true,
  //       rewrite: (path) => {
  //         console.log(path);
  //         return path;
  //       },
  //     },
  //   },
  // },
});

// export default defineConfig(({ mode }) => {
//   // 👇 Load .env file from parent directory (or wherever it is)
//   const env = loadEnv(mode, path.resolve(__dirname, "..", ".."));

//   return {
//     plugins: [react(), tailwindcss()],
//     resolve: {
//       alias: {
//         "@": path.resolve(__dirname, "./src"),
//       },
//     },
//     define: {
//       // 👇 Expose selected env variables to the client
//       // 'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
//       // API_URL: JSON.stringify(env.VITE_API_URL),
//       // "import.meta.env.NODE_ENV": JSON.stringify(env.NODE_ENV),
//     },
//   };
// });
