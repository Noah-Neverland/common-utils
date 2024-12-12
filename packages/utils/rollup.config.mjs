import {defineConfig} from 'rollup';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {globSync} from 'glob';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

/** @type {import("rollup").RollupOptions} */
function rollupCompile(format) {
  const isEsm = format === 'es';
  const outDir = isEsm ? 'dist/es' : 'dist/lib';
  return defineConfig({
    input: Object.fromEntries(
      globSync('src/*.ts').map((file) => [
        path.relative(
          'src',
          file.slice(0, file.length - path.extname(file).length)
        ),
        fileURLToPath(new URL(file, import.meta.url)),
      ])
    ),
    external: ['vue', 'dayjs', 'lodash-es'],
    output: [
      {
        dir: outDir,
        format,
        entryFileNames: '[name].js',
      },
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: 'tsconfig.json',
        declaration: isEsm,
        outDir,
      }),
    ],
  });
}

export default [rollupCompile('es'), rollupCompile('cjs')];
