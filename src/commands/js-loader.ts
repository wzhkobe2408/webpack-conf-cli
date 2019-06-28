import { Command, flags } from '@oclif/command';
import * as Config from 'webpack-chain';
import * as merge from 'webpack-merge';
import * as fs from 'fs';
import * as path from 'path';

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

  validateFileName(filename: string) {
    return (
      filename.includes('.js') &&
      filename.includes('config') &&
      filename.includes('webpack')
    );
  }

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
      !this.validateFileName(filename) &&
      fs.existsSync(path.join(process.cwd(), filename))
    ) {
      return this.error(
        `Invalid webpack config filename or file doesn't exist`,
      );
    }

    const currWebpackConfig = require(filename);

    const config = new Config();

    config.module
      .rule('compile')
      .test(new RegExp(/\.js?$/).source)
      .exclude.add('node_modules')
      .end()
      .use('babel')
      .loader('babel-loader');

    const newWebpackConfig = merge(currWebpackConfig, config.toConfig());

    fs.writeFile(
      filename,
      `module.exports = ${JSON.stringify(newWebpackConfig, null, 2)}`,
      err => {
        if (err) {
          return this.error(`Error happened when change config`);
        }
        this.log(`Successfully add js loader`);
      },
    );
  }
}
