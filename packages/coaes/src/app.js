
import is from 'whatitis';
// import omit from 'object.omit';
import invariant from 'invariant';
import getPaths from './paths';
import Events from './events';
import compose from './compose';
import { loadExtend, loadEngine, loadPlugin } from './loadModule';
import getBinArgs from './getBinArgs';
import getConfig from './getConfig';


/**
 *
 * @param { configFile } binArgs
 *
 * coaes --configFile ./coaes.config.js
 */
function App( config ) {

  const app = new Events;
  let packConfig = {};
  let extend = null;
  let engine = null;
  let plugins = [];

  app.config = config;
  app.context = { env: process.env.NODE_ENV, paths: getPaths( app.config ), cwd: app.config.root };

  app.getPackConfig = () => packConfig;
  app.setPackConfig = ( newConfig ) => packConfig = newConfig;

  const keys = Object.keys( app );
  app.extend = ( extra ) => {
    Object.assign( app, omit( extra, [ ...keys, 'extend' ]));
  }

  if ( config.extend ) {
    extend = loadExtend( config.extend );
    invariant( is.Function( extend ), `${config.extend} 加载错误` );
    extend({ ...app });
  }

  // 扩展 run 函数
  app.run = function() {};
  if ( extend ) {
    engine = loadEngine( config.engine );
    invariant( is.Function( engine ), `${config.engine} 加载错误` );
    app.run = engine({ ...app });
    invariant( is.Function( app.run ), `${config.engine} 没有提供有效的执行方法` );
  }

  if ( engine ) {
    config.plugins.forEach(( id ) => {
      const plugin = loadPlugin( id );
      if ( plugin ) {
        invariant( is.Function( plugin ), `${id} 加载错误` );
        plugins.push( plugins );
      }
    });
    app.setPackConfig(
      plugins.reduce(( lastConfig, plugin ) => plugin( lastConfig, app.context ), app.getPackConfig())
    );
  }

  if ( is.Function( app.config.override )) {
    app.setPackConfig( app.config.override( app.getPackConfig()));
  }

  app.run( app.getPackConfig());

  // 1.提供默认配置 进行配置转换 提供转换工具函数 扩展APPCONFIG
  // 是否分析，别名，模板相关，目录
  // 2.加载 engine 提供相关的要求修改配置 扩展APPCONFIG
  // 开发和发布还有dll的配置修改以及配置扩展
  // 3.加载插件，根据engine的要求修改配置
  // 4.运行配置

  return app;
};


export default compose( App, getConfig, getBinArgs );