<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted, inject } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import axios from "axios";
import Swal from "sweetalert2"; // Importar SweetAlert2

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const reloadData = inject("reloadData") as () => Promise<void>;

// Definición de las props
const props = defineProps<{ studentId: string }>();

// Definir los eventos que emitirá este componente
const emit = defineEmits(["closeDialog", "refreshData"]);

// Esquema de validación
const formSchema = toTypedSchema(
  z.object({
    asignature_id: z.string().nonempty("Debes seleccionar una materia"),
  })
);

// Inicialización del formulario
const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    asignature_id: null,
  },
});

const asignatures = ref([]); // Todas las asignaturas disponibles
const studentAsignatures = ref<string[]>([]); // Asignaturas que ya tiene el estudiante

// Obtener las materias disponibles
const fetchAsignatures = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/asignatures`);
    asignatures.value = response.data;
  } catch (error) {
    console.error(
      "Error al obtener las asignaturas:",
      error.response?.data || error.message
    );
  }
};

// Obtener las materias que el estudiante ya tiene
const fetchStudentAsignatures = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/student_asignatures/${props.studentId}`
    );
    studentAsignatures.value = response.data.map((asignature: any) =>
      asignature.asignature_id.toString()
    );
  } catch (error) {
    console.error(
      "Error al obtener asignaturas del estudiante:",
      error.response?.data || error.message
    );
  }
};

onMounted(async () => {
  await fetchAsignatures();
  await fetchStudentAsignatures();
});

// Función que se ejecuta al enviar el formulario
const onSubmit = form.handleSubmit(async (values) => {
  // Verificar si la materia ya está registrada para el estudiante
  if (studentAsignatures.value.includes(values.asignature_id)) {
    await Swal.fire({
      title: "Materia duplicada",
      text: "El estudiante ya tiene esta asignatura registrada.",
      icon: "warning",
    });
    return;
  }

  // Mostrar el SweetAlert de confirmación
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción agregará la asignatura al estudiante.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, agregar",
    cancelButtonText: "Cancelar",
  });

  if (result.isConfirmed) {
    try {
      await axios.post(`http://localhost:5000/api/student_asignature`, {
        student_id: props.studentId,
        asignature_id: values.asignature_id,
      });

      await Swal.fire({
        title: "¡Asignatura agregada!",
        text: "La materia ha sido añadida correctamente.",
        icon: "success",
      });

      emit("closeDialog");
      await reloadData();
      await fetchStudentAsignatures();
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text:
          error.response?.data?.error ||
          "Hubo un problema al agregar la asignatura.",
        icon: "error",
      });
    }
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
                <SelectItem
                  v-for="asignature in asignatures"
                  :key="asignature.id"
                  :value="asignature.id.toString()"
                >
                  {{ asignature.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button class="mt-5" type="submit"> Guardar </Button>
  </form>
</template>
