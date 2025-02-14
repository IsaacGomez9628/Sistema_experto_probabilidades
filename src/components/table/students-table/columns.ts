import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Students } from "@/components/table/students-table/students"
import { Button } from "@/components/ui/button"

export const columns: ColumnDef<Students>[] = [
    {
        accessorKey: 'id',
        header: () => h('div', { class: 'text-left' }, 'ID'),
        cell: ({ row }) => h('div', {}, row.getValue('id')),
    },
    {
        accessorKey: 'name',
        header: () => h('div', { class: 'text-left' }, 'Nombre'),
        cell: ({ row }) => h('div', {}, row.getValue('name')),
    },
    {
        accessorKey: 'ap',
        header: 'Apellido Paterno',
        cell: ({ row }) => h('div', {}, row.getValue('ap')),
    },
    {
        accessorKey: 'am',
        header: 'Apellido Materno',
        cell: ({ row }) => h('div', {}, row.getValue('am')),
    },
    {
        accessorKey: 'period',
        header: 'Periodo',
        cell: ({ row }) => h('div', {}, row.getValue('period')),
    },
    {
        accessorKey: 'actions',
        header: 'Acciones',
        cell: ({ row }) =>
            h(Button, {
                variant: 'default',
                class: 'px-4 py-2 text-sm font-medium',
                onClick: () => alert(`Ver carga académica de ${row.getValue('name')}`),
            }, () => 'Ver carga académica'),
    },
]
