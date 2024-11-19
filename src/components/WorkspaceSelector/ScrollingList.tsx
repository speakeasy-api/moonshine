import React from 'react'
import {
  GroupedVirtuoso,
  GroupedVirtuosoHandle,
  Virtuoso,
  VirtuosoHandle,
} from 'react-virtuoso'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const forwardRefWithGenerics = <T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode | null
): ((props: P & React.RefAttributes<T>) => React.ReactNode | null) =>
  // @ts-expect-error cant type this correctly
  React.forwardRef<T, P>(render)

const DEFAULT_SCROLLBAR_CLASSES =
  '[&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:active]:bg-black/20 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb:active]:bg-white/50 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-900 [&::-webkit-scrollbar]:w-2'

interface ScrollingListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  height?: string | number
  ref?: React.RefObject<VirtuosoHandle>
}

function ScrollingListInner<T>(
  { items, renderItem, height }: ScrollingListProps<T>,
  ref: React.ForwardedRef<VirtuosoHandle>
) {
  return (
    <Virtuoso
      style={{
        height,
      }}
      className={DEFAULT_SCROLLBAR_CLASSES}
      totalCount={items.length}
      data={items}
      itemContent={(_, item) => renderItem(item)}
      ref={ref}
    />
  )
}

export const ScrollingList = forwardRefWithGenerics(ScrollingListInner)

interface GroupedScrollingListProps<G> {
  groups: G[]

  /**
   * An array of integers to represent the number of items in each group.
   * e.g [10, 20, 30] means there are 3 groups with 10, 20, and 30 items respectively.
   */
  groupCounts: number[]
  renderGroupHeader: (group: G) => React.ReactNode
  renderItem: (group: G, itemIndex: number) => React.ReactNode
  height?: string | number
  ref?: React.RefObject<GroupedVirtuosoHandle>
}

function GroupedScrollingListInner<G>(
  {
    groups,
    groupCounts,
    renderGroupHeader,
    renderItem,
    height,
  }: GroupedScrollingListProps<G>,
  ref: React.ForwardedRef<GroupedVirtuosoHandle>
) {
  return (
    <GroupedVirtuoso
      style={{
        height,
      }}
      className={DEFAULT_SCROLLBAR_CLASSES}
      groupCounts={groupCounts}
      groupContent={(index) => renderGroupHeader(groups[index])}
      itemContent={(itemIndex, groupIndex) => {
        const group = groups[groupIndex]

        return renderItem(group, itemIndex)
      }}
      ref={ref}
    />
  )
}

export const GroupedScrollingList = forwardRefWithGenerics(
  GroupedScrollingListInner
)
