import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Grades } from "@/components/table/grades-table/grades.ts";

export const columns: ColumnDef<Grades>[] = [
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
        accessorKey: 'asignature_name',
        header: 'Asignatura',
        cell: ({ row }) => h('div', {}, row.getValue('asignature_name')),
    },
    {
        accessorKey: 'first_partial',
        header: 'Primer Parcial',
        cell: ({ row }) => h('div', {}, row.getValue('first_partial')),
    },
    {
        accessorKey: 'second_partial',
        header: 'Primer Parcial',
        cell: ({ row }) => h('div', {}, row.getValue('second_partial')),
    },
    {
        accessorKey: 'third_partial',
        header: 'Primer Parcial',
        cell: ({ row }) => h('div', {}, row.getValue('third_partial')),
    },
    {
        accessorKey: 'average',
        header: () => h('div', { class: 'text-right' }, 'Promedio'),
        cell: ({ row }) => {
            const average = Number.parseFloat(row.getValue('average'))
            const formatted = average.toFixed(2)
            return h('div', { class: 'text-right font-medium' }, formatted)
        },
    },
    {
        accessorKey: 'final_flag',
        header: 'Finalizado',
        cell: ({ row }) => row.getValue('final_flag') ? 'Sí' : 'No',
    },
]
