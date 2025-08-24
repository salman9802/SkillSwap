import path from "path";

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   // server: {
//   //   proxy: {
//   //     "/api": {
//   //       target: "http://localhost:3000/",
//   //       changeOrigin: true,
//   //       rewrite: (path) => {
//   //         console.log(path);
//   //         return path;
//   //       },
//   //     },
//   //   },
//   // },
// });

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, "..", ".."));

  let computedEnv: any = {};
  // map env values to appropriate key
  for (const k in env) {
    if (Object.prototype.hasOwnProperty.call(env, k)) {
      computedEnv[`import.meta.env.${k}`] = JSON.stringify(env[k]);
    }
  }

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      ...computedEnv,
    },
    test: {
      environment: "jsdom",
      globals: true,
      include: [
        "src/**/*.test.{js,jsx,ts,tsx}",
        "src/**/*.spec.{js,jsx,ts,tsx}",
      ],
      setupFiles: ["src/__tests__/vitest-setup.ts"],
    },
  };
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
