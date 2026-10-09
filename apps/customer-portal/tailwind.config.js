const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    join(__dirname, '../../libs/**/!(*.stories|*.spec).{ts,html}'),
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      // Aliases so libs/core's DrawerService panel (bg-surface, border-hairline,
      // text-ink, text-ink-muted) picks up this app's actual --color-* tokens
      // instead of rendering unstyled.
      colors: {
        surface: 'var(--color-surface)',
        hairline: 'var(--color-divider)',
        ink: 'var(--color-text)',
        'ink-muted': 'color-mix(in srgb, var(--color-text) 60%, transparent)',
        'title': 'var(--color-title-background)',
      },
    },
  },
  plugins: [],
};
