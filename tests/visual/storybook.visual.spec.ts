import { expect, type Page, type TestInfo, test } from '@playwright/test'

type StorybookEntry = {
  exportName?: string
  id?: string
  importPath?: string
  name?: string
  tags?: string[]
  title?: string
  type?: string
}

type StorybookIndex = {
  stories?: Record<string, StorybookEntry>
  entries?: Record<string, StorybookEntry>
}

type VisualStory = {
  exportName?: string
  id?: string
  importPath: string
  name: string
  snapshotName: string
}

const storybookGlobals = new URLSearchParams({
  globals: 'theme:light',
  viewMode: 'story',
})

const visualScope = process.env.VISUAL_TEST_SCOPE ?? 'curated'

const skipVisualTags = new Set([
  'no-visual-test',
  'skip-visual-test',
  'visual:skip',
])

const curatedStories: VisualStory[] = [
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

async function getStorybookEntries(page: Page) {
  const response = await page.request.get('/index.json')
  expect(response.ok()).toBe(true)

  const index = (await response.json()) as StorybookIndex
  return index.stories ?? index.entries ?? {}
}

async function findStoryId(page: Page, story: VisualStory) {
  const entries = await getStorybookEntries(page)
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

function getGeneratedStories(entries: Record<string, StorybookEntry>) {
  return Object.entries(entries)
    .filter(([, entry]) => {
      return (
        entry.type === 'story' &&
        Boolean(entry.importPath) &&
        !entry.tags?.some((tag) => skipVisualTags.has(tag))
      )
    })
    .map(([id, entry]) => {
      return {
        id,
        importPath: entry.importPath ?? '',
        name: entry.name ?? id,
        snapshotName: `${id}.png`,
      } satisfies VisualStory
    })
}

async function expectStoryToMatchSnapshot(
  page: Page,
  story: VisualStory,
  testInfo: TestInfo
) {
  const storyId = story.id ?? (await findStoryId(page, story))

  await page.goto(`/iframe.html?id=${storyId}&${storybookGlobals}`)
  await page.evaluate(() => document.fonts.ready)

  const canvas = page.locator('#storybook-root')
  await expect(canvas).toBeVisible()

  const snapshotName =
    visualScope === 'all'
      ? ['all-stories', testInfo.project.name, story.snapshotName]
      : story.snapshotName

  await expect(canvas).toHaveScreenshot(snapshotName)
}

if (visualScope === 'all') {
  test('all indexed stories match baselines', async ({ page }, testInfo) => {
    const stories = getGeneratedStories(await getStorybookEntries(page))
    expect(stories.length).toBeGreaterThan(0)

    for (const story of stories) {
      await test.step(`${story.importPath}#${story.name}`, async () => {
        await expectStoryToMatchSnapshot(page, story, testInfo)
      })
    }
  })
} else {
  for (const story of curatedStories) {
    test(`${story.snapshotName} matches baseline`, async ({
      page,
    }, testInfo) => {
      await expectStoryToMatchSnapshot(page, story, testInfo)
    })
  }
}

if (visualScope !== 'curated' && visualScope !== 'all') {
  throw new Error(`Unsupported VISUAL_TEST_SCOPE: ${visualScope}`)
}
