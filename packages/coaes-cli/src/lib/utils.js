
const fs = require( 'fs' );
const chalk = require( 'chalk' );


// 消息输出
function log( typeFn, prefix ) {
  return function( ...words ) {
    if ( typeFn ) {
      return prefix ? console.log( prefix, typeFn( ...words )) : console.log( typeFn( ...words )) ;
    }
    return prefix ? console.log( prefix, ...words ) : console.log( ...words );
  }
}

exports.warn = log( chalk.yellowBright, chalk.yellowBright( ' WARN ' ))
exports.error = log( chalk.redBright, chalk.bgRed.black( ' ERROR ' ));
exports.info = log( chalk.whiteBright, chalk.blueBright( ' INFO ' ));
exports.log = log();

// 文件夹操作
exports.readDir = ( dir ) => {
  if ( fs.existsSync( dir )) {
    return fs.readdirSync( dir );
  }
  return [];
};

exports.createDir = ( dir ) => {
  if ( !fs.existsSync( dir )) {
    fs.mkdirSync( dir, { recursive: true });
  }
};
