#! /bin/bash

# Builds the package into dist/
pnpm build

# Links the package into the integration test app so that it is up to date
cd integration
pnpm link ../
