const esbuild = require('esbuild');
const sassPlugin = require('esbuild-plugin-sass');

esbuild.build({
  entryPoints: {
    application: 'app/javascript/application.js',
    calendar: 'app/javascript/packs/calendar.js',
  },
  bundle: true,
  sourcemap: true,
  outdir: 'app/assets/builds',
  plugins: [sassPlugin()],
  loader: { '.js': 'jsx', '.scss': 'css' },
  resolveExtensions: ['.js', '.jsx', '.scss'],
}).catch(() => process.exit(1));