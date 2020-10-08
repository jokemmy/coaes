
// import fs from 'fs';
import is from 'whatitis';
// import webpack from 'webpack';
import getPaths from './paths';
// import { getFileSize } from './showSize';
// import { error, info } from './logger';
import merge from './config/merge';
import loadConfig from './config/load';
import configDefault from './config/config.default';
import { loadModule } from './utils';
// import configWebpack from './config/config.webpack';
// import engine from './engine';


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

  // 运行配置转换逻辑初始化
  if ( config.extend ) {
    const extend = loadModule( config.extend );
    if ( extend ) {
      extend( config, context );
    }
  }

  // 1.提供默认配置 进行配置转换 提供转换工具函数 扩展APPCONFIG
  // 是否分析，别名，模板相关，目录
  // 2.加载 engine 提供相关的要求修改配置 扩展APPCONFIG
  // 开发和发布还有dll的配置修改以及配置扩展
  // 3.加载插件，根据engine的要求修改配置
  // 4.运行配置


  // plugins
  // packConfig context { ..., config }

  // 运行打包逻辑初始化
  if ( config.engine ) {
    const engine = loadModule( config.engine );
    if ( engine ) {
      engine( config, context );
    }
  }


  // 通用打包逻辑
  // console.log(config);

  // config.plugins.forEach(( plugin ) => {
  //   plugin.extend( config, context );
  // });

  // config.plugins.forEach(( plugin ) => {
  //   plugin.execute( config, context );
  // });



  /**
   * alias
   */
  return {

  };
};
