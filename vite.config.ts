import { defineConfig } from "vite"
import reactRefresh from "@vitejs/plugin-react-refresh"
import tsconfigPaths from "vite-tsconfig-paths"
import vitePluginReactImp from "vite-plugin-imp"

export default defineConfig({
  plugins: [
    reactRefresh(),

    tsconfigPaths(),

    vitePluginReactImp({
      libList: [
        {
          libName: "antd",
          style: name => `antd/es/${name}/style/css.js`,
        },
      ],
    }),
  ],

  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },

  base: "/qb-admin",

  resolve: {
    alias: {},
  },

  server: {
    open: true,
    port: 996,
  },

  build: {
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
})
