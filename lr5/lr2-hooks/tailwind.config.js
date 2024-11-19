import flowbite from "flowbite-react/tailwind"; 
const { addDynamicIconSelectors } = require('@iconify/tailwind')

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js}", 
		flowbite.content(),
		"./node_modules/flowbite/**/*.js"
	],
  theme: {
    extend: {},
  },
  plugins: [
		flowbite.plugin(),
		addDynamicIconSelectors(),
	],
}

