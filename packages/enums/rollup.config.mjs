import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

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
  plugins: [resolve(), commonjs(), typescript()],
};
