import { Command, flags } from '@oclif/command';
import { exec } from 'child_process';
import * as path from 'path';

export default class RemoveConfig extends Command {
  static description = 'Remove webpack config file';

  static examples = [`$ wpconf rm-config`];

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
    const { args, flags } = this.parse(RemoveConfig);
    const filename = path.join(
      process.cwd(),
      args.filename || 'webpack.config.js',
    );

    exec(`rm ${filename}`)
      .on('close', () => {
        this.log(
          `Successfully remove webpack config file`,
        );
      })
      .on('error', () => {
        this.error(
          `Invalid webpack config filename or file doesn't exist`,
        );
      })

  }
}
