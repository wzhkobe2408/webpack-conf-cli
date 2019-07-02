const baseWebpackConfigSourceCode = `
"use strict";
const path = require('path');
module.exports = {
    entry: {
        index: [
            './src/index.ts',
        ]
    },
    output: {
        filename: '[name].[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    mode: 'development',
    devtool: 'none',
    devServer: {},
    module: {
        rules: []
    },
    resolve: {},
    optimization: {},
    plugins: []
};
`;

export default baseWebpackConfigSourceCode;
