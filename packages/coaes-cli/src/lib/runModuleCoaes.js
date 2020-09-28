
const fs = require( 'fs' );
const path = require( 'path' );
const chalk = require( 'chalk' );
const spawn = require( 'cross-spawn' );
const fpm = require( './findPackageManager' );
const { error, log } = require( './utils' );


function installTip() {
  const pm = fpm();
  log();
  error( `没有正确安装 coaes，请先运行 ${chalk.cyanBright( `${pm} ${pm === 'npm' ? 'install -dev' : 'add --dev'} coaes` )}` );
  log();
}

module.exports = function( excutedDir, script, nodeArgs ) {
  const packageJson = path.join( excutedDir, 'node_modules', 'coaes', 'package.json' );
  if ( fs.existsSync( packageJson )) {
    const coaesRuner = path.join( packageJson, require( '../package.json' ).bin.coaes );
    if ( fs.existsSync( coaesRuner )) {
      const result = spawn.sync( 'node', [ coaesRuner, script, nodeArgs ], { stdio: 'inherit' });
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
    } else {
      installTip();
    }
  } else {
    installTip();
  }
};
