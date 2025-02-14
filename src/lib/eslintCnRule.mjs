/** @type {import('eslint').Rule.RuleModule} */
const rule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce last parameter of cn function to be className string or false',
    },
    hasSuggestions: true,
    schema: [], // No options needed anymore since we're using suggestions
    messages: {
      '@moonshine/cn-invalid-params':
        'Last parameter of cn function must be named "className" and be a string type, or be false',
    },
  },

  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.type === 'Identifier' && node.callee.name === 'cn') {
          const args = node.arguments

          // Check if last argument is valid
          const lastArg = args[args.length - 1]

          let isValidLastArg = false

          if (!lastArg) {
            isValidLastArg = true
          } else if (
            lastArg.type === 'Literal' &&
            typeof lastArg.value === 'boolean' &&
            lastArg.value === false
          ) {
            isValidLastArg = true
          } else if (
            lastArg.type === 'Identifier' &&
            lastArg.name === 'className'
          ) {
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
