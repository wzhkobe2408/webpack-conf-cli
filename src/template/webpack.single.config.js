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
    }
}