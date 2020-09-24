#!/usr/bin/env node

'use strict';


process.on( 'unhandledRejection', err => {
  throw err;
});

const chalk = require( 'chalk' );
const spawn = require( 'cross-spawn' );
const download = require( '../lib/download' );


const excutedDir = process.cwd();
const scripts = [ 'create', 'init', 'build', 'dev', 'start', 'test' ];
const args = process.argv.slice( 2 );
const scriptIndex = args.findIndex( x => scripts.indexOf( x ) !== -1 );
let script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice( 0, scriptIndex ) : [];

switch ( script ) {
  case '-v':
  case '--version':
    console.log( require( '../package.json' ).version );
    break;

  case 'init': {
    download( excutedDir );
    break;
  }
  case 'dev':
  case 'build':
  case 'test': {
    const result = spawn.sync(
      'node',
      nodeArgs
        .concat( require.resolve( '../lib/' + script ))
        .concat( args.slice( scriptIndex + 1 )),
      { stdio: 'inherit' }
    );
    if ( result.signal ) {
      if ( result.signal === 'SIGKILL' ) {
        console.log(
          'The build failed because the process exited too early. ' +
            'This probably means the system ran out of memory or someone called ' +
            '`kill -9` on the process.'
        );
      } else if ( result.signal === 'SIGTERM' ) {
        console.log(
          'The build failed because the process exited too early. ' +
            'Someone might have called `kill` or `killall`, or the system could ' +
            'be shutting down.'
        );
      }
      process.exit(0);
    }
    process.exit( result.status );
    break;
  }
  default:
    if ( script ) {
      console.log( 'Unknown script "' + script + '".' );
      console.log( 'Perhaps you need to update coaes-cli?' );
    } else {
      console.log( 'Do you mean ' + chalk.gray( 'coaes dev' ) + '?' );
      console.log( chalk.gray( 'Also you can try:' ));
      console.log( chalk.gray( 'coaes build' ));
      console.log( chalk.gray( 'coaes start' ));
      console.log( chalk.gray( 'coaes test' ));
    }
    break;
}
