// ----- 帮助命令配置文件 ----- //

const program = require('commander');

const helpOptions = () => {
    // 动态查看帮助命令
    program.option('-s --src <src>', 'Your project path 你的项目路径')
    program.option('-d --dest <dest>', 'I“m a destination folder 你的目的地文件夹 ');
    program.on('--help', function () {})
}

module.exports = helpOptions;