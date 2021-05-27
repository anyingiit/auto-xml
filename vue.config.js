module.exports = {
  configureWebpack: {
    devtool: 'source-map',
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      // chainWebpackMainProcess: (config) => {
      // },
      // chainWebpackRendererProcess: (config) => {
      // }
    }
  }
}
