import type { Column, SortDescriptor } from '../src/components/Table'

type TypeCheckRow = { name: string }

// @ts-expect-error sortable columns must define sortValue
const sortableColumnRequiresSortValue: Column<TypeCheckRow> = {
  key: 'name',
  header: 'Name',
  sortable: true,
}

const validSortableColumn: Column<TypeCheckRow> = {
  key: 'name',
  header: 'Name',
  sortable: true,
  sortValue: (row) => row.name,
}

const sortDescriptorUsesStableId: SortDescriptor = {
  id: 'name',
  direction: 'asc',
}

void sortableColumnRequiresSortValue
void validSortableColumn
void sortDescriptorUsesStableId
