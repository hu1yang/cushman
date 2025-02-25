import { defineConfig } from "umi";

export default defineConfig({
  routes: [{ path: "/", component: "index" }],

  npmClient: "yarn",
  plugins: ["@umijs/plugins/dist/antd", "@umijs/plugins/dist/dva"],
  antd: {
    configProvider: {},
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
});
