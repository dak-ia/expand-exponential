import { defineConfig } from "vite";
import pkg from "./package.json";

export default defineConfig(({ command }) => {
  const commonConfig = {
    define: {
      VERSION: JSON.stringify(pkg.version),
    },
  };

  if (command === "serve") {
    // dev server
    return {
      ...commonConfig,
      root: "examples",
      server: {
        watch: {
          usePolling: true, // wsl
        },
      },
    };
  } else {
    // build
    return {
      ...commonConfig,
      esbuild: {
        keepNames: true,
      },
      build: {
        lib: {
          entry: "./src/index.ts",
          name: "ExpandExponential",
          formats: ["es", "cjs", "umd"],
          fileName: (format) => {
            if (format === "es") return "index.mjs";
            if (format === "cjs") return "index.cjs";
            if (format === "umd") return "index.umd.js";
          },
        },
        outDir: "dist",
        emptyOutDir: true,
      },
    };
  }
});
