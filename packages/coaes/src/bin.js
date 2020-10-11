#!/usr/bin/env node


import { Command } from 'commander';
import '../lib/env';
import App from '../lib/app'
import { error, log } from '../lib/logger'


function handleError( err ) {
  log();
  error( err );
  log( err )
  log();
  process.exit(0);
}
process.on( 'unhandledRejection', handleError );
process.on( 'uncaughtException', handleError );


const program = new Command();

program
  .name( "coaes" )
  .usage("<command>")
  .helpOption( '-h, --help', '显示帮助' )
  .option( '-c, --config-file <configPath>', '指定配置文件' )
  .option( '-r, --root <dirPath>', '指定运行目录' );


program.parse( process.argv );

App( program.opts());
