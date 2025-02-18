import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Students } from "@/components/table/students-table/students"
import { Button } from "@/components/ui/button"
import { useRouter } from 'vue-router'
import { Icon } from "@iconify/vue"
import checkCircleIcon from '@iconify-icons/radix-icons/check-circled'
import exclamationTriangleIcon from '@iconify-icons/radix-icons/exclamation-triangle'
import crossCircleIcon from '@iconify-icons/radix-icons/cross-circled'
import DeleteStudentButton from "@/components/buttons/DeleteStudentButton.vue";

export const columns: ColumnDef<Students>[] = [
    {
        accessorKey: 'id',
        header: () => h('div', { class: 'text-left' }, 'ID'),
        cell: ({ row }) => h('div', {}, row.getValue('id')),
    },
    {
        accessorKey: 'name',
        header: 'Nombre',
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
        header: 'Probabilidad de éxito',
        cell: ({ row }) => {
            const probability = row.getValue('probability') as number;
            const icon = probability >= 0.7 ? checkCircleIcon :
                probability >= 0.3 ? exclamationTriangleIcon :
                    crossCircleIcon;
            return h('div', { class: 'flex items-center' },
                h(Icon, { icon: icon, class: 'mr-2' }),
                `${(probability * 100).toFixed(2)}%`
            );
        },
    },
    {
        accessorKey: 'actions',
        header: 'Acciones',
        cell: ({ row }) => {
            const studentId = row.original.id as string;
            const router = useRouter();
            return h('div', { class: 'flex space-x-2' }, [
                h(Button, {
                    variant: 'default',
                    class: 'px-4 py-2 text-sm font-medium',
                    onClick: () => router.push({ name: 'studentLoad', params: { id: studentId } }),
                }, () => 'Ver carga académica'),
                h(DeleteStudentButton, {
                    id: studentId
                })
            ]);
        },
    }
];
