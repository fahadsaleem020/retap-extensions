import pkg from "./package.json" assert { type: "json" };
import { externals } from "rollup-plugin-node-externals";
import typescript from "rollup-plugin-typescript2";
import terser from "@rollup/plugin-terser";
import del from "rollup-plugin-delete";
import { defineConfig } from "rollup";

export default defineConfig([
  {
    input: "index.tsx",

    output: {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },

    plugins: [
      del({ targets: "lib/*", verbose: true }),
      terser(),
      externals(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
    ],
  },
]);
