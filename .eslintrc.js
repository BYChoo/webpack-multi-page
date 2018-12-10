module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': 'off',
    'arrow-parens': 0,
    "no-dupe-keys": 'error',//禁止在对象字面量中出现重复的键
    "no-duplicate-case": 'error',//禁止重复 case 标签
    "no-empty": 'error', //禁止空块语句
    "no-ex-assign": 'error', //禁止对 catch 子句中的异常重新赋值
    "no-extra-parens": 'error', //禁止冗余的括号
    "no-irregular-whitespace": 'error' //禁止不规则的空白
  }
};
