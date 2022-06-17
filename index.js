#!/usr/bin/env node
// ----- 主出口文件 ----- //
const program = require('commander');
const helpOptions = require('./lib/core/help');
const createCommands = require('./lib/core/create');

// 动态查看版本号命令
program.version(require('./package.json').version, '-v, --version');

// 帮助与可选信息
helpOptions();

// 创建其他指令
createCommands();

// 自动解析命令
program.parse(process.argv);
