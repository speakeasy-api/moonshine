const dynamicIconImports = {
  npm: () => import('./npm'),
  pypi: () => import('./pypi'),
  nuget: () => import('./nuget'),
  go: () => import('./go'),
  gems: () => import('./gems'),
  maven: () => import('./maven'),
  packagist: () => import('./packagist'),
}

export { dynamicIconImports as default }
