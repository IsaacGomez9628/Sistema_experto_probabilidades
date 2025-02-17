<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import axios from "axios";
import { inject } from 'vue';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const reloadData = inject('reloadData') as () => Promise<void>;
// Definición de las props
const props = defineProps<{
  studentId: string // Prop "studentId" para el formulario de agregar materia
}>();

// Definir los eventos que emitirá este componente
const emit = defineEmits(['closeDialog', 'refreshData']);

// Esquema de validación
const formSchema = toTypedSchema(z.object({
  asignature_id: z.string().nonempty('Debes seleccionar una materia'),
}));

// Inicialización del formulario
const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    asignature_id: null,
  }
});


const asignatures = ref([]);

// Obtener las materias disponibles
const fetchAsignatures = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/asignatures`);
    asignatures.value = response.data;
  } catch (error) {
    console.error('Error al obtener las asignaturas:', error.response?.data || error.message);
  }
}

onMounted(fetchAsignatures);

// Función que se ejecuta al enviar el formulario
const onSubmit = form.handleSubmit(async (values) => {
  try {
    await axios.post(`http://localhost:5000/api/student_asignature`, {
      student_id: props.studentId, // Usar la prop "studentId"
      asignature_id: values.asignature_id,
    });
    console.log('Materia agregada:', values);
    emit('closeDialog');
    await reloadData(); // Usar la función inyectada
  } catch (error) {
    console.error('Error al agregar la materia:', error.response?.data || error.message);
  }
});
</script>

<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="asignature_id">
      <FormItem>
        <FormLabel>Nombre de la Materia</FormLabel>
        <FormControl>
          <Select v-bind="componentField">
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una materia" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Materias Disponibles</SelectLabel>
                <SelectItem v-for="asignature in asignatures" :key="asignature.id" :value="asignature.id.toString()">
                  {{ asignature.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button class="mt-5" type="submit">
      Guardar
    </Button>
  </form>
</template>
