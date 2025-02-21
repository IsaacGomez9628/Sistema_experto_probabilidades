<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import axios from "axios";
import { inject } from "vue";
import Swal from "sweetalert2";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Definición de las props
const props = defineProps<{
  initialGrades?: {
    id?: number;
    first_partial?: number;
    second_partial?: number;
    third_partial?: number;
  };
}>();

// Definir los eventos que emitirá este componente
const emit = defineEmits(["closeDialog", "refreshData"]);

// Esquema de validación
// Esquema de validación
const formSchema = toTypedSchema(
  z.object({
    id: z.number().optional(),
    first_partial: z.number().min(0).max(100).nullable().optional(),
    second_partial: z.number().min(0).max(100).nullable().optional(),
    third_partial: z.number().min(0).max(100).nullable().optional(),
  })
);

// Inicialización del formulario
const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    id: props.initialGrades?.id,
    first_partial: props.initialGrades?.first_partial ?? 0,
    second_partial: props.initialGrades?.second_partial ?? 0,
    third_partial: props.initialGrades?.third_partial ?? 0,
  },
});

const reloadData = inject("reloadData") as () => Promise<void>;

// Función que se ejecuta al enviar el formulario
// EditGradeForm.vue
const onSubmit = form.handleSubmit(async (values) => {
  try {
    await axios.put(`http://localhost:5000/api/students_asignatures`, values);
    console.log("Calificaciones actualizadas:", values);
    emit("closeDialog");
    if (reloadData) {
      await reloadData();
    } // <-- Usar la función inyectada

    Swal.fire({
      title: "Excelente!",
      text: "Estudiante editado exitosamente.",
      icon: "success",
      draggable: true,
    });
  } catch (error) {
    console.error(
      "Error al actualizar las notas:",
      (error as any).response?.data || (error as any).message
    );
  }
});
</script>

<template>
  <form @submit="onSubmit">
    <!-- Campo oculto para el ID -->
    <input type="hidden" v-model="form.values.id" />

    <FormField v-slot="{ componentField }" name="first_partial">
      <FormItem>
        <FormLabel>Primer Parcial</FormLabel>
        <FormControl>
          <Input type="number" placeholder="0" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="second_partial">
      <FormItem>
        <FormLabel>Segundo Parcial</FormLabel>
        <FormControl>
          <Input type="number" placeholder="0" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="third_partial">
      <FormItem>
        <FormLabel>Tercer Parcial</FormLabel>
        <FormControl>
          <Input type="number" placeholder="0" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button class="mt-5" type="submit"> Guardar </Button>
  </form>
</template>
