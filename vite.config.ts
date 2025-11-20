import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 🔥 加载环境变量
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // 🔥 GitHub Pages 部署路径配置
    base: mode === 'production' ? '/vue-admin/' : '/',

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
        dirs: ['src/components', 'src/layout/components'],
        dts: true,
        extensions: ['vue'],
        deep: true
      }),
      ElementPlus({})
    ],

    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
    },

    server: {
      // 🔥 只在开发环境使用代理
      proxy:
        mode === 'development'
          ? {
              '/dev-api': {
                target: env.VITE_API_URL || 'http://localhost:9999',
                changeOrigin: true,
                // 把 /dev-api/login -> /login
                rewrite: (p) => p.replace(/^\/dev-api/, ''),
                // 可选：打印代理信息，方便定位 500
                configure: (proxy) => {
                  proxy.on('error', (err) => {
                    console.log('proxy error:', err);
                  });
                  proxy.on('proxyReq', (proxyReq) => {
                    console.log(
                      'proxy to:',
                      proxyReq.protocol,
                      proxyReq.host,
                      proxyReq.path
                    );
                  });
                }
              }
            }
          : undefined
    }
  };
});
