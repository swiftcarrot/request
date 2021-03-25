import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

const input = './src/index.ts';
const external = (id) => !id.startsWith('.') && !id.startsWith('/');

export default [
  {
    input,
    output: {
      file: pkg.main,
      format: 'cjs'
    },
    external,
    plugins: [typescript()]
  },
  {
    input,
    output: {
      file: pkg.module,
      format: 'esm'
    },
    external,
    plugins: [typescript()]
  }
];
