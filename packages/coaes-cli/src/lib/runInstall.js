
const fs = require( 'fs' );
const path = require( 'path' );
const spawn = require( 'cross-spawn' );
const fpm = require( './findPackageManager' );
const { log } = require( './utils' );


module.exports = async function( dir ) {
  if ( fs.existsSync( path.join( dir, 'package.json' ))) {
    let pm = fpm();
    if ( pm ) {
      log( 'Installing packages. This might take a couple of minutes.' );
      spawn.sync(
        pm,
        [''],
        { stdio: 'inherit', cwd: dir }
      );
    }
  }
};
