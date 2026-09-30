// Shared Angular lint rules for every Angular app and library in the workspace.
// Each project's eslint.config.mjs calls angularProject({ prefix, dirname }).
import nx from '@nx/eslint-plugin';
import angular from 'angular-eslint';

/** 'pos-frontend' -> 'posFrontend' (attribute directives use camelCase). */
const toCamel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

/**
 * @param {object}   opts
 * @param {string|string[]} opts.prefix   Selector prefix(es), kebab-case, e.g. 'pos-frontend' or ['fd'].
 * @param {string}   opts.dirname          Pass import.meta.dirname from the project config.
 * @param {string[]} [opts.tsconfigs]      tsconfig files used for type-aware rules.
 */
export function angularProject({ prefix, dirname, tsconfigs = ['./tsconfig.*?.json'] }) {
  const prefixes = Array.isArray(prefix) ? prefix : [prefix];

  return [
    ...nx.configs['flat/angular'],
    ...nx.configs['flat/angular-template'],
    // angular-eslint ships this preset without a files glob; scope it to templates
    // or the template parser is applied to .ts files too.
    ...angular.configs.templateAccessibility.map((c) => ({ ...c, files: ['**/*.html'] })),

    // ---------- Component and directive TypeScript ----------
    {
      files: ['**/*.ts'],
      languageOptions: {
        parserOptions: { project: tsconfigs, tsconfigRootDir: dirname },
      },
      rules: {
        // Selectors
        '@angular-eslint/component-selector': ['error', { type: 'element', prefix: prefixes, style: 'kebab-case' }],
        '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: prefixes.map(toCamel), style: 'camelCase' }],

        // Modern Angular defaults
        '@angular-eslint/prefer-standalone': 'error',
        '@angular-eslint/prefer-on-push-component-change-detection': 'error',
        '@angular-eslint/prefer-signals': 'error',
        '@angular-eslint/prefer-output-emitter-ref': 'error',
        '@angular-eslint/prefer-inject': 'error',
        '@angular-eslint/no-uncalled-signals': 'error',
        '@angular-eslint/prefer-output-readonly': 'error',

        // Lifecycle hygiene
        '@angular-eslint/use-lifecycle-interface': 'error',
        '@angular-eslint/no-async-lifecycle-method': 'error',
        '@angular-eslint/no-empty-lifecycle-method': 'error',

        // Component metadata
        '@angular-eslint/consistent-component-styles': ['error', 'string'],
        '@angular-eslint/relative-url-prefix': 'error',
        '@angular-eslint/component-max-inline-declarations': ['error', { template: 5, styles: 10, animations: 15 }],

        // Type-aware TypeScript rules
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { attributes: false } }],
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/prefer-readonly': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'warn',
        '@typescript-eslint/prefer-optional-chain': 'error',

        // Forms, security and import conventions
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: '@angular/forms',
                importNames: ['FormsModule', 'NgModel'],
                message: 'Template-driven forms are not used. Use ReactiveFormsModule with typed forms.',
              },
              {
                name: '@angular/common',
                importNames: ['NgIf', 'NgFor', 'NgSwitch', 'NgSwitchCase', 'NgSwitchDefault'],
                message: 'Use the built-in @if / @for / @switch control flow instead.',
              },
            ],
            patterns: [
              { group: ['rxjs/operators'], message: "Import operators from 'rxjs' directly." },
            ],
          },
        ],
        'no-restricted-syntax': [
          'error',
          {
            selector: "CallExpression[callee.property.name=/^bypassSecurityTrust/]",
            message: 'Bypassing DomSanitizer needs an ADR. Add an eslint-disable comment that links to it.',
          },
          {
            selector: "CallExpression[callee.property.name='get'][arguments.0.type='Literal'][callee.object.property.name=/form$/i]",
            message: "Use typed access (form.controls.name) instead of string paths (form.get('name')).",
          },
          {
            selector: "CallExpression[callee.property.name='get'][arguments.0.type='Literal'][callee.object.name=/form$/i]",
            message: "Use typed access (form.controls.name) instead of string paths (form.get('name')).",
          },
          {
            selector: "CallExpression[callee.name='inject'][arguments.0.name='FormBuilder']",
            message: 'Inject NonNullableFormBuilder so every control resets to its initial value instead of null.',
          },
        ],
        'no-restricted-globals': [
          'warn',
          { name: 'localStorage', message: 'Never keep tokens in localStorage. Prefer HttpOnly cookies via the BFF, or sessionStorage.' },
        ],
      },
    },

    // ---------- Templates ----------
    {
      files: ['**/*.html'],
      rules: {
        '@angular-eslint/template/prefer-control-flow': 'error',
        '@angular-eslint/template/prefer-at-empty': 'error',
        '@angular-eslint/template/prefer-self-closing-tags': 'error',
        '@angular-eslint/template/prefer-ngsrc': 'error',
        '@angular-eslint/template/prefer-template-literal': 'error',
        '@angular-eslint/template/no-any': 'error',
        '@angular-eslint/template/eqeqeq': 'error',
        '@angular-eslint/template/no-negated-async': 'error',
        '@angular-eslint/template/button-has-type': 'error',
        '@angular-eslint/template/no-inline-styles': ['error', { allowNgStyle: false, allowBindToStyle: true }],
        '@angular-eslint/template/no-interpolation-in-attributes': 'error',
        '@angular-eslint/template/conditional-complexity': ['error', { maxComplexity: 4 }],
        '@angular-eslint/template/cyclomatic-complexity': ['warn', { maxComplexity: 12 }],
        '@angular-eslint/template/attributes-order': ['warn', { alphabetical: false }],
      },
    },

    // ---------- Tests: relax rules that fight test code ----------
    {
      files: ['**/*.spec.ts', '**/*.test.ts', '**/testing/**/*.ts'],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-floating-promises': 'off',
        '@angular-eslint/prefer-on-push-component-change-detection': 'off',
        'no-restricted-syntax': 'off',
      },
    },
  ];
}
