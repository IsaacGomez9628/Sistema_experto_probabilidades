import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Grades } from "@/components/table/grades-table/grades.ts";

export const columns: ColumnDef<Grades>[] = [
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
        header: 'Segundo Parcial',
        cell: ({ row }) => h('div', {}, row.getValue('second_partial')),
    },
    {
        accessorKey: 'third_partial',
        header: 'Tercer Parcial',
        cell: ({ row }) => h('div', {}, row.getValue('third_partial')),
    },
    {
        accessorKey: 'final_flag',
        header: 'Examen final',
        cell: ({ row }) => row.getValue('final_flag') ? 'Autorizado' : 'No autorizado',
    },
    {
        accessorKey: 'probability',
        header: 'Probabilidad de exito',
        cell: ({ row }) => {
            const probability = row.getValue('probability') as number;
            return h('div', {}, `${(probability * 100).toFixed(2)}%`);
        },
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
]
