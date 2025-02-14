<script setup lang="ts">
import type {
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
} from '@tanstack/vue-table'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn, valueUpdater } from '@/lib/utils'
import { ChevronDownIcon } from '@radix-icons/vue'
import {
  createColumnHelper,
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { h, ref } from 'vue'

export interface Student_Asignature {
  id: number
  student_name: string
  asignature_name: string
  first_partial: number
  second_partial: number
  third_partial: number
  final_flag: boolean
}

const data: Student_Asignature[] = [
  {
    id: 1,
    student_name: 'Carlos Gómez Hernández',
    asignature_name: 'Matemáticas',
    first_partial: 85.5,
    second_partial: 90.2,
    third_partial: 88.0,
    final_flag: true,
  },
  {
    id: 2,
    student_name: 'Carlos Gómez Hernández',
    asignature_name: 'Química',
    first_partial: 70.0,
    second_partial: 75.5,
    third_partial: 80.0,
    final_flag: true,
  },
  {
    id: 3,
    student_name: 'Carlos Gómez Hernández',
    asignature_name: 'Historia',
    first_partial: 92.3,
    second_partial: 85.0,
    third_partial: 88.7,
    final_flag: true,
  },
  {
    id: 4,
    student_name: 'Carlos Gómez Hernández',
    asignature_name: 'Inglés',
    first_partial: 60.0,
    second_partial: 65.5,
    third_partial: 70.0,
    final_flag: true,
  },
  {
    id: 5,
    student_name: 'Carlos Gómez Hernández',
    asignature_name: 'Economía',
    first_partial: 81.0,
    second_partial: 85.5,
    third_partial: 88.0,
    final_flag: true,
  },
]

const columnHelper = createColumnHelper<Student_Asignature>()

const columns = [
  // Columna de selección
  columnHelper.display({
    id: 'select',
    header: ({ table }) =>
        h(Checkbox, {
          checked:
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate'),
          'onUpdate:checked': (value: boolean) =>
              table.toggleAllPageRowsSelected(!!value),
          ariaLabel: 'Select all',
        }),
    cell: ({ row }) =>
        h(Checkbox, {
          checked: row.getIsSelected(),
          'onUpdate:checked': (value: boolean) => row.toggleSelected(!!value),
          ariaLabel: 'Select row',
        }),
    enableSorting: false,
    enableHiding: false,
  }),
  // Nombre del estudiante
  columnHelper.accessor('student_name', {
    header: 'Nombre del Estudiante',
    cell: ({ row }) => h('div', row.getValue('student_name')),
  }),
  // Nombre de la asignatura
  columnHelper.accessor('asignature_name', {
    header: 'Nombre de la Asignatura',
    cell: ({ row }) => h('div', row.getValue('asignature_name')),
  }),
  // Primer Parcial
  columnHelper.accessor('first_partial', {
    header: 'Primer Parcial',
    cell: ({ row }) => h('div', row.getValue('first_partial')),
  }),
  // Segundo Parcial
  columnHelper.accessor('second_partial', {
    header: 'Segundo Parcial',
    cell: ({ row }) => h('div', row.getValue('second_partial')),
  }),
  // Tercer Parcial
  columnHelper.accessor('third_partial', {
    header: 'Tercer Parcial',
    cell: ({ row }) => h('div', row.getValue('third_partial')),
  }),
  // Indicador final (Sí/No)
  columnHelper.accessor('final_flag', {
    header: 'Final?',
    cell: ({ row }) => h('div', row.getValue('final_flag') ? 'Sí' : 'No'),
  }),
]

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const expanded = ref<ExpandedState>({})

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  onExpandedChange: updaterOrValue => valueUpdater(updaterOrValue, expanded),
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
    get columnVisibility() {
      return columnVisibility.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
    get expanded() {
      return expanded.value;
    },
    // Si no usas la columna "status", puedes quitar esta línea
    columnPinning: {
      left: ['status'],
    },
  },
})
</script>

<template>
  <div class="w-full">
    <!-- Filtro -->
    <div class="flex gap-2 items-center py-4">
      <Input
          class="max-w-sm"
          placeholder="Filtrar nombre del estudiante..."
          :model-value="table.getColumn('student_name')?.getFilterValue() as string"
          @update:model-value="table.getColumn('student_name')?.setFilterValue($event)"
      />
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="ml-auto">
            Columns <ChevronDownIcon class="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
              v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
              :key="column.id"
              class="capitalize"
              :checked="column.getIsVisible()"
              @update:checked="(value) => column.toggleVisibility(!!value)"
          >
            {{ column.id }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <!-- Tabla con theming basado en CSS variables (fondo oscuro y texto blanco) -->
    <div>
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead
                v-for="header in headerGroup.headers"
                :key="header.id"
                :data-pinned="header.column.getIsPinned()"
                class="px-4 py-2 bg-gray-800 text-white"
            >
              <FlexRender
                  v-if="!header.isPlaceholder"
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <template v-for="row in table.getRowModel().rows" :key="row.id">
              <TableRow :data-state="row.getIsSelected() && 'selected'" class="hover:bg-gray-900">
                <TableCell
                    v-for="cell in row.getVisibleCells()"
                    :key="cell.id"
                    class="px-4 py-2"
                >
                  <FlexRender
                      :render="cell.column.columnDef.cell"
                      :props="cell.getContext()"
                  />
                </TableCell>
              </TableRow>
              <TableRow v-if="row.getIsExpanded()">
                <TableCell :colspan="table.getAllColumns().length">
                  {{ JSON.stringify(row.original) }}
                </TableCell>
              </TableRow>
            </template>
          </template>
          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Paginación -->
    <div class="flex items-center justify-end space-x-2 py-4">
      <div class="flex-1 text-sm text-gray-400">
        {{ table.getFilteredSelectedRowModel().rows.length }} of {{ table.getFilteredRowModel().rows.length }} row(s) selected.
      </div>
      <div class="space-x-2">
        <Button
            variant="outline"
            size="sm"
            :disabled="!table.getCanPreviousPage()"
            @click="table.previousPage()"
        >
          Previous
        </Button>
        <Button
            variant="outline"
            size="sm"
            :disabled="!table.getCanNextPage()"
            @click="table.nextPage()"
        >
          Next
        </Button>
      </div>
    </div>
  </div>
</template>
