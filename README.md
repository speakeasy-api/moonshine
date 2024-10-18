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

Then you can import components from the package:

```tsx
import { Box } from "@speakeasy-api/moonshine";
```

The package is built with [esbuild](https://esbuild.github.io/), and is distributed using [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules). CommonJS modules are not currently generated but could be if that's helpful for your use case.

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

- `feat`: A new feature
- `fix`: A bug fix
- `perf`: A code change that improves performance
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `test`: Adding missing tests
