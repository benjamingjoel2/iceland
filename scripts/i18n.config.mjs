/** Locale build settings for scripts/i18n-build.mjs. */
const config = {
  locales: ['fr', 'de', 'es'],
  enAppDir: 'app/(en)',
  // Copied per locale to .i18n/<locale>/ with copy translated. Journal MDX comes from i18n/content/<locale>/.
  sharedDirs: ['components', 'lib', 'data', 'config', 'content'],
};

export default config;
