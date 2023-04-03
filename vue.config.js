module.exports = {
  publicPath:"./",
    // 关闭eslint
    devServer: {
      overlay: {
        warnings:false,
        errors:false,
      },
      disableHostCheck:true
    },
    lintOnSave:false,
    productionSourceMap:false
  }
