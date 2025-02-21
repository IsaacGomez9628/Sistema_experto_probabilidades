<script setup lang="ts">
import { onMounted, ref, provide } from "vue";
import axios from "axios";
import { columns } from "@/components/table/students-table/columns";
import DataTable from "@/components/table/Datatable.vue";
import type { Students } from "@/components/table/students-table/students.ts";
import AddStudentButton from "@/components/buttons/AddStudentButton.vue";

const data = ref<Students[]>([]);

// Función para obtener los datos de estudiantes
async function getData(): Promise<Students[]> {
  try {
    const response = await axios.get("http://localhost:5000/api/students");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// Función para recargar los datos de la tabla
async function reloadData() {
  data.value = await getData();
  console.log("Datos recargados");
}

// Proveer la función de recarga para que cualquier componente hijo pueda utilizarla
provide("reloadData", reloadData);

onMounted(async () => {
  data.value = await getData();
});
</script>

<template>
  <div class="container py-10 mx-auto">
    <!-- Si tienes un botón para agregar estudiantes, lo puedes incluir: -->
    <AddStudentButton />
    <DataTable :columns="columns" :data="data" />
  </div>
</template>
