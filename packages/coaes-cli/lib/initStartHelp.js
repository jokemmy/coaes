
const chalk = require( 'chalk' );
const fpm = require( './findPackageManager' );
const { log } = require( './utils' );


module.exports = function() {

  const pm = fpm();

  log();
  log( `${chalk.yellowBright( 'Success!' )} You can run several commands:

${chalk.bold( `${pm} dev` )}
  Starts the development server.

${chalk.bold( `${pm} start` )}
  Starts the production server.

${chalk.bold( `${pm} build` )}
  Bundles the app into static files for production.

${chalk.bold( `${pm} test` )}
  Starts the test runner.

We suggest that you begin by typing:

  ${chalk.bold( `${pm} dev` )}

Enjoy!` );

};