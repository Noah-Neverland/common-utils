import postcss from 'rollup-plugin-postcss';
// import typescript from '@rollup/plugin-typescript';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import vuePlugin from 'rollup-plugin-vue';

/** @type {import("rollup").RollupOptions} */
export default {
  input: 'src/index.ts',
  external: ['vue'],
  output: [
    {
      file: 'dist/esm.js',
      format: 'esm',
    },
    {
      file: 'dist/cjs.js',
      format: 'cjs',
    },
  ],
  plugins: [
    vuePlugin(),
    resolve(),
    commonjs(),
    typescript({
      check: false,
    }),
    postcss({
      extract: true,
      extract: 'style/index.css',
    }),
  ],
  external: [
    /^vue(\/.+|$)/,
    /^ant-design-vue(\/.+|$)/,
    /^@ant-design\/icons-vue/,
  ],
};
