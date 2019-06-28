/**
 * 初始化webpack config
 */

import { Command, flags } from '@oclif/command';
import * as fs from 'fs';
import * as path from 'path';

export default class Init extends Command {
  static description = 'Init webpack config with simple configuration';

  /**
   * Webpack 模版列表
   */
  static template = {
    multi: 'webpack.multi.config.js',
    single: 'webpack.single.config.js',
  };

  static examples = [`$ wpconf init --multi`];

  static flags = {
    help: flags.help({ char: 'h' }),
    /**
     * --multi -m 代表多入口webpack配置
     */
    multi: flags.boolean({ char: 'm' }),
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
    const { args, flags } = this.parse(Init);
    const filename = args.filename || 'webpack.config.js';
    const isMultiEntry = flags.multi;

    const templateConfigFile = isMultiEntry
      ? Init.template.multi
      : Init.template.single;

    if (!this.validateFileName(filename)) {
      return this.error(`Invalid webpack config filename`);
    }

    fs.readFile(
      path.join(__dirname, '../template', templateConfigFile),
      {
        encoding: 'utf8',
      },
      (err, data) => {
        if (err) {
          return this.error(`Error happened when loading template`);
        }
        fs.writeFile(path.join(process.cwd(), filename), data, err => {
          if (err) {
            return this.error(`Error happened when create config file`);
          }
          this.log(`Successfully create webpack config`);
        });
      },
    );
  }
}
