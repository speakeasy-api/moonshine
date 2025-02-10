import { parse } from '@babel/parser'
import _traverse from '@babel/traverse'
import _generate from '@babel/generator'
import * as t from '@babel/types'

const traverse = _traverse.default
const generate = _generate.default

/**
 * A Vite plugin that automatically prefixes className values in JSX/TSX files with '_moonshine '
 *
 * This plugin processes JSX/TSX files and modifies className attributes in three cases:
 * 1. Static string literals: className="value"
 * 2. String literals in expressions: className={"value"}
 * 3. Dynamic expressions: className={dynamicValue}
 *
 * For dynamic expressions, it wraps the value in an IIFE that applies the prefix at runtime
 * if it's not already present.
 *
 * @returns {import('vite').Plugin} A Vite plugin configuration object
 *
 * @example
 * ```js
 * // vite.config.js
 * import moonshinePrefix from './moonshinePrefix'
 *
 * export default {
 *   plugins: [moonshinePrefix()]
 * }
 * ```
 */
export default function moonshinePrefix() {
  return {
    name: 'vite-plugin-moonshine',
    enforce: 'pre',
    transform(code, id) {
      // Process only JavaScript/TypeScript files that might contain JSX.
      if (!/\.[jt]sx?$/.test(id)) return null

      // Set up Babel parser plugins.
      const plugins = ['jsx']
      if (/\.(ts|tsx)$/.test(id)) {
        plugins.push('typescript')
      }

      // Parse the code into an AST.
      let ast
      try {
        ast = parse(code, {
          sourceType: 'module',
          plugins,
        })
      } catch (error) {
        this.error(`Error parsing ${id}: ${error}`)
      }

      // Define the prefix to add.
      const prefix = '_moonshine '

      // Traverse the AST to find JSXAttributes named "className".
      traverse(ast, {
        JSXAttribute(path) {
          if (path.node.name.name !== 'className') return

          const valueNode = path.node.value
          if (!valueNode) return

          // String literals - <div className="bg-background" />
          if (valueNode.type === 'StringLiteral') {
            valueNode.value = addPrefixToString(valueNode.value, prefix)
          }
          // Expression Containers - <div className={"bg-background"} />
          else if (
            valueNode.type === 'JSXExpressionContainer' &&
            valueNode.expression &&
            valueNode.expression.type === 'StringLiteral'
          ) {
            valueNode.expression.value = addPrefixToString(
              valueNode.expression.value,
              prefix
            )
          }
          // Dynamic Values - <div className={cn(...)} />
          else if (
            valueNode.type === 'JSXExpressionContainer' &&
            valueNode.expression
          ) {
            // Wrap the dynamic expression in an IIFE that applies the prefix at runtime.
            valueNode.expression = wrapDynamicExpression(
              valueNode.expression,
              prefix,
              path.scope
            )
          }
        },
      })

      // Generate the modified code from the AST.
      const output = generate(ast, {}, code)
      return {
        code: output.code,
        map: output.map,
      }
    },
  }
}

/**
 * Prepends a prefix to a string value if it doesn't already start with the prefix
 *
 * @param {string} value - The string value to potentially prefix
 * @param {string} prefix - The prefix to prepend
 * @returns {string} The string with the prefix prepended if necessary
 */
function addPrefixToString(value, prefix) {
  return value.startsWith(prefix) ? value : prefix + value
}

/**
 * Wraps a dynamic className expression in an IIFE that handles prefix application at runtime
 *
 * @param {import('@babel/types').Expression} originalExpr - The original expression node from the AST
 * @param {string} prefix - The prefix to prepend to the className
 * @param {import('@babel/traverse').Scope} scope - The current scope from Babel's traverse
 * @returns {import('@babel/types').CallExpression} An IIFE that evaluates the expression and applies the prefix
 *
 * @example
 * // Input: <div className={isDark ? 'bg-dark' : 'bg-light'} />
 * // Output: <div className={(() => {
 * //   const _temp = isDark ? 'bg-dark' : 'bg-light';
 * //   return typeof _temp === 'string' && _temp.startsWith('_moonshine ')
 * //     ? _temp
 * //     : '_moonshine ' + _temp;
 * // })()} />
 */
function wrapDynamicExpression(originalExpr, prefix, scope) {
  const tempId = scope.generateUidIdentifier('classNameValue')

  const arrowFunction = t.arrowFunctionExpression(
    [],
    t.blockStatement([
      t.variableDeclaration('const', [
        t.variableDeclarator(tempId, originalExpr),
      ]),
      t.returnStatement(
        t.conditionalExpression(
          t.logicalExpression(
            '&&',
            t.binaryExpression(
              '===',
              t.unaryExpression('typeof', tempId, true),
              t.stringLiteral('string')
            ),
            t.callExpression(
              t.memberExpression(tempId, t.identifier('startsWith')),
              [t.stringLiteral(prefix)]
            )
          ),
          tempId,
          t.binaryExpression('+', t.stringLiteral(prefix), tempId)
        )
      ),
    ])
  )

  return t.callExpression(arrowFunction, [])
}
