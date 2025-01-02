/** @format */

const path = require('path')
const SizePlugin = require('size-plugin')

const isProductionEnvFlag = process.env.NODE_ENV === 'production'

function resolveRealPath(dir) {
  return path.join(__dirname, dir)
}

// https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/config.md
module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  publicPath: '/',

  // where to output built files
  outputDir: 'dist',

  // whether to use eslint-loader for lint on save.
  // valid values: true | false | 'error'
  // when set to 'error', lint errors will cause compilation to fail.
  lintOnSave: false,

  // https://cli.vuejs.org/config/#runtimecompiler
  runtimeCompiler: false,

  // babel-loader skips `node_modules` deps by default.
  // explicitly transpile a dependency with this option.
  transpileDependencies: [
    /* string or regex */
  ],

  // generate sourceMap for production build?
  productionSourceMap: false,

  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: (config) => {
    // 设置别名
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@helper', resolveRealPath('src/helper'))
      .set('@config', resolveRealPath('src/config'))
      .set('@pages', resolveRealPath('src/pages'))
      .set('@assets', resolveRealPath('src/assets'))
      .set('@router', resolveRealPath('src/router'))
      .set('@mixins', resolveRealPath('src/mixins'))
      .set('@components', resolveRealPath('src/components'))

    // 清除所有已存在的规则
    config.module.rules.clear()

    // 添加新的规则
    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('vue-loader')
      .loader('vue-loader')

    config.module
      .rule('js')
      .test(/\.js$/)
      .use('babel-loader')
      .loader('babel-loader')

    config.module
      .rule('svg')
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        name: '[name]-[hash:7]',
        prefixize: true
      })

    // 优化分块配置
    config.optimization.splitChunks({
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 16,
      maxInitialRequests: 16,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        common: {
          name: `chunk-common`,
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        },
        element: {
          name: 'element',
          test: /[\\/]node_modules[\\/]element-ui[\\/]/,
          chunks: 'initial',
          priority: -30
        }
      }
    })
  },

  configureWebpack: {
    plugins: [isProductionEnvFlag ? new SizePlugin() : () => {}]
  },

  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,

  // options for the PWA plugin.
  // see => https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
  pwa: {
    name: 'Sigmate Markdown - 在线 Markdown 编辑器',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/mstile-150x150.png',
    },
    // configure the workbox plugin (GenerateSW or InjectManifest)
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'public/service-worker.js',
      // ...other Workbox options...
    },
  },

  // configure webpack-dev-server behavior
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
    proxy: null, // string | Object
    before: () => {},
  },

  // options for 3rd party plugins
  pluginOptions: {},
}
