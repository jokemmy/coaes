#!/usr/bin/env node


import { Command } from 'commander';
import App from '../lib/app'


const program = new Command();

program
  .name( "coaes" )
  .usage("<command>")
  .helpOption( '-h, --help', '显示帮助' )
  .option( '-c, --config-file <configPath>', '指定配置文件' )
  .option( '-r, --root <dirPath>', '指定运行目录' );


program.parse( process.argv );

App( program.opts());
