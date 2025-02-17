<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AddSubjectForm from "@/components/forms/AddAsignatureForm.vue"; // Importa el formulario de agregar materia

const dialogOpen = ref(false);

// Definición de las props
const props = defineProps<{
  studentId: string // Prop "studentId" para el botón de agregar materia
}>();

// Función para cerrar el diálogo
const handleDialogClose = () => {
  dialogOpen.value = false;
}
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogTrigger as-child>
      <Button variant="outline" @click="dialogOpen = true">
        Agregar Materia
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Agregar Materia</DialogTitle>
      </DialogHeader>
      <!-- AddSubjectButton.vue -->
      <AddSubjectForm :studentId="props.studentId" @closeDialog="handleDialogClose" />
    </DialogContent>
  </Dialog>
</template>
