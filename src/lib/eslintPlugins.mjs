/*/**
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
      recommended: 'error',
    },
    hasSuggestions: true,
    schema: [], // No options needed anymore since we're using suggestions
    messages: {
      '@moonshine/cn-invalid-params':
        'Last parameter of cn function must be named "className" and be a string type, or be false',
    },
  },

  /** @param {import('eslint').Rule.RuleContext} context */
  create(context) {
    return {
      /** @param {CallExpression} node */
      CallExpression(node) {
        if (node.callee.type === 'Identifier' && node.callee.name === 'cn') {
          const args = node.arguments

          // Check if last argument is valid
          const lastArg = args[args.length - 1]

          let isValidLastArg = false
          if (lastArg !== undefined) {
            isValidLastArg = true
          }

          if (lastArg.type === 'Literal' && lastArg.value === false) {
            isValidLastArg = true
          }

          if (lastArg.type === 'Identifier' && lastArg.name === 'className') {
            isValidLastArg = true
          }

          if (!isValidLastArg) {
            context.report({
              node,
              messageId: '@moonshine/cn-invalid-params',
            })
          }
        }
      },
    }
  },
}

export default rule
