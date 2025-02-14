<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { columns } from '@/components/table/student-table/columns.ts'
import DataTable from '@/components/table/Datatable.vue'
import type { Student } from '@/components/table/student-table/student.ts'

const data = ref<Student[]>([])

async function getData(): Promise<Student[]> {
  return [
    {
      id: '728ed52f',
      name: 'Juan',
      ap: 'Pérez',
      am: 'Gómez',
      asignature_name: 'Matemáticas',
      first_partial: 8,
      second_partial: 7,
      third_partial: 9,
      average: 8.00,
      final_flag: true,
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
