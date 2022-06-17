// ----- 写入模板文件 ----- //

const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const log = require('./log');

// 写入ejs模板方法
const compile = (templatePath, data = {}, options = {}) => {
    // 返回渲染完后的HTMl字符串
    return new Promise((resolve, reject) => {
        // 语法: ejs.renderFile(filename, data, options, function(err, str){}
        ejs.renderFile(templatePath, { data }, options, (err, str) => {
            if (err) {
                reject(err);
                return
            }
            resolve(str);
        })
    })
}


// 文件创建过滤器
const DirSync = (pathName) => {
    // 判断当前文件是否为存在
    if (fs.existsSync(pathName)) {
        return true;
    } else {
        // 如果不存在, 则创建对应的文件夹
        if (DirSync(path.dirname(pathName))) {
            fs.mkdirSync(pathName);
            return true;
        }
    }
}



// 写入文件方法
const writeToFile = (path, content) => {
    // 1. 判断文件是否存在
    if (fs.existsSync(path)) {
        log.error(`${path} already exists`);
    }
    // 2. 写入文件
    return fs.promises.writeFile(path, content);
}


module.exports = { compile, writeToFile, DirSync }