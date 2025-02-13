/**
 * @typedef {import('eslint').Rule.RuleModule} RuleModule
 * @typedef {import('estree').Node} Node
 * @typedef {import('estree').CallExpression} CallExpression
 * @typedef {import('estree').Identifier} Identifier
 * @typedef {import('estree').Literal} Literal
 * @typedef {import('estree').TemplateLiteral} TemplateLiteral
 */

/** @type {RuleModule} */
const rule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce last parameter of cn function to be className string or false',
    },
    fixable: 'code',
    schema: [], // no options
    messages: {
      '@moonshine/invalid-cn-usage':
        'Last parameter of the cn function must be named "className" and be a string type, or be false',
    },
  },

  create(context) {
    return {
      /**
       * @param {CallExpression} node
       */
      CallExpression(node) {
        // Check if the called function is named 'cn'
        if (node.callee.type === 'Identifier' && node.callee.name === 'cn') {
          const args = node.arguments

          // If there are no arguments, that's a problem
          if (args.length === 0) {
            context.report({
              node,
              messageId: '@moonshine/invalid-cn-usage',
            })
            return
          }

          const lastArg = args[args.length - 1]

          // Check if last argument is the boolean literal 'false'
          if (lastArg.type === 'Literal' && lastArg.value === false) {
            return // This is valid
          }

          // Check if it's an identifier named 'className'
          if (lastArg.type === 'Identifier' && lastArg.name === 'className') {
            return // This is valid
          }

          // If it's a string literal, that's also fine
          if (lastArg.type === 'Literal' && typeof lastArg.value === 'string') {
            return // This is valid
          }

          // Template literals are also acceptable
          if (lastArg.type === 'TemplateLiteral') {
            return // This is valid
          }

          // If we get here, the last parameter is invalid
          context.report({
            node,
            messageId: '@moonshine/invalid-cn-usage',
          })
        }
      },
    }
  },
}

export default rule
