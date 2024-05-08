export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "system-ui"],
    },
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
