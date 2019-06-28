import { Command, flags } from '@oclif/command';
import { stringify } from 'javascript-stringify';
import * as merge from 'webpack-merge';
import * as fs from 'fs';
import * as path from 'path';
import { validateFileName } from '../utils';

export default class JSLoader extends Command {
  static description = 'Config js file loader';

  static examples = [`$ wpconf js-loader`];

  static flags = {
    help: flags.help({ char: 'h' }),
  };

  static args = [
    /**
     * webpack 配置所在文件
     */
    {
      name: 'filename',
    },
  ];

  /**
   * 执行函数
   */
  async run() {
    // 解析参数
    const { args, flags } = this.parse(JSLoader);
    const filename = path.join(
      process.cwd(),
      args.filename || 'webpack.config.js',
    );

    if (
      !validateFileName(filename) &&
      fs.existsSync(path.join(process.cwd(), filename))
    ) {
      return this.error(
        `Invalid webpack config filename or file doesn't exist`,
      );
    }

    const currWebpackConfig = require(filename);

    const newWebpackConfig = merge(currWebpackConfig, {
      module: {
        rules: [
          {
            test: /\.js?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
        ],
      },
    });

    fs.writeFile(
      filename,
      `module.exports = ${stringify(newWebpackConfig, null, 2, {})}`,
      err => {
        if (err) {
          return this.error(`Error happened when change config`);
        }
        this.log(`Successfully add js loader`);
      },
    );
  }
}
