import { createConfig, detectOpts } from '@esrf/eslint-config';
import { defineConfig, globalIgnores } from 'eslint/config';

const opts = detectOpts(import.meta.dirname);

const config = defineConfig([
  globalIgnores(['dist/', 'out/']),
  ...createConfig(opts),
  {
    rules: {
      // False positives with `vscode.postMessage()`
      'unicorn/require-post-message-target-origin': 'off',
    },
  },
]);

export default config;
