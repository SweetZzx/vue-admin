import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    // 自动导入 API
    AutoImport({
      // 自动导入的库
      imports: ['vue', 'vue-router', 'pinia'],

      // 自动导入的函数
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/ // .vue
      ],

      // 生成类型声明文件的路径
      dts: './auto-imports.d.ts',

      // ESLint 支持
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      },

      // 解析器
      resolvers: [ElementPlusResolver()],

      // 自定义导入
      dirs: ['./src/composables/**', './src/utils/**']
    }),
    Components({
      //组件
      resolvers: [ElementPlusResolver()],
      //所有组件可以自动加载
      dirs: ['src/components', 'src/layout/components']
    }),
    ElementPlus({})
  ],

  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
  }
});
