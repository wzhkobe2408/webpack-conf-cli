module.exports = {
  output: {
    path: '/Users/wangzhonghuan/Desktop/webpack-conf-cli/dist',
    filename: '[name].[hash:8].js'
  },
  module: {
    rules: [
      /* config.module.rule('compile') */
      {
        test: /\.js?$/,
        exclude: [
          'node_modules'
        ],
        use: [
          /* config.module.rule('compile').use('babel') */
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  entry: {
    index: [
      {}
    ],
    about: [
      {}
    ]
  }
}