export default {
  mode: 'production',
  bail: true,
  entry: getEntry([ './src/common.js', './src/index.js' ]),
  output: getOutput( output ),
  resolve: {
    modules: [
      paths.appSrc,
      paths.appNodeModules,
      paths.ownNodeModules
    ],
    extensions: [
      '.web.js', '.web.jsx', '.web.ts', '.web.tsx',
      '.js', '.jsx', '.ts', '.tsx', '.json'
    ]
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
      use: [
        babelLoader( babelOptions ),
        typescriptLoader()
      ]
    }, {
      test: /\.css$/,
      include: paths.appSrc,
      use: extractTextExtract({
        fallback: styleLoader(),
        use: [
          cssLoader( cssOptions, cssModules ),
          postcssLoader()
        ]
      })
    }, {
      test: /\.less$/,
      include: paths.appSrc,
      use: extractTextExtract({
        fallback: styleLoader(),
        use: [
          cssLoader( cssOptions, cssModules ),
          postcssLoader(),
          lessLoader( lessTheme )
        ]
      })
    }, {
      test: /\.css$/,
      include: paths.appNodeModules,
      use: extractTextExtract({
        fallback: styleLoader(),
        use: [
          cssLoader( cssOptions ),
          postcssLoader()
        ]
      })
    }, {
      test: /\.less$/,
      include: paths.appNodeModules,
      use: extractTextExtract({
        fallback: styleLoader(),
        use: [
          cssLoader( cssOptions ),
          postcssLoader(),
          lessLoader( lessTheme )
        ]
      })
    }, {
      test: /\.json$/,
      use: [jsonLoader()]
    }]
    .concat( svgRules )
  },
  plugins: combine(
    plugins.Define(),
    plugins.CopyPublic(),
    plugins.UglifyJs(),
    plugins.Visualizer(),
    plugins.ExtractText( undefined, {
      filename: 'style.$[contenthash:4].css'
    }),
    plugins.HtmlWebpack(),
    plugins.CommonsChunk( undefined, {
      filename: 'common.$[chunkhash:4].js'
    })
  ),
  // externals: config.externals,
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
