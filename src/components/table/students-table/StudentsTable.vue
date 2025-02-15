<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { columns } from '@/components/table/students-table/columns.ts'
import DataTable from '@/components/table/Datatable.vue'
import type { Students } from '@/components/table/students-table/students.ts'

const data = ref<Students[]>([])

async function getData(): Promise<Students[]> {
  try {
    const response = await axios.get('http://localhost:5000/api/students')
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
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
