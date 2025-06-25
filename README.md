# 🥃 Moonshine 🥃

[![NPM](https://img.shields.io/badge/npm-moonshine@latest-blue)](https://www.npmjs.com/package/@speakeasy-api/moonshine)

Speakeasy's design system.

## Installing the NPM package

```bash
pnpm add @speakeasy-api/moonshine
```

Reference the CSS file in your project:

```ts
import '@speakeasy-api/moonshine/moonshine.css'
```

Wrap your application in the `MoonshineConfigProvider` component, passing in the HTML element where the tailwind dark/light class is applied:

```tsx
import { MoonshineConfigProvider } from '@speakeasy-api/moonshine'

<MoonshineConfigProvider themeElement={document.documentElement}>
  <App />
</MoonshineConfigProvider>
```

Then you can import components from the package:

```tsx
import { Grid } from '@speakeasy-api/moonshine'
```

The package is built with [vite](https://vitejs.dev/), and is distributed in both [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) and [CommonJS](https://nodejs.org/api/modules.html#modules-commonjs) formats.

## Design System Architecture

Moonshine is a utility-first design system built on top of [Tailwind CSS v4](https://tailwindcss.com/). It provides a curated set of design tokens and utilities that enforce consistency while preventing common pitfalls.

### CSS Architecture

Our CSS is organized into three main files:

1. **`base.css`** - Primitive design tokens (colors, fonts, spacing scales)
   - Contains raw values that should **not** be used directly in components
   - Defines theme-aware semantic tokens that adapt to light/dark mode
   - Houses base element styles and resets

2. **`utilities.css`** - The public API of our design system
   - Exposes carefully crafted utility classes like `text-heading-xl`, `bg-surface-primary`
   - Enforces typography combinations to prevent arbitrary text styling
   - Provides semantic color utilities that automatically handle theming

3. **`global.css`** - Orchestration and configuration
   - Imports Tailwind and configures plugins
   - Defines custom variants (dark mode, interaction states)
   - Sets up responsive utility generation

### Design Principles

- **Constrained, not restrictive**: We provide a curated set of utilities that make the right thing easy
- **Semantic, not arbitrary**: Use `text-heading-lg` not `text-[29px] leading-[1.5]`
- **Theme-aware by default**: Colors and styles automatically adapt to light/dark mode
- **Type-safe when possible**: Utilities are designed to work with TypeScript autocomplete

### Usage Guidelines

✅ **Do:**
- Use semantic utilities: `bg-warning`, `text-body`, `border-error`
- Leverage pre-defined typography scales: `text-heading-xl`, `text-body-sm`
- Stick to the exposed utility classes in `utilities.css`

❌ **Don't:**
- Access raw color values: `bg-[var(--color-neutral-200)]`
- Create arbitrary combinations: `text-[1.813rem] leading-[1.5]`
- Override the design system without discussing with the team

For more technical details about the CSS architecture, see [CLAUDE.md](./CLAUDE.md).

## Contributing

### Setup

1. Clone the repository
2. Run `pnpm install` to install the dependencies
3. Run `pnpm build` to build the package
4. Run `pnpm storybook` to start the storybook server

If you'd like to develop Moonshine in tandem with another app, you can follow the steps outlined below in the **Linking the library locally** section.

### Guidelines

- We're using [Storybook](https://storybook.js.org/) to develop the components.
- Components should be added to the `src/components` directory.
- Each component should have its own directory. e.g `src/components/Box`, `src/components/Button` etc.
- Each component should have a corresponding Storybook story file located at `src/components/{Your Component}/index.stories.tsx`, with several stories for different use cases.
- Shadcn components **should not** be exported directly from `src/index.ts`.

### Workflow

We use [Semantic Release](https://semantic-release.gitbook.io/semantic-release/) to handle versioning and changelog generation.

The release workflow is as follows:

1. Create a new branch for your changes
2. Make your changes
3. Add a commit with the conventional changelog message format (e.g `feat(component-name): what the commit does`)
4. Push your changes to GitHub
5. Merge the PR into the `main` branch
6. A new version is released to NPM

#### Conventional changelog reference

Only certain commit types will trigger a release (noted below in **bold**).

- **`feat`:** A new feature (triggers a minor release)
- **`fix`:** A bug fix (triggers a patch release)
- **`perf`:** A code change that improves performance (triggers a patch release)
- `refactor`: A code change that neither fixes a bug nor adds a feature (no release)
- `docs`: Documentation only changes (no release)
- `style`: Changes that do not affect the meaning of the code (no release)
- `test`: Adding missing tests (no release)
- `ci`: Changes to CI configuration files and scripts (no release)
- `build`: Changes that affect the build system or external dependencies (no release)
- `chore`: Other changes that don't modify src or test files (no release)

##### Breaking changes

If a PR is a breaking change for consumers, then the commit message should use a bang (`!`) to signify a breaking change, which will trigger a major release:

```
feat(component-name)!: breaking change description
fix(component-name)!: breaking change description
```

### Testing

We're using [Vitest](https://vitest.dev/) and [@testing-library/react](https://testing-library.com/react/) for testing components when necessary.

Run `pnpm test` to run the tests.

### Linking the library locally

Run `pnpm build:watch` within Moonshine to build the library and watch for changes.

Then run `pnpm link ../path/to/moonshine` within the app that will use the library. For the registry `webapp` directory (assuming a standard cloning setup where `moonshine` is a sibling of the registry repo), it would be:

```bash
pnpm link ../path/to/moonshine
```

The lockfile file within your app should referenced the linked copy:

```yaml
'@speakeasy-api/moonshine':
  specifier: ^0.43.1
  version: link:../../../../moonshine
```
