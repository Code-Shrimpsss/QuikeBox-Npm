// ----- 命令主配置文件 ----- //

// commander : 命令行工具(https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md)
const program = require('commander');
const { createProjectAction, addComponentAction, addPageAction, addStoreAction } = require('./actions');
const { commandSpawn } = require('../utils/terminal');
// 设置创建命令
const createCommands = () => {
    // 创建项目命令
    program
        .command('create <project> [others...]')
        .description('create a new project, 创建一个新项目: quikebox create my-project [-d src/components]')
        .action(createProjectAction);
    // 创建组件命令
    program
        .command('addcpn <name> [-d dest]')
        .description('addcpn vue component, 创建一个vue组件: quikebox addcpn my-component [-d dest]')
        .action(name => addComponentAction(name, program.dest || 'src/components'));
    // 创建页面命令
    program
        .command('addpage <name> [-d dest]')
        .description('addpage vue page, 创建一个vue页面: quikebox addpage my-page [-d dest]')
        .action(name => addPageAction(name, program.dest || `src/pages/${name.toLowerCase()}`));
    // 创建vuex模块命令
    program
        .command('addstore <name> [-d dest]')
        .description('addsore vuex store, 创建一个vuex store: quikebox addstore my-store [-d dest]')
        .action(name => addStoreAction(name, program.dest || `src/store/modules/${name.toLowerCase()}`));

    program.command('test').action(async () => {
        commandSpawn("npm", ['--version']);
        open('http://localhost:8080/');
    })
}

module.exports = createCommands;