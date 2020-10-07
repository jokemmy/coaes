
import fs from 'fs';
import webpack from 'webpack';
import getPaths from './paths';
import { getFileSize } from './showSize';
import { error, info } from './logger';
import merge from './config/merge';
import loadConfig from './config/load';
import configDefault from './config/config.default';
import configWebpack from './config/config.webpack';
import compiler from './compiler';


/**
 *
 * @param { configFile } binArgs
 *
 * coaes --configFile ./coaes.config.js
 */
export default function App( binArgs ) {

  const { configFile } = binArgs;
  const config = merge( configDefault, loadConfig( configFile ));
  const paths = getPaths( config );
  const context = { env: process.env.NODE_ENV, paths };

  // console.log(config);

  // config.plugins.forEach(( plugin ) => {
  //   plugin.extend( config, context );
  // });

  // config.plugins.forEach(( plugin ) => {
  //   plugin.execute( config, context );
  // });

  compiler( configWebpack, context );

  /**
   * alias
   */
  return {

  };
};
