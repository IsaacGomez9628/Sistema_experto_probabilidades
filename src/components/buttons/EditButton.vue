// EditButton.vue
<script setup lang="ts">
import { ref, defineProps} from 'vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import EditGradeForm from "@/components/forms/EditGradeForm.vue"

// Recibimos las calificaciones iniciales
const props = defineProps<{
  initialGrades?: {
    id?: number,
    first_partial?: number,
    second_partial?: number,
    third_partial?: number,
  }
}>()

const dialogOpen = ref(false)

// Función para cerrar el diálogo
const handleDialogClose = () => {
  dialogOpen.value = false
}
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogTrigger as-child>
      <Button variant="outline" @click="dialogOpen = true">
        Editar
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Editar calificaciones</DialogTitle>
      </DialogHeader>
      <!-- EditButton.vue -->
      <EditGradeForm
          :initialGrades="props.initialGrades"
          @closeDialog="handleDialogClose"
      />

    </DialogContent>
  </Dialog>
</template>
