const path = require('path');

module.exports = {
    entry: {
        index: {},
        about: {}
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash:8].js'
    }
}