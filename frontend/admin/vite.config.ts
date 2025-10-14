import path from "path";

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   resolve: {
//     alias: {
//       "@src": path.resolve(__dirname, "src"),
//     },
//     extensions: [".ts", ".tsx", ".js", ".jsx"],
//   },
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
        "@src": path.resolve(__dirname, "src"),
      },
    },
    define: {
      ...computedEnv,
    },
  };
});
