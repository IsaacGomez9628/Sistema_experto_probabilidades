<script setup lang="ts">
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { ref, defineProps, inject } from 'vue';
import axios from "axios";

const props = defineProps<{ id: string }>();
const dialogOpen = ref(false);
const reloadData = inject('reloadData') as () => Promise<void>;

const handleDialogClose = () => {
  dialogOpen.value = false;
}

async function handleConfirmDelete() {
  try {
    await axios.delete(`http://localhost:5000/api/student/${props.id}`);
    await reloadData();
  } catch (error) {
    console.error('Error eliminando el estudiante:', error);
  }
  dialogOpen.value = false;
}
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogTrigger as-child>
      <Button variant="destructive" @click="dialogOpen = true">
        Eliminar
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Confirmar eliminación</DialogTitle>
      </DialogHeader>
      <p>¿Estás seguro de que deseas eliminar a este estudiante? Esta acción no se puede deshacer.</p>
      <DialogFooter>
        <Button variant="outline" @click="handleDialogClose">Cancelar</Button>
        <Button variant="destructive" @click="handleConfirmDelete">Eliminar</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
/* Añade estilos adicionales aquí si es necesario */
</style>
