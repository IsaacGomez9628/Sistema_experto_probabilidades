// EditButton.vue
<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import EditGrade from "@/components/forms/EditGradeForm.vue"

// Recibimos las calificaciones iniciales
const props = defineProps<{
  initialGrades?: {
    id?: number,
    first_partial?: number,
    second_partial?: number,
    third_partial?: number,
  }
}>()

// Emitiremos el objeto actualizado al padre
const emit = defineEmits(['updateGrade'])

const dialogOpen = ref(false)

function handleRefreshData(updatedGrade: any) {
  // Reemitir el evento para que el componente padre actualice la data
  emit('updateGrade', updatedGrade)
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
      <EditGrade
          :initialGrades="props.initialGrades"
          @refreshData="handleRefreshData"
      />
    </DialogContent>
  </Dialog>
</template>
