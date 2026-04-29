/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard'],
  rules: {
    'selector-class-pattern': /^(hte-.*|boxHead)$/,
    'custom-property-pattern': /^hte-/,
    'at-rule-no-unknown': [true, { ignoreAtRules: ['for'] }],
  },
  overrides: [
    {
      files: ['src/entrypoints/popup/index.css'],
      rules: {
        'selector-id-pattern': null,
        'selector-class-pattern': null,
        'custom-property-pattern': null,
      },
    },
  ],
}
