export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      screens: {
        coarse: { raw: "(pointer: coarse)" },
        fine: { raw: "(pointer: fine)" },
        standalone: { raw: "(display-mode: standalone)" },
      },
    },
  },
  plugins: [],
};
