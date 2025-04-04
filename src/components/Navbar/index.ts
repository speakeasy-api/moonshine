import { Slim, SlimProps } from './Slim'

const Navbar = Object.assign(Slim, {
  /**
   * A slim version of the Navbar; used on full screen pages.
   */
  Slim,

  // TODO: Add the full Navbar component here once we have ported across from the registry
})

export { Navbar, type SlimProps as NavbarProps }
export { type NavItem } from './Slim'
