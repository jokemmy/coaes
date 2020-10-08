
export default {
  root: process.cwd(),
  analyze: true,
  basename: '/',
  hash: '',
  history: 'browser',
  manifest: '',
  build: 'dist',
  plugins: [],
  engine: null,
  extend: null,
  webpack: ( config ) => config
  // indexTemplate: '',
  // mountElementId: 'root'
};
