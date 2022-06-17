// ----- 提示信息配置文件 ----- //

// chalk : 为提示命令添加颜色 (https://www.npmjs.com/package/chalk)
const chalk = require('chalk');

const downing = (...info) => {
    console.log(chalk.blue(...info));
}

const loading = (...info) => {
    console.log(chalk.green(...info));
}

const error = (...info) => {
    console.log(chalk.red(...info));
} 

const clear = () => {
    console.clear();
}

module.exports = {
    downing,
    loading,
    error,
    clear
}