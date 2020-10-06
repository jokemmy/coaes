#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

function _commander() {
  const data = require("commander");

  _commander = function () {
    return data;
  };

  return data;
}

var _app = _interopRequireDefault(require("../lib/app"));

const program = new (_commander().Command)();
program.name("coaes").usage("<command>").helpOption('-h, --help', '显示帮助').option('-c, --config-file <path>', '指定配置文件');
program.parse(process.argv);

if (program.configFile) {
  (0, _app.default)(program.opts());
}