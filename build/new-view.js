const path = require('path');
const inquirer = require('inquirer');
const fileSave = require('file-save');
const camelCase = require('camelcase');
const resolve = dir => path.join(__dirname, '../', dir);

function ask() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'componentName',
      message: '组件名称：',
      validate(componentName) {
        if (!componentName) {
          return '组件名必填';
        }

        const camelName = camelCase(componentName);

        return true;
      }
    }
  ]);
}

function generateConf({ componentName }) {
  const camelName = camelCase(componentName);

  const files = [
    {
      /* pug 文件 */
      filename: resolve(`./src/views/${camelName}/${camelName}.pug`),
      content: `\
<!DOCTYPE html>
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    meta(http-equiv="X-UA-Compatible", content="ie=edge")
    title Document
  body 
`
    },
    {
      /* stylus 文件 */
      filename: resolve(`./src/views/${camelName}/${camelName}.stylus`),
      content: `
      `
    },
    {
      /* js 文件 */
      filename: resolve(`./src/views/${camelName}/${camelName}.js`),
      content: `
      `
    }
  ];

  return files;
}

function writeFiles(files) {
  files.forEach(file => {
    fileSave(file.filename).write(file.content, 'utf8');
  });
}

ask()
  .then(generateConf)
  .then(writeFiles)
  .then(() => console.log('创建完成!'));