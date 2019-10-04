import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import { DEFAULT_EXTENSIONS as babel_extensions } from "@babel/core";

module.exports = {
  input: "src/index.ts",
  output: {
    name: "VueVtable",
    globals: {
      vue: "Vue",
      "vue-tsx-support": "tsx",
      "vue-property-decorator": "vuePropertyDecorator"
    }
  },
  external: [
    "vue",
    "vue-property-decorator",
    "vue-class-component",
    "vue-tsx-support"
  ],
  plugins: [
    resolve(),
    typescript({
      tsconfig: "src/tsconfig.json"
    }),
    commonjs(),
    babel({
      extensions: [...babel_extensions, ".ts", ".tsx"],
      exclude: ["node_modules/**"]
    })
  ]
};
