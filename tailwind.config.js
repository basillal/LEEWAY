/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./projects/shell/**/*.{html,ts}",
    "./projects/core/**/*.{html,ts}",
    "./projects/libs/left-menu-lib/**/*.{html,ts}",
    "./projects/libs/multi-dropdown-lib/**/*.{html,ts}",
    "./projects/libs/dynamic-form/**/*.{html,ts}",
    "./projects/libs/basic-report-lib/**/*.{html,ts}",
    "./projects/libs/create-view-lib/**/*.{html,ts}",

    "./node_modules/flowbite/**/*.js" // add this line

  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "Arial", "sans-serif"], // Set Roboto as the default font
      },
    },
    fontFamily: {
      sans: ["Roboto", "Arial", "sans-serif"], // Ensure it overrides Tailwind's default sans font
    },
  },
  plugins: [
    require('flowbite/plugin') // add this line
  ],}
