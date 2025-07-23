import { expect, within } from '@storybook/test'
import { userEvent } from '@storybook/test'
import { CodeSnippet } from '.'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { InnerLine } from 'codehike/code'

const meta: Meta<typeof CodeSnippet> = {
  component: CodeSnippet,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    chromatic: {
      delay: 1000,
    },
  },
}

export default meta

type Story = StoryObj<typeof CodeSnippet>

export const Default: Story = {
  args: {
    code: 'console.log("Hello, world!")',
    language: 'javascript',
    copyable: true,
  },
}

export const Python: Story = {
  args: {
    code: 'print("Hello, world!")',
    language: 'python',
    copyable: true,
  },
}

export const TypescriptMultiline: Story = {
  args: {
    code: `type User = {
  name: string
  age: number
}`,
    language: 'typescript',
    copyable: true,
  },
}

export const TypescriptFunctionMultiline: Story = {
  args: {
    code: `function greet(name: string) {
  return \`Hello, \${name}!\`
}`,
    language: 'typescript',
    copyable: true,
  },
}

export const Javascript: Story = {
  args: {
    code: 'console.log("Hello, world!")',
    language: 'javascript',
    copyable: true,
  },
}

export const Bash: Story = {
  args: {
    code: 'echo "Hello, world!"',
    language: 'bash',
    copyable: true,
  },
}

export const BashWithCustomPromptSymbol: Story = {
  args: {
    code: 'echo "Hello, world!"',
    language: 'bash',
    copyable: true,
    promptSymbol: '>',
  },
}

export const Java: Story = {
  args: {
    code: 'System.out.println("Hello, world!");',
    language: 'java',
    copyable: true,
  },
}

export const Dotnet: Story = {
  args: {
    code: 'Console.WriteLine("Hello, world!");',
    language: 'dotnet',
    copyable: true,
  },
}

export const Go: Story = {
  args: {
    code: 'fmt.Println("Hello, world!")',
    language: 'go',
    copyable: true,
  },
}

export const Json: Story = {
  args: {
    code: `{
  "name": "John",
  "age": 30
}`,
    language: 'json',
    copyable: true,
  },
}

export const UnsupportedLanguage: Story = {
  args: {
    code: 'console.log("Hello, world!")',
    language: 'unsupported',
    copyable: true,
  },
}

/**
 * Codehike supports many languages that Speakeasy does not.
 */
export const SemiSupportedLanguage: Story = {
  args: {
    code: `FROM node:20

WORKDIR /app

COPY package.json .

RUN npm install
`,
    language: 'dockerfile',
  },
}

export const NonCopyable: Story = {
  args: {
    code: 'console.log("Hello, world!")',
    language: 'javascript',
    copyable: false,
  },
}

export const FontSizeXL: Story = {
  args: {
    code: 'console.log("Hello, world!")',
    language: 'javascript',
    copyable: true,
    fontSize: 'xl',
  },
}

export const FontSize2XL: Story = {
  args: {
    code: 'console.log("Hello, world!")',
    language: 'javascript',
    copyable: true,
    fontSize: '2xl',
  },
}

export const Interactive: Story = {
  args: {
    code: 'console.log("Hello, world!")',
    language: 'javascript',
    copyable: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const codeSnippet = await canvas.findByRole('button', { name: /copy/i })
    await userEvent.click(codeSnippet)
    expect(navigator.clipboard.readText()).resolves.toBe(
      'console.log("Hello, world!")'
    )
  },
}

export const WithOnSelectOrCopy: Story = {
  args: {
    code: 'console.log("Hello, world!")',
    language: 'javascript',
    copyable: true,
    onSelectOrCopy: fn(),
  },
}

export const Shimmer: Story = {
  args: {
    code: 'console.log("Hello, world!")',
    language: 'javascript',
    copyable: true,
    shimmer: true,
  },
}

export const ShowLineNumbers: Story = {
  args: {
    code: `console.log("Hello, world!")
console.log("Hello, world!")
console.log("Hello, world!")
console.log("Hello, world!")
console.log("Hello, world!")
console.log("Hello, world!")`,
    language: 'javascript',
    showLineNumbers: true,
  },
}

export const CustomHandler: Story = {
  args: {
    code: `function greet(name) {
  // Say hello to the user
  console.log("Hello, " + name);
  return true;
}`,
    language: 'javascript',
    copyable: true,
    showLineNumbers: true,
    customHandlers: [
      {
        // Always give your handler a descriptive name for debugging
        name: 'simple-line-highlight',

        /**
         * Custom Line component that highlights line 3 with a background color
         *
         * The Line handler receives these important props:
         * - lineNumber: The 1-based line number
         * - children: The content of the line
         * - indentation: The number of spaces for indentation
         */
        Line: (props) => {
          // Check if this is the line to highlight (line 3)
          if (props.lineNumber === 3) {
            return (
              <div
                style={{
                  backgroundColor: 'rgba(255, 230, 180, 0.3)',
                  borderRadius: '4px',
                  padding: '2px 0',
                }}
              >
                {/* InnerLine with merge is critical for proper handler composition */}
                <InnerLine merge={props} />
              </div>
            )
          }

          // For other lines, just use InnerLine with all props
          return <InnerLine merge={props} />
        },
      },
    ],
  },
}

export const WithAnnotations: Story = {
  args: {
    code: `function greet(name) {
      // Say hello to the user
      console.log("Hello, " + name);

      # !callout
      # This is a callout
      console.log("Hello, " + name);
    }`,
    language: 'javascript',
    copyable: true,
    showLineNumbers: true,
  },
}
