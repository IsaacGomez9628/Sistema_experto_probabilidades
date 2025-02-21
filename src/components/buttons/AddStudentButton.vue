<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/use-toast"; // Ajusta la ruta según tu estructura
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddStudentForm from "@/components/forms/AddStudentForm.vue";

const dialogOpen = ref(false);
const { toast } = useToast(); // Utilizamos directamente el hook useToast

// Función para cerrar el diálogo
const handleDialogClose = () => {
  dialogOpen.value = false;
};

// Función para manejar el evento de toast emitido por el formulario
const handleShowToast = (toastConfig: {
  message: string;
  type: "foreground" | "background" | undefined;
}) => {
  // Cerramos el diálogo primero para que el toast sea visible
  dialogOpen.value = false;
  // Mostramos el toast después de un pequeño retraso para asegurar que el diálogo se haya cerrado
  setTimeout(() => {
    toast(toastConfig);
  }, 100);
};
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
      <AddStudentForm
        @closeDialog="handleDialogClose"
        @showToast="handleShowToast"
      />
    </DialogContent>
  </Dialog>
</template>
