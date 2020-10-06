
import fs from 'fs';
import path from 'path';
import assert from 'assert';


// 默认查找的配置文件名称
const configFileNames = [ '.coaesrc', 'coaes.config.js', 'coaes.json', 'coaes.config.json' ];



export default function( args ) {

  const root = process.cwd();
  const appArgs = {};

  // 配置文件
  if ( args.configFile ) {

    assert( fs.existsSync( path.join( root, args.configFile )), '指定的配置文件不存在' );
    appArgs.configFile = args.configFile;

  } else {

    const filePath = configFileNames
      .map(( fileName ) => path.join( root, `./${fileName}` ))
      .find(( filePath ) => fs.existsSync( filePath ));
    if ( filePath ) {
      appArgs.configFile = filePath;
    }
    //「 else 的情况使用默认配置 」
  }

  return appArgs;
}