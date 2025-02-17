// GradesTable.vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { columns } from '@/components/table/grades-table/columns.ts'
import DataTable from '@/components/table/Datatable.vue'
import type { Grades } from '@/components/table/grades-table/grades.ts'
import axios from "axios"
import { useRoute } from "vue-router"

const data = ref<Grades[]>([])

async function getData(student_id: string): Promise<Grades[]> {
  try {
    const response = await axios.get(`http://localhost:5000/api/students_asignatures/${student_id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}

const route = useRoute()
const student_id = route.params.id as string

onMounted(async () => {
  data.value = await getData(student_id)
})

// Función para actualizar la data localmente
function updateGrade(updatedGrade: Grades) {
  data.value = data.value.map(grade =>
      grade.id === updatedGrade.id ? { ...grade, ...updatedGrade } : grade
  )
}
</script>

<template>
  <div class="container py-10 mx-auto">
    <!-- Se pasa la función updateGrade a los botones de edición -->
    <DataTable :columns="columns" :data="data" @updateGrade="updateGrade" />
  </div>
</template>
