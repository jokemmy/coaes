
export default {
  root: process.cwd(),
  analyze: true,
  basename: '/',
  hash: '',
  build: 'dist',
  static: 'static',
  plugins: [],
  engine: null,
  extend: null,
  override: ( packConfig ) => packConfig
};
