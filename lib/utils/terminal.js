// ----- 执行终端命令文件 ----- //

// 导入异步进程函数 spawn
const { spawn } = require('child_process');
const log = require('../utils/log');

// 创建一个子进程
const commandSpawn = (...args) => {
    log.downing('installing dependencies...');
   
    return new Promise((resolve, reject) => {
        // 创建一个子进程
        const childProcess = spawn(...args);
        // 将子进程的输出流重定向到父进程的输出流
        childProcess.stdout.pipe(process.stdout);
        // 将子进程的错误流重定向到父进程的错误流
        childProcess.stderr.pipe(process.stderr);
        // 当子进程结束时，将子进程的退出码返回给父进程
        childProcess.on('close', () => resolve())
    })
}

module.exports = {
    commandSpawn
}