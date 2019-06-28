module.exports = {
  entry: {
    index: [
      './src/index.ts'
    ]
  },
  output: {
    filename: '[name].[hash:8].js',
    path: '/Users/wangzhonghuan/Desktop/webpack-conf-cli/dist'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(tsx|ts)?$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  }
}