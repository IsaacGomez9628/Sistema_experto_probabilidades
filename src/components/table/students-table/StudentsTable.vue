<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { columns } from '@/components/table/students-table/columns.ts'
import DataTable from '@/components/table/Datatable.vue'
import type { Students } from '@/components/table/students-table/students.ts'

const data = ref<Students[]>([])

async function getData(): Promise<Students[]> {
  return [
    {
      id: 1,
      name: 'Juan',
      ap: 'Pérez',
      am: 'Gómez',
      period: 3,
    },
    // Puedes agregar más datos de ejemplo aquí.
  ]
}

onMounted(async () => {
  data.value = await getData()
})
</script>

<template>
  <div class="container py-10 mx-auto">
    <DataTable :columns="columns" :data="data" />
  </div>
</template>