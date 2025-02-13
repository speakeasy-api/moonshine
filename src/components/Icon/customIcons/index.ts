const dynamicIconImports = {
  npm: () => import('./npm'),
  pypi: () => import('./pypi'),
  nuget: () => import('./nuget'),
  go: () => import('./go'),
  gems: () => import('./gems'),
}

export { dynamicIconImports as default }
