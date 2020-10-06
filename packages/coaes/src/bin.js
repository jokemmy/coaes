#!/usr/bin/env node


import { Command } from 'commander';
import App from '../lib/app'


const program = new Command();

program
  .name( "coaes" )
  .usage("<command>")
  .helpOption( '-h, --help', '显示帮助' )
  .option( '-c, --config-file <path>', '指定配置文件' );


program.parse( process.argv );

if ( program.configFile ) {
  App( program.opts());
}
