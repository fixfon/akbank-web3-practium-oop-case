/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			boxShadow: {
				customShadow: '0 0 3rem 1rem rgba(0, 0, 0, 0.2)',
			},
		},
	},
	plugins: [],
};
