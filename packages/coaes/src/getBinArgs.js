
import fs from 'fs';
import path from 'path';
import invariant from 'invariant';


// 默认查找的配置文件名称
const configFileNames = [ '.coaesrc', 'coaes.config.js', 'coaes.json', 'coaes.config.json' ];


export default function( binArgs ) {

  const root = process.cwd();
  const appArgs = {};

  // 配置文件
  if ( binArgs.config ) {

    invariant( fs.existsSync( path.join( root, binArgs.config )), '指定的配置文件不存在' );
    appArgs.config = binArgs.config;

  } else {

    const filePath = configFileNames
      .map(( fileName ) => path.join( root, `./${fileName}` ))
      .find(( filePath ) => fs.existsSync( filePath ));
    if ( filePath ) {
      appArgs.config = filePath;
    }
    //「 else 的情况使用默认配置 」
  }

  if ( binArgs.root ) {
    appArgs.root = binArgs.root;
  }

  return appArgs;
}