/**
 * 生成单个html webpack plugin config
 */

import * as HtmlWebpackPlugin from 'html-webpack-plugin';

const genSingleHtmlWebpackPluginConfig = ({
    filename,
    template,
    chunks,
}: HtmlWebpackPlugin.Options) => `new HtmlWebpackPlugin({
    filename: ${filename},
    template: ${template},
    chunks: ['vendor', ...${chunks}],
})
`

const genMultiHtmlWebpackPluginConfig = (htmls: HtmlWebpackPlugin.Options[]) => {
    const configArr = htmls.map(({ filename, template, chunks }: HtmlWebpackPlugin.Options) =>
        `new HtmlWebpackPlugin({
            filename: ${filename},
            template: ${template},
            chunks: ['vendor', ...${chunks}],
        })`
    )

    return configArr.join('');
}

export default {
    genSingleHtmlWebpackPluginConfig,
    genMultiHtmlWebpackPluginConfig,
}