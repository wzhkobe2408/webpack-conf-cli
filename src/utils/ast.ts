import * as esprima from 'esprima';
import * as estraverse from 'estraverse';
import * as escodegen from 'escodegen';
import * as ESTree from 'estree';
import * as fs from 'fs-extra';
import * as path from 'path';

// import * as t from 'babel-types';

// import { namedTypes, builders } from 'ast-types';

const {
  Identifier,
  Literal,
  Property,
  ObjectExpression,
  ArrayExpression,
} = esprima.Syntax;

class WebpackConfigModifier {
  modifyMode(node: ESTree.Node, parentNode: ESTree.Node | null, val: string) {
    if (node.type === Identifier && node.name === 'mode') {
      if (parentNode && parentNode.type === Property) {
        parentNode.value.type === Literal && (parentNode.value.value = val);
      }
    }
  }

  modifyDevTool(
    node: ESTree.Node,
    parentNode: ESTree.Node | null,
    val: string,
  ) {
    if (node.type === Identifier && node.name === 'devtool') {
      if (parentNode && parentNode.type === Property) {
        parentNode.value.type === Literal && (parentNode.value.value = val);
      }
    }
  }

  modifyModuleRules(node: ESTree.Node, parentNode: ESTree.Node | null) {
    if (parentNode)
      if (node.type === ObjectExpression) {
        const targetNode = node.properties.find((property: ESTree.Property) => {
          return (
            property.key.type === Identifier && property.key.name === 'rules'
          );
        });

        if (targetNode && targetNode.value.type === ArrayExpression) {
          console.log(targetNode.value.elements);
          //   targetNode.value.elements.push();
          targetNode.value.elements.push();
        }
      }
  }
}

export function processConfig(webpackConfigSourceCode: string) {
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
      webpackConfigModifier.modifyModuleRules(node, parentNode);
    },
    // leave(node) {}
  });

  /**
   * STEP3: 生成新的code
   */
  const generatedCode = escodegen.generate(ast);

  // console.log('generatedCode', generatedCode);

  fs.writeFileSync(
    path.join(__dirname, '../webpack.config.js'),
    generatedCode,
    {
      encoding: 'utf8',
    },
  );
}
