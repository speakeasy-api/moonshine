import { expect, type Page, test } from '@playwright/test'

type StorybookIndex = {
  stories?: Record<
    string,
    {
      exportName?: string
      importPath?: string
      name?: string
      title?: string
      type?: string
    }
  >
  entries?: Record<
    string,
    {
      exportName?: string
      importPath?: string
      name?: string
      title?: string
      type?: string
    }
  >
}

const visualStories = [
  {
    importPath: 'src/components/Button/index.stories.tsx',
    exportName: 'Primary',
    name: 'Primary',
    snapshotName: 'button-primary.png',
  },
  {
    importPath: 'src/components/Input/index.stories.tsx',
    exportName: 'Default',
    name: 'Default',
    snapshotName: 'input-default.png',
  },
  {
    importPath: 'src/components/Card/index.stories.tsx',
    exportName: 'Default',
    name: 'Default',
    snapshotName: 'card-default.png',
  },
  {
    importPath: 'src/components/Badge/index.stories.tsx',
    exportName: 'AllVariants',
    name: 'All Variants',
    snapshotName: 'badge-all-variants.png',
  },
]

async function findStoryId(page: Page, story: (typeof visualStories)[number]) {
  const response = await page.request.get('/index.json')
  expect(response.ok()).toBe(true)

  const index = (await response.json()) as StorybookIndex
  const entries = index.stories ?? index.entries ?? {}
  const match = Object.entries(entries).find(([, entry]) => {
    return (
      entry.type === 'story' &&
      (entry.exportName === story.exportName || entry.name === story.name) &&
      entry.importPath?.endsWith(story.importPath)
    )
  })

  if (!match) {
    throw new Error(
      `Unable to find Storybook story ${story.importPath}#${story.exportName}`
    )
  }

  return match[0]
}

for (const story of visualStories) {
  test(`${story.snapshotName} matches baseline`, async ({ page }) => {
    const storyId = await findStoryId(page, story)

    await page.goto(`/iframe.html?id=${storyId}&viewMode=story`)
    await page.evaluate(() => document.fonts.ready)

    const canvas = page.locator('#storybook-root')
    await expect(canvas).toBeVisible()
    await expect(canvas).toHaveScreenshot(story.snapshotName)
  })
}
