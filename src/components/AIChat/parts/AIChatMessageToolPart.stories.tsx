import type { Meta, StoryObj } from '@storybook/react-vite'
import { AIChatMessageToolPart } from './AIChatMessageToolPart'

const meta: Meta<typeof AIChatMessageToolPart> = {
  title: 'AI Chat/Parts/Tool Part',
  component: AIChatMessageToolPart,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof AIChatMessageToolPart>

export const PreparingSearch: Story = {
  args: {
    toolInvocation: {
      state: 'partial-call',
      toolCallId: '1',
      toolName: 'codebase_search',
      args: {
        query: 'How does authentication work in this codebase?',
        target_directories: ['src/auth'],
      },
    },
  },
}

export const RunningSearch: Story = {
  args: {
    toolInvocation: {
      state: 'call',
      toolCallId: '1',
      toolName: 'codebase_search',
      args: {
        query: 'How does authentication work in this codebase?',
        target_directories: ['src/auth'],
      },
    },
  },
}

export const CompletedSearch: Story = {
  args: {
    toolInvocation: {
      state: 'result',
      toolCallId: '1',
      toolName: 'codebase_search',
      args: {
        query: 'How does authentication work in this codebase?',
        target_directories: ['src/auth'],
      },
      result: [
        {
          file: 'src/auth/AuthProvider.ts',
          line: 42,
          content: 'export function useAuth() { ... }',
          score: 0.92,
        },
        {
          file: 'src/auth/hooks/useAuth.ts',
          line: 15,
          content: 'const auth = getAuth(app)',
          score: 0.85,
        },
      ],
    },
    onAccept: () => alert('Search result accepted'),
    onReject: () => alert('Search result rejected'),
  },
}

export const FileEdit: Story = {
  args: {
    toolInvocation: {
      state: 'result',
      toolCallId: '2',
      toolName: 'edit_file',
      args: {
        target_file: 'src/components/Button.tsx',
        instructions: 'Add hover state styles to the button component',
        code_edit: `// ... existing code ...
const variants = {
  primary: 'bg-blue-500 hover:bg-blue-600',
  secondary: 'bg-gray-500 hover:bg-gray-600',
}
// ... existing code ...`,
      },
      result: 'Successfully updated Button.tsx with hover states',
    },
    onAccept: () => alert('File edit accepted'),
    onReject: () => alert('File edit rejected'),
  },
}

export const LongResult: Story = {
  args: {
    toolInvocation: {
      state: 'result',
      toolCallId: '3',
      toolName: 'grep_search',
      args: {
        query: 'export.*function',
        include_pattern: '*.ts',
      },
      result: Array(20)
        .fill(0)
        .map(
          (_, i) =>
            `src/components/Component${i}.ts:${i + 1}: export function doSomething${i}() { ... }`
        )
        .join('\n'),
    },
    onAccept: () => alert('Grep result accepted'),
    onReject: () => alert('Grep result rejected'),
  },
}

export const WithError: Story = {
  args: {
    toolInvocation: {
      state: 'result',
      toolCallId: '4',
      toolName: 'run_terminal_cmd',
      args: {
        command: 'npm run build',
      },
      result: new Error('Build failed: Type errors found'),
    },
    onAccept: () => alert('Error result accepted'),
    onReject: () => alert('Error result rejected'),
  },
}

export const VeryLongJsonValue: Story = {
  args: {
    toolInvocation: {
      state: 'result',
      toolCallId: '5',
      toolName: 'dub_getLinks',
      args: {
        url: 'https://www.typescriptlang.org/play/?noUncheckedIndexedAccess=true&noUnusedLocals=true&noUnusedParameters=true&target=esnext&jsx=react&module=esnext&strict=true&alwaysStrict=true&noImplicitOverride=true&noPropertyAccessFromIndexSignature=true&useDefineForClassFields=true&exactOptionalPropertyTypes=true&noFallthroughCasesInSwitch=true&noImplicitReturns=true&noImplicitAny=true&noImplicitThis=true&strictBindCallApply=true&strictNullChecks=true&strictFunctionTypes=true&downlevelIteration=true&esModuleInterop=true&forceConsistentCasingInFileNames=true',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'.repeat(
            3
          ),
      },
      result: {
        id: 'Link_KNb4KkZcZkzWb7EqCmE7MDH',
        domain: 'dub.sh',
        url: 'https://www.typescriptlang.org/play/?noUncheckedIndexedAccess=true&noUnusedLocals=true&noUnusedParameters=true&target=esnext&jsx=react&module=esnext&strict=true&alwaysStrict=true&noImplicitOverride=true&noPropertyAccessFromIndexSignature=true&useDefineForClassFields=true&exactOptionalPropertyTypes=true&noFallthroughCasesInSwitch=true&noImplicitReturns=true&noImplicitAny=true&noImplicitThis=true&strictBindCallApply=true&strictNullChecks=true&strictFunctionTypes=true&downlevelIteration=true&esModuleInterop=true&forceConsistentCasingInFileNames=true',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'.repeat(
            3
          ),
      },
    },
    onAccept: () => alert('Very long JSON value accepted'),
    onReject: () => alert('Very long JSON value rejected'),
  },
}
