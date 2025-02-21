<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { defineProps, inject } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const props = defineProps<{ id: string }>();
const reloadData = inject("reloadData") as () => Promise<void>;

async function handleConfirmDelete() {
  Swal.fire({
    title: "Estas seguro?",
    text: "No podras revertirlo!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Borralo!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/student/${props.id}`);
        await reloadData();

        // Mostrar alerta de éxito
        Swal.fire({
          title: "Borrado!",
          text: "Se ha eliminado.",
          icon: "success",
        });
      } catch (error) {
        console.error("Error eliminando el estudiante:", error);
      }
    }
  });
}
</script>

<template>
  <Button variant="destructive" @click="handleConfirmDelete"> Eliminar </Button>
</template>
