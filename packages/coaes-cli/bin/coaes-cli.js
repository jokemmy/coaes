#!/usr/bin/env node
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

function _asyncToGenerator2() {
  const data = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

  _asyncToGenerator2 = function () {
    return data;
  };

  return data;
}

const path = require('path');

const cloneRepo = require('../lib/cloneRepo');

const runInstall = require('../lib/runInstall');

const initStartHelp = require('../lib/initStartHelp');

const createStartHelp = require('../lib/createStartHelp');

const runModuleCoaes = require('../lib/runModuleCoaes');

const {
  error,
  log,
  createDir,
  readDir
} = require('../lib/utils');

function handleError(err) {
  log();
  error(err);
  log();
  process.exit(1);
}

process.on('unhandledRejection', handleError);
process.on('uncaughtException', handleError);
const excutedDir = process.cwd();
const args = process.argv.slice(2);
const script = args[0];
const nodeArgs = args.slice(1);

switch (script) {
  case '-v':
  case '-version':
    log(`coaes-cli@${require('../package.json').version}`);
    break;

  case 'create':
    {
      (0, _asyncToGenerator2().default)(function* () {
        const createArgs = nodeArgs[0] || '';
        const dir = path.join(excutedDir, createArgs);

        if (path.join(dir, '..') === excutedDir) {
          log();
          log(`Creating a new app in ${dir}.`);
          yield createDir(dir);
          yield cloneRepo(dir);
          yield runInstall(dir);
          createStartHelp(createArgs, dir);
        } else {
          throw `"${createArgs}" 不是一个正确的目录名称`;
        }
      })();
      break;
    }

  case 'init':
    {
      (0, _asyncToGenerator2().default)(function* () {
        const files = readDir(excutedDir + '/dist');

        if (files.length === 0) {
          yield cloneRepo(excutedDir + '/dist');
          yield runInstall(excutedDir + '/dist');
          initStartHelp();
        } else {
          throw `${excutedDir} 文件夹中已经存在文件`;
        }
      })();
      break;
    }

  case 'dev':
  case 'start':
  case 'build':
  case 'test':
    {
      runModuleCoaes(excutedDir, script, nodeArgs);
      break;
    }

  case '-h':
  case '-help':
  default:
    log();
    log('Usage: coaes <command>');
    log();
    log('Command:');
    log('  -h/-help');
    log('  -v/-version');
    log('  create <appname>');
    log('  init');
    log('  start');
    log('  build');
    log('  dev');
    log('  test');
    log();
    log(`coaes-cli@${require('../package.json').version} ${path.join(__dirname, '..')}`);
    break;
}