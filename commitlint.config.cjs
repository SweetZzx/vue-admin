module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 只保留最基本的规则
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'revert',
        'build',
        'ci'
      ]
    ],

    // 禁用大部分检查，只保留核心功能
    'subject-case': [0],
    'subject-max-length': [0],
    'subject-min-length': [0],
    'subject-empty': [2, 'never'], // 只保留主题不能为空
    'type-case': [2, 'always', 'lower-case'], // 类型必须小写
    'type-empty': [2, 'never'] // 类型不能为空
  }
};
