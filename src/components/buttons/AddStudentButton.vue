<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AddStudentForm from "@/components/forms/AddStudentForm.vue"; // Importa el formulario para agregar estudiante

const dialogOpen = ref(false);

// Función para cerrar el diálogo
const handleDialogClose = () => {
  dialogOpen.value = false;
}
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogTrigger as-child>
      <Button variant="secondary" @click="dialogOpen = true">
        Agregar Estudiante
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Agregar Estudiante</DialogTitle>
      </DialogHeader>
      <AddStudentForm @closeDialog="handleDialogClose" />
    </DialogContent>
  </Dialog>
</template>
