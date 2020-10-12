
export default {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  // entry: getEntry(['./src/index.js']),
  output: {
    // publicPath: '/',
    // path: path.resolve( process.cwd(), './dist' ),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    modules: [
      paths.appSrc,
      paths.appNodeModules,
      paths.ownNodeModules
    ],
    extensions: [
      '.web.js', '.web.jsx', '.web.ts', '.web.tsx',
      '.js', '.jsx', '.ts', '.tsx', '.json'
    ], // eslint-disable-line
    // alias: {
    //   'react-native': 'react-native-web',
    //   'react-navigation': 'react-navigation/lib/react-navigation.js'
    // }
  },
  module: {
    noParse: [/moment.js/],
    rules: [{
      exclude: [
        /\.html$/,
        /\.jsx?$/,
        /\.(css|less)$/,
        /\.json$/,
        /\.svg$/,
        /\.tsx?$/
      ],
      use: [urlLoader({ name: staticFileName })]
    }, {
      test: /\.jsx?$/,
      include: paths.appSrc,
      use: [babelLoader( babelOptions )]
    }, {
      test: /\.tsx?$/,
      include: paths.appSrc,
      use: [ babelLoader( babelOptions ), typescriptLoader() ]
    }, {
      test: /\.css$/,
      include: paths.appSrc,
      use: [
        styleLoader(),
        cssLoader( cssOptions, cssModules ),
        postcssLoader()
      ]
    }, {
      test: /\.less$/,
      include: paths.appSrc,
      use: [
        styleLoader(),
        cssLoader( cssOptions, cssModules ),
        postcssLoader(),
        lessLoader( lessTheme )
      ]
    }, {
      test: /\.css$/,
      include: paths.appNodeModules,
      use: [
        styleLoader(),
        cssLoader( cssOptions ),
        postcssLoader()
      ]
    }, {
      test: /\.less$/,
      include: paths.appNodeModules,
      use: [
        styleLoader(),
        cssLoader( cssOptions ),
        postcssLoader(),
        lessLoader( lessTheme )
      ]
    }, {
      test: /\.json$/,
      use: [jsonLoader()]
    }]
    .concat( svgRules )
  },
  plugins: combine(
    plugins.Define(),
    plugins.HotModuleReplacement(),
    plugins.CaseSensitivePaths(),
    plugins.WatchMissingNodeModules(),
    plugins.SystemBellWebpack(),
    plugins.CopyPublic(),
    plugins.DllPlugins(),
    plugins.HtmlWebpack(),
    plugins.CommonsChunk()
  ),
  // externals: config.externals,
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};