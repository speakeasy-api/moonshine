import * as fs from 'fs'

import {
  breakpoints,
  paddingValues,
  gapValues,
  gridColumnValues,
} from '../src/types'

function generateResponsiveClasses(
  prefixes: string[],
  values: readonly (string | number)[],
  breakpointValues: string[]
) {
  const result: string[] = []
  breakpointValues.forEach((breakpoint) => {
    prefixes.forEach((prefix) => {
      values.forEach((val) => {
        if (breakpoint !== 'xs') {
          result.push(`${breakpoint}${prefix}${val}`)
        }
      })
    })
  })

  return result
}

function generate() {
  let result: string[] = []

  const breakpointValues = [''].concat(
    breakpoints.filter((b) => b !== 'xs').map((b) => `${b}:`)
  )

  result = result.concat(
    generateResponsiveClasses(
      ['p-', 'px-', 'py-', 'pt-', 'pr-', 'pb-', 'pl-'],
      paddingValues,
      breakpointValues
    )
  )

  result = result.concat(
    generateResponsiveClasses(['gap-'], gapValues, breakpointValues)
  )

  result = result.concat(
    generateResponsiveClasses(
      ['grid-cols-'],
      gridColumnValues,
      breakpointValues
    )
  )

  result = result.concat(
    generateResponsiveClasses(
      ['flex-'],
      [
        'row',
        'col',
        'nowrap',
        'wrap',
        'wrap-reverse',
        'none',
        '1',
        'grow',
        'shrink',
        'auto',
        'initial',
      ],
      breakpointValues
    )
  )

  result = result.concat(
    generateResponsiveClasses(
      ['justify-'],
      ['start', 'center', 'end', 'between', 'evenly'],
      breakpointValues
    )
  )

  result = result.concat(
    generateResponsiveClasses(
      ['items-'],
      ['start', 'center', 'end', 'stretch', 'baseline'],
      breakpointValues
    )
  )

  result = result.concat(
    generateResponsiveClasses(['col-span-'], gridColumnValues, breakpointValues)
  )

  result = result.concat(
    generateResponsiveClasses(['size-'], [8, 12, 16, 24, 32], breakpointValues)
  )

  fs.writeFileSync('tailwind_safelist.txt', result.join(' \n'))
}

generate()
