import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

// import autoImport from '.eslint-auto-import.json';

import { readFileSync } from 'fs';

// 自动导入配置
let autoImport = { globals: {} };
try {
  autoImport = JSON.parse(readFileSync('./.eslintrc-auto-import.json', 'utf8'));
} catch {
  autoImport = { globals: {} };
}

export default defineConfig([
  // 忽略文件配置
  {
    ignores: [
      'dist/**/*',
      'node_modules/**/*',
      'build/**/*',
      'coverage/**/*',
      '*.d.ts',
      'public/**/*'
    ]
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...autoImport.globals }
    }
  },
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } }
  },

  {
    //自定义规则，根据需要增加自己的规则  eslint 主要校验代码规范  prettiier 主要格式化代码
    rules: {
      // 基础规则
      'no-console': 'warn',
      'vue/multi-word-component-names': 'off',

      // TypeScript 规则 - 解决类型注解警告
      '@typescript-eslint/no-inferrable-types': 'off', // 允许显式类型注解
      '@typescript-eslint/explicit-function-return-type': 'off', // 不强制函数返回类型
      '@typescript-eslint/explicit-module-boundary-types': 'off', // 不强制导出函数类型
      '@typescript-eslint/no-explicit-any': 'warn', // any 类型警告而不是错误
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ], // 未使用变量警告，忽略下划线开头的变量

      // Vue 规则优化
      'vue/no-unused-vars': 'warn',
      'vue/no-mutating-props': 'warn',
      'vue/require-default-prop': 'off', // 不强制 props 默认值
      'vue/require-prop-types': 'off', // 不强制 props 类型（TS 已处理）

      'no-undef': 'warn',
      'no-unused-vars': 'warn',
      'no-unused-expressions': 'warn',
      'no-implicit-globals': 'warn',

      // 代码质量规则
      'prefer-const': 'warn',
      'no-var': 'error',
      'object-shorthand': 'warn',
      'prefer-template': 'warn'
    }
  },
  prettierRecommended
]);
