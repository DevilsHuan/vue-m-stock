module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-pxtorem":{
      rootValue: 75, // 1rem=75px
      propWhiteList: [],
      selectorBlackList:['html']
    }
  }
}
