module.exports = {
  root: true,
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        project: [
          "tsconfig.*?.json",
          "e2e/tsconfig.json"
        ],
        createDefaultProgram: true
      },
      extends: [
        "plugin:@angular-eslint/recommended",
        "airbnb-typescript/base",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended"
      ],
      rules: {
        ...
      }
    },
    {
      files: ["*.component.html"],
      extends: ["plugin:@angular-eslint/template/recommended"],
      rules: {
        "max-len": ["error", { "code": 140 }]
      }
    },
    {
      files: ["*.component.ts"],
      extends: ["plugin:@angular-eslint/template/process-inline-templates"]
    },
    {
      files: ["src/**/*.spec.ts", "src/**/*.d.ts"],
      parserOptions: {
        project: "./src/tsconfig.spec.json"
      },
      extends: ["plugin:jasmine/recommended"],
      plugins: ["jasmine"],
      env: { jasmine: true },
      rules: {
        "@typescript-eslint/no-unused-vars": "off"
      }
    }
  ]
};
