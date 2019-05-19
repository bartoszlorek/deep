import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const files = [
  ['index.js', 'deep.js'],
  'deep-each.js',
  'deep-filter.js',
  'deep-map.js'
];

const result = files.map(fileName => {
  let inputName = fileName;
  let outputName = fileName;

  if (Array.isArray(fileName)) {
    inputName = fileName[0];
    outputName = fileName[1];
  }

  return {
    input: `src/${inputName}`,
    output: {
      file: `dist/${outputName}`,
      format: 'esm'
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**'
      })
    ]
  }
});

export default result;