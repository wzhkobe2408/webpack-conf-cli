const JSLoaderConfig = `
{
    test: /\.js?$/,
    loader: 'babel-loader',
}
`

const TSLoaderConfig = `
{
    test: /\.(tsx|ts)?$/,
    use: [
        {
            loader: 'babel-loader',
        },
        {
            loader: 'ts-loader',
        },
    ],
},
`

const LessLoaderConfig = `
{
    test: /\.(css|less)$/,
    use: [
        {
            loader: MiniCssExtractPlugin.loader,
        },
        {
            loader: 'css-loader',
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: [
                    autoprefixer({
                        browsers: ['Android >= 4.3', 'iOS >= 8'],
                    }),
                ],
            },
        },
        {
            loader: 'less-loader',
            options: {
                javascriptEnabled: true,
                strictMath: true,
            },
        },
    ],
},
`

const ImageLoaderConfig = `
{
    test: /\.(png|jpg|gif)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
  },
`

export default {
    JSLoaderConfig,
    TSLoaderConfig,
    LessLoaderConfig,
    ImageLoaderConfig,
}