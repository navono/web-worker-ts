import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
// import webWorkerLoader from 'rollup-plugin-web-worker-loader';
import comlink from "@surma/rollup-plugin-comlink";
import omt from "@surma/rollup-plugin-off-main-thread";

export default [
	// browser-friendly UMD build
	{
		input: 'src/index.ts',
		output: {
			file: pkg.browser,
			format: 'umd',
			name: "rolluplib",
		},
		plugins: [
			// webWorkerLoader({
			// 	inline: true,
			// }),
			comlink(),
			omt(),
			resolve(),   // so Rollup can find `ms`
			commonjs(),  // so Rollup can convert `ms` to an ES module
			typescript({
				typescript: require('typescript'),
				useTsconfigDeclarationDir: true,
				rollupCommonJSResolveHack: true,
				clean: true
			}) // so Rollup can convert TypeScript to JavaScript
		]
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify 
	// `file` and `format` for each target)
	// {
	// 	input: 'src/main.ts',
	// 	external: ['ms'],
	// 	plugins: [
	// 		typescript() // so Rollup can convert TypeScript to JavaScript
	// 	],
	// 	output: [
	// 		{ file: pkg.main, format: 'cjs' },
	// 		{ file: pkg.module, format: 'es' }
	// 	]
	// }
];
