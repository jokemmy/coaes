
/**
 *
 *  {
 *    root: process.cwd(),
 *    analyze: true,
 *    basename: '/',
 *    hash: '',
 *    build: 'dist',
 *    plugins: [],
 *    engine: null,
 *    extend: null,
 *    override: ( config ) => config
 *
 *    // extend-webpack
 *    // indexTemplate: '',
 *    // mountElementId: 'root'
 *    manifest: true,
 *    noParse: RegExp [RegExp] function(resource) string [string]
 *    // history: 'browser',
 *  }
 *
 */

import validate from './validate';
import urlLoader from './loaders/urlLoader';
import devConfig from './webpack.config.dev';
import prodConfig from './webpack.config.prod';


export default function({ context, config }) {

  validate( config );

  const { hash, static, noParse } = config;
  const isDev = context.env === 'development';
  let defaultConfig = isDev ? devConfig : prodConfig;

  let staticFileName = `${static}/[name].[ext]`;
  const output = {
    path: paths.appBuild,
    publicPath: config.basename,
    // 默认配置中添加
    // filename: '[name].js',
    // chunkFilename: '[id].chunk.js'
  };

  if ( /^(hash|chunkhash|contenthash)/.test( hash )) {
    output.filename = output.filename.replace( /\.js$/, `.$[${hash}].js` );
    output.chunkFilename = output.chunkFilename.replace( /\.js$/, `.$[${hash}].js` );
    staticFileName = staticFileName.replace( /\.\[ext\]$/, `.$[${hash}].[ext]` );
  }

  const module = {
    noParse,
    rules: []
  };

  Object.assign( defaultConfig, { output, module });

}
