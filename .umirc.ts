import { defineConfig } from "umi";
import routes from './src/routes'
export default defineConfig({
  routes,
  history:{ type: 'browser' },
  npmClient: "yarn",
  plugins: ["@umijs/plugins/dist/antd", "@umijs/plugins/dist/dva"],
  antd: {
    configProvider: {
      theme:{
        components: {
          Table: {
            /* 这里是你的组件 token */
            headerBorderRadius: 0,
            stickyScrollBarBg:'red'
          },
          Form:{
            itemMarginBottom: 26,
          }
        },
      }
    },
    // themes
    dark: false,
    compact: true,
    // less or css, default less
    style: "less",
    // shortcut of `configProvider.theme`
    // use to configure theme token, antd v5 only
    theme: {
    },
    // antd <App /> valid for version 5.1.0 or higher, default: undefined
    appConfig: {},
    // Transform DayJS to MomentJS
    momentPicker: true,
    // Add StyleProvider for legacy browsers
    styleProvider: {
      hashPriority: "high",
      legacyTransformer: true,
    },
  },
  dva: {},
  chainWebpack(config) {
    config.module
    .rule('worker')
    .test(/\.worker\.ts$/) // 匹配 .worker.ts 文件
    .use('worker-loader') // 使用 worker-loader
    .loader('worker-loader')
    .options({
      inline: 'fallback', // 使用 fallback 方式加载
    })
    .end()
    .use('ts-loader') // 处理 TypeScript
    .loader('ts-loader')
    .options({ transpileOnly: true }); // 加快编译速度
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3003',
      changeOrigin: true,
      ws: true, // 支持 WebSocket 和 SSE
      pathRewrite: { '^/api': '' },
    },
  }
});
