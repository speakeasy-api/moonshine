import React, { useMemo } from 'react'
import {
  GroupedVirtuoso,
  GroupedVirtuosoHandle,
  Virtuoso,
  VirtuosoHandle,
} from 'react-virtuoso'

interface ScrollingListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  height?: string | number
  ref?: React.RefObject<VirtuosoHandle>
}

export const ScrollingList = React.forwardRef<
  VirtuosoHandle,
  ScrollingListProps<any>
>(({ items, renderItem, height }, ref) => {
  return (
    <Virtuoso
      style={{
        height,
      }}
      className="[&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-900 [&::-webkit-scrollbar]:w-2"
      totalCount={items.length}
      data={items}
      itemContent={(_, item) => renderItem(item)}
      ref={ref}
    />
  )
})

interface GroupedScrollingListProps<G, I> {
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

function GroupedScrollingListInner<G, I>(
  {
    groups,
    groupCounts,
    renderGroupHeader,
    renderItem,
    height,
  }: GroupedScrollingListProps<G, I>,
  ref: React.ForwardedRef<GroupedVirtuosoHandle>
) {
  return (
    <GroupedVirtuoso
      style={{
        height,
      }}
      className="[&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-900 [&::-webkit-scrollbar]:w-2"
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

export const GroupedScrollingList = React.forwardRef(GroupedScrollingListInner)
