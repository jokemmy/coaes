
const fs = require( 'fs' );
const chalk = require( 'chalk' );


function log( typeFn ) {
  return function( str = '' ) {
    return console.log( typeFn ? typeFn( str ) : str );
  }
}

exports.warning = log( chalk.keyword('orange'))
exports.error = log( chalk.bold.red );
exports.info = log( chalk.red );
exports.log = log();

exports.readDir = ( dir ) => {
  if ( fs.existsSync( dir )) {
    return fs.readdirSync( dir );
  }
  return [];
};

