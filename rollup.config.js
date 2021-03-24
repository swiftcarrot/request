import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

const input = './src/index.ts';
const external = id => !id.startsWith('.') && !id.startsWith('/');

export default [
  {
    input,
    output: {
      file: pkg.main,
      format: 'cjs'
    },
    external,
    plugins: [
      typescript(),
      nodeResolve(),
      commonjs()
    ]
  },
  {
    input,
    output: {
      file: pkg.module,
      format: 'esm'
    },
    external,
    plugins: [
      typescript(),
      nodeResolve(),
      commonjs()
    ]
  }
];
