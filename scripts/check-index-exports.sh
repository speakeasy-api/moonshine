#! /bin/bash

# Check that all components are exported in src/index.ts

for file in src/components/*; do
  if [[ -d $file ]]; then
    component=$(basename "$file")
    if ! grep -q "export \* from '@/components/$component'" src/index.ts; then
      echo "Component $component is not exported in src/index.ts"
      exit 1
    fi
  fi
done

echo "All components are exported in src/index.ts"
