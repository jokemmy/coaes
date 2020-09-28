
const chalk = require( 'chalk' );
const fpm = require( './findPackageManager' );
const { log } = require( './utils' );


module.exports = function( dirname, dirPath ) {

  const pm = fpm();

  log();
  log( `${chalk.yellowBright( 'Success!' )} Created ${dirname} at ${dirPath}.` );
  log( `Inside that directory, you can run several commands:

${chalk.bold( `${pm} dev` )}
  Starts the development server.

${chalk.bold( `${pm} start` )}
  Starts the production server.

${chalk.bold( `${pm} build` )}
  Bundles the app into static files for production.

${chalk.bold( `${pm} test` )}
  Starts the test runner.

We suggest that you begin by typing:

  ${chalk.bold( `cd ${dirname} && ${pm} dev` )}

Enjoy!` );


//   Success! Created c-app at /Users/rainx/Documents/code/lab/c-app
// Inside that directory, you can run several commands:

//   yarn start
//     Starts the development server.

//   yarn build
//     Bundles the app into static files for production.

//   yarn test
//     Starts the test runner.

//   yarn eject
//     Removes this tool and copies build dependencies, configuration files
//     and scripts into the app directory. If you do this, you can’t go back!

// We suggest that you begin by typing:

//   cd c-app
//   yarn start

// Happy hacking!


};