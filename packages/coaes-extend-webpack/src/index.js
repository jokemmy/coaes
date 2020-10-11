
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
 *    // extend-webpack
 *    indexTemplate: '',
 *    mountElementId: 'root'
 *    manifest: true,
 *  }
 *
 */

import path from 'path';
import validate from './validate';
import devConfig from './webpack.config.dev';
import prodConfig from './webpack.config.prod';


export default function({ context, config }) {

  validate( config );

  const { hash } = config;
  const output = {
    publicPath: config.basename,
    path: paths.appBuild,
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  };

  if ( hash === 'hash' || hash === 'chunkhash' || hash === 'contenthash' ) {
    output.chunkFilename = chunkFilename.replace( /\.js/, `.[${hash}].js` );
  }



  if ( context.env === 'development' ) {

  }


}
