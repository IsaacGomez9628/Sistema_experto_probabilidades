<script setup lang="ts">

// * Importamos los componentes
import GradesTable from "@/components/table/grades-table/GradesTable.vue";

// * Importamos la libreria necesaria para hacer peticiones HTTP
import axios from "axios";

// * Importamos las funciones necesarias para obtener la ruta actual y definir variables reactivas
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";


const route = useRoute();
const student_id = route.params.id as string;

const studentName = ref<string>("");

async function getStudentName(student_id: string) {
  try {
    const response = await axios.get(`http://localhost:5000/api/student/${student_id}`);
    if (response.data.length > 0) {
      const student = response.data[0];
      studentName.value = `${student.name} ${student.ap} ${student.am}`;
    }
  } catch (error) {
    console.error('Error fetching student name:', error);
  }
}

onMounted(() => {
  getStudentName(student_id);
});


</script>

<template>
  <h1 class="text-2xl font-bold text-center">Materias de {{ studentName }}</h1>
  <GradesTable />
</template>

