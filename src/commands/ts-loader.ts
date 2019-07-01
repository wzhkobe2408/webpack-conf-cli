import { Command, flags } from '@oclif/command';
import { stringify } from 'javascript-stringify';
import * as merge from 'webpack-merge';
import * as fs from 'fs';
import * as path from 'path';
import { validateFileName } from '../utils';

export default class TSLoader extends Command {
  static description = 'Config ts(x) file loader';

  static examples = [`$ wpconf ts-loader`];

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
    const { args, flags } = this.parse(TSLoader);
    const filename = path.join(
      process.cwd(),
      args.filename || 'webpack.config.js',
    );

    if (
      !validateFileName(filename) ||
      !fs.existsSync(filename)
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
        ],
      },
    });

    const wholeStrForFile = fs.readFileSync(filename).toString();

    const strForNewFile =
      wholeStrForFile.split(/module\.exports\s*=\s*/)[0] +
      `module.exports = ${stringify(newWebpackConfig, null, 2, {})}`;

    fs.writeFile(filename, strForNewFile, err => {
      if (err) {
        return this.error(`Error happened when change config`);
      }
      this.log(`Successfully add ts loader`);
    });
  }
}
