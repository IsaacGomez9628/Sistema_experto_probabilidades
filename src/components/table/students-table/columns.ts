import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Students } from "@/components/table/students-table/students"
import { Button } from "@/components/ui/button"
import { useRouter } from 'vue-router'

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
        accessorKey: 'probability',
        header: 'Probabilidad de exito',
        cell: ({ row }) => {
            const probability = row.getValue('probability') as number;
            return h('div', {}, `${(probability * 100).toFixed(2)}%`);
        },
    },
    {
        accessorKey: 'actions',
        header: 'Acciones',
        cell: ({ row }) => {
            const router = useRouter()
            const studentId = row.getValue('id')
            return h(Button, {
                variant: 'default',
                class: 'px-4 py-2 text-sm font-medium',
                onClick: () => router.push({ name: 'studentLoad', params: { id: studentId as string } }),
            }, () => 'Ver carga académica')
        },
    }
]
