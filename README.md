# 🥃 Moonshine 🥃

Speakeasy's design system.

## Installing the NPM package

The NPM package is published to GitHub Packages rather than the public NPM registry.

First add a new `.npmrc` file to your project with the following:

```
@speakeasy-api:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken={YOUR_PERSONAL_TOKEN}
```

You should generate your personal access token [here](https://github.com/settings/tokens). It should have the `repo` and `read:packages` scopes at a minimum.

Then install the package:

```bash
pnpm add @speakeasy-api/moonshine
```

Reference the CSS file in your project:

```ts
import "@speakeasy-api/moonshine/moonshine.css";
```

Then you can import components from the package:

```tsx
import { Grid } from "@speakeasy-api/moonshine";
```

The package is built with [vite](https://vitejs.dev/), and is distributed in both [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) and [CommonJS](https://nodejs.org/api/modules.html#modules-commonjs) formats.

## Contributing

### Setup

1. Clone the repository
2. Run `pnpm install` to install the dependencies
3. Run `pnpm build` to build the package
4. Run `pnpm storybook` to start the storybook server

### Guidelines

- We're using [Storybook](https://storybook.js.org/) to develop the components.
- Components should be added to the `src/components` directory.
- Each component should have its own directory. e.g `src/components/Box`, `src/components/Button` etc.
- Each component should have a corresponding Storybook story file located at `src/components/{Your Component}/index.stories.tsx`, with several stories for different use cases.

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

### Packing the library locally

If you want to test that the library is being packaged correctly and can be used from a client app, run `pnpm pack` to pack the library into a tarball.

Then install the package from the tarball in another application:

```bash
pnpm install ../moonshine/speakeasy-api-moonshine-0.0.1.tgz 
```

This will add a `file:` entry to your `package.json` for the local moonshine package.
