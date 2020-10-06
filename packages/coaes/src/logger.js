
import chalk from 'chalk';

// process.env.COAES_LOG = true;
// process.env.COAES_LOG_LEVEL = 'info';
// process.env.COAES_LOG_ONLY = 'debug,info,warn,error';
// process.env.COAES_LOG_IGNORE = 'trace,fatal,mark';


const logLevel = {
  // trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  // fatal: 5,
  // mark: 6,
  off: 7
};

const noop = function() {};

// 消息输出
function log( typeFn, prefix ) {
  return function( data, ...args ) {
    const words = typeFn ? typeFn( data ) : data;
    return prefix ? console.log( prefix + words, ...args ) : console.log( words, ...args ) ;
  }
}

function logSwitch( levelName, logFn ) {
  return ( ...args ) => ( process.env.COAES_LOG &&
    ( only ? only.indexOf( levelName ) !== -1 : ( !ignore || ignore.indexOf( levelName ) === -1 )) &&
    logLevel[levelName] > logLevel[process.env.COAES_LOG_LEVEL] ? logFn : noop )( ...args );
}

export const debug = ( ...args ) => {
  return ( process.env.COAES_DEBUG ? logSwitch( 'debug', log( chalk.grey, chalk.greenBright( ' DEBUG ' ))) : noop )( ...args );
};
export const info = logSwitch( 'info', log( chalk.whiteBright, chalk.blueBright( ' INFO ' )));
export const warn = logSwitch( 'warn', log( chalk.yellowBright, chalk.yellowBright( ' WARN ' )));
export const error = logSwitch( 'error', log( chalk.redBright, chalk.bgRed.black( ' ERROR ' )));
