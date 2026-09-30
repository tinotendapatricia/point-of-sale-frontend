import baseConfig from '../../../eslint.config.mjs';
import { angularProject } from '../../../tools/eslint/angular.mjs';

export default [
  ...baseConfig,
  ...angularProject({ prefix: 'pos-frontend', dirname: import.meta.dirname }),
];
