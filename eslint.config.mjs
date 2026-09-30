// Root ESLint flat config for the Nx workspace.
// Applies to every project; Angular rules live in tools/eslint/angular.mjs.
import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],

  {
    ignores: ['**/dist', '**/coverage', '**/.nx', '**/.angular', '**/tmp', '**/vite.config.*.timestamp*'],
  },

  // Library boundaries. Tag every project in project.json, e.g.
  //   "tags": ["scope:pos", "type:feature"]
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$', '^.*/tools/eslint/.*\\.mjs$'],
          depConstraints: [
            // Apps compose features; features compose the layers below them.
            { sourceTag: 'type:app', onlyDependOnLibsWithTags: ['type:feature', 'type:ui', 'type:data-access', 'type:core', 'type:util'] },
            { sourceTag: 'type:feature', onlyDependOnLibsWithTags: ['type:feature', 'type:ui', 'type:data-access', 'type:core', 'type:util'] },
            // ui libs may import a domain's data-access for entity types only (import type ...).
            { sourceTag: 'type:ui', onlyDependOnLibsWithTags: ['type:ui', 'type:data-access', 'type:util'] },
            { sourceTag: 'type:data-access', onlyDependOnLibsWithTags: ['type:data-access', 'type:core', 'type:util'] },
            // core: app-wide providers, interceptors, DrawerService, ToastService, api types.
            { sourceTag: 'type:core', onlyDependOnLibsWithTags: ['type:data-access', 'type:util'] },
            { sourceTag: 'type:util', onlyDependOnLibsWithTags: ['type:util'] },

            // Products stay isolated; only scope:shared crosses product lines.
            { sourceTag: 'scope:pos', onlyDependOnLibsWithTags: ['scope:pos', 'scope:shared'] },
            { sourceTag: 'scope:fiscaldirect', onlyDependOnLibsWithTags: ['scope:fiscaldirect', 'scope:shared'] },
            { sourceTag: 'scope:slms', onlyDependOnLibsWithTags: ['scope:slms', 'scope:shared'] },
            { sourceTag: 'scope:bmg', onlyDependOnLibsWithTags: ['scope:bmg', 'scope:shared'] },
            { sourceTag: 'scope:ewallet', onlyDependOnLibsWithTags: ['scope:ewallet', 'scope:shared'] },
            { sourceTag: 'scope:shared', onlyDependOnLibsWithTags: ['scope:shared'] },
          ],
        },
      ],
    },
  },

  // Plain-TypeScript rules for every project (no type information needed).
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        { assertionStyle: 'as', objectLiteralTypeAssertions: 'never' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
];
