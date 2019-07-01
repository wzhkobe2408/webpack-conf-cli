import * as esprima from 'esprima';
import * as estraverse from 'estraverse';
import * as escodegen from "escodegen";
import * as fs from 'fs-extra';
import * as path from 'path';

class WebpackConfigModifier {
    modifyMode(node: any, parentNode: any, val: string) {
        if (node.name === 'mode') {
            parentNode.value.value = val;
        }
    }

    modifyDevTool(node: any, parentNode: any, val: string) {
        if (node.name === 'devtool') {
            parentNode.value.value = val;
        }
    }

    modifyModuleRules(node: any, parentNode: any) {

    }
}

// `
// entry: {
//     index: [
//         './src/index.ts',
//     ]
// },
// output: {
//     filename: '[name].[hash:8].js',
//     path: path.join(__dirname, 'dist')
// },
// devServer: {},
// module: {
//     rules: []
// },
// resolve: {},
// optimization: {},
// plugins: []
// `


function processConfig(webpackConfigSourceCode: string) {
    const webpackConfigModifier = new WebpackConfigModifier();

    /**
     * STEP1: 解析成ast tree
     */
    let ast = esprima.parseModule(webpackConfigSourceCode);

    /**
     * STEP2: 遍历ast tree
     * 访问者模式
     */
    estraverse.traverse(ast, {
        enter(node, parentNode) {
            webpackConfigModifier.modifyMode(node, parentNode, 'production');
            webpackConfigModifier.modifyDevTool(node, parentNode, 'source-map');
        },
        // leave(node) {}
    });

    /**
     * STEP3: 生成新的code
     */
    const generatedCode = escodegen.generate(ast);

    console.log('generatedCode', generatedCode);


    fs.writeFileSync(path.join(__dirname, '../webpack.config.js'), generatedCode, {
        encoding: 'utf8',
    });
}
