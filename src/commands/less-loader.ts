import { Command, flags } from '@oclif/command';
import { stringify } from 'javascript-stringify';
import * as merge from 'webpack-merge';
import * as fs from 'fs';
import * as path from 'path';
import { validateFileName } from '../utils';

export default class LessLoader extends Command {
  static description = 'Config less file loader';

  static examples = [`$ wpconf less-loader`];

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
    const { args, flags } = this.parse(LessLoader);
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
            test: /\.(css|less)$/,
            use: [
              {
                loader: 'css-loader',
              },
              {
                loader: 'postcss-loader',
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
      this.log(`Successfully add less loader`);
    });
  }
}
