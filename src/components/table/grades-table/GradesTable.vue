<script setup lang="ts">
import { onMounted, ref, provide } from 'vue'
import { columns } from '@/components/table/grades-table/columns.ts'
import DataTable from '@/components/table/Datatable.vue'
import type { Grades } from '@/components/table/grades-table/grades.ts'
import axios from 'axios'
import { useRoute } from 'vue-router'
import AddButton from "@/components/buttons/AddButton.vue";

// * Definimos las variable que contendrá un JSON de la tabla
const data = ref<Grades[]>([])

// * Obtiene la información necesaria para la tabla
async function getData(student_id: string): Promise<Grades[]> {
  try {
    const response = await axios.get(`http://localhost:5000/api/students_asignatures/${student_id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}

// * Recarga los datos de la tabla...
async function reloadData() {
  data.value = await getData(student_id);
  console.log('Datos recargados');
}

// * ...y dejamos que cualquier hijo de esta tabla pueda recargar los datos
provide('reloadData', reloadData)


const route = useRoute()
const student_id = route.params.id as string

onMounted(async () => {
  data.value = await getData(student_id)
})



</script>

<template>
  <div class="container py-10 mx-auto">
    <AddButton :studentId="student_id" />
    <!-- Se pasa la data reactiva -->
    <DataTable :columns="columns" :data="data" />
  </div>
</template>
