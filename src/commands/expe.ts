import { Command, flags } from '@oclif/command';

import * as Utils from '../utils';
import baseWebpackConfig from '../template/baseWebpackConfig';



export default class ImageLoader extends Command {
  static description = 'Config image loader';

  static examples = [`$ wpconf image-loader`];

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
    Utils.processConfig(baseWebpackConfig)
  }
}
