// ----- 命令行为配置文件 ----- //

// 实现Promise化
const { promisify } = require('util');
// 打开浏览器命令
const open = require('open');
const path = require('path');
// 项目克隆路径
const { vueRepo }  = require('../config/repo-config');
// 下载项目方法
const download = promisify(require('download-git-repo'));
// 执行命令方法
const { commandSpawn } = require('../utils/terminal');
// 导入模板方法
const { compile, writeToFile, DirSync } = require('../utils/utils');
// 提示命令方法
const log = require('../utils/log');

// 创建项目
const createProjectAction = async (project) => {
    log.loading('Starting to generate project...');
    // 1. clone 项目
    // 执行下载 仓库路径 到 文件夹路径 是否clone
    await download(vueRepo, project, { clone: true })

    // 判断系统是windows还是linux（MAC）
    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';

    // 2. 安装依赖
    await commandSpawn(command, ['install'], { cwd: `./${project}` });

    // 3. 同步打开浏览器
    open(`http://localhost:8080`);
    log.clear();

    // 4. 异步启动项目
    await commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` });
}

// 优化模块
// 参数: 文件名, 文件路径, 模块名, 拼接后的文件名
const handleEjsToFile = async (name, dest, template, filename) => {
    // 1. 获取模板路径
    const templatePath = path.resolve(__dirname, template);
    log.loading('SuccusePath: ' + template);
    // 2. 获取模板文件内容
    const result = await compile(templatePath, { name, lowerName: name.toLowerCase() });
    // 3. 判断是否存在文件夹
    DirSync(dest);
    // 4. 写入文件
    writeToFile(path.resolve(dest, filename), result);
}

// 添加组件 - 基础组件
const addComponentAction = async (name, dest) => {
    handleEjsToFile(name, dest,  '../templates/vue-component.ejs', `${name}.vue`);
}

// 添加页面 - 页面与路由
const addPageAction = async (name, dest) => {
    addComponentAction(name, dest);
    handleEjsToFile(name, dest, '../templates/vue-router.ejs', "router.js");
}

// 添加Vuex模块 - vuex模块
const addStoreAction = async (name, dest) => {
    handleEjsToFile(name, dest, '../templates/vue-store.ejs', 'index.js');
    handleEjsToFile(name, dest, '../templates/vue-types.ejs', 'types.js');
}


module.exports = {
    createProjectAction,
    addComponentAction,
    addPageAction,
    addStoreAction
}


// 创建组件与路由 -- 没优化之前
// const addComponentAction = async (name, dest) => {
//     // 1. 编译ejs模板文件
//     const data = { name, lowerName: name.toLowerCase() }
//     const pageResult = await compile("vue-component.ejs", data);
//     const routeResult = await compile("vue-router.ejs", data);
//     // 2. 执行写入程序
//     const targetPath = path.resolve(dest, name.toLowerCase());
//     // 2.1 判断文件是否存在
//     if (DirSync(targetPath)) {
//         // 2.2 拼接文件路径
//         const targetPagePath = path.resolve(targetPath, `${name}.vue`);
//         const targetRoutePath = path.resolve(targetPath, 'router.js');
//         // 2.3 写入文件
//         writeToFile(targetPagePath, pageResult);
//         writeToFile(targetRoutePath, routeResult);
//     }
// }