import nextVitals from 'eslint-config-next/core-web-vitals'

const eslintConfig = [
  ...nextVitals,
  {
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
      "react-hooks/incompatible-library": "off"
    },
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts"
    ]
  }
];

export default eslintConfig;
