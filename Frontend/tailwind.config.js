module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.js', './public/index.html'],
	content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			sans: ['Roboto', 'sans-serif'],
			serif: ['"Roboto Slab"', 'serif'],
			body: ['Roboto', 'sans-serif'],
		},
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require("@tailwindcss/typography"),
		require('tw-elements/dist/plugin')
	],
};
