<script setup lang="ts">
import { defineEmits, inject } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

// Inyectamos la función de recarga, si está disponible en un componente superior
const reloadData = inject('reloadData') as () => Promise<void>

// Definir los eventos que emitirá este componente
const emit = defineEmits(['closeDialog'])

// Esquema de validación para el estudiante
const formSchema = toTypedSchema(z.object({
  name: z.string().nonempty('El nombre es requerido'),
  ap: z.string().nonempty('El apellido paterno es requerido'),
  am: z.string().nonempty('El apellido materno es requerido'),
  period: z.string().nonempty('El período es requerido'),
}))

// Inicialización del formulario con vee-validate
const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: '',
    ap: '',
    am: '',
    period: '',
  }
})

// Función que se ejecuta al enviar el formulario
const onSubmit = form.handleSubmit(async (values) => {
  try {
    // Llamada a la API
    await axios.post('http://localhost:5000/api/student', values)
    console.log('Estudiante agregado:', values)
    emit('closeDialog')
    if (reloadData) {
      await reloadData()
    }
  } catch (error) {
    console.error('Error al agregar el estudiante:', error.response?.data || error.message)
  }
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-3">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Nombre</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Ingrese el nombre" class="input-class" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="ap">
      <FormItem>
        <FormLabel>Apellido Paterno</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Ingrese el apellido paterno" class="input-class" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="am">
      <FormItem>
        <FormLabel>Apellido Materno</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Ingrese el apellido materno" class="input-class" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="period">
      <FormItem>
        <FormLabel>Periodo</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Ingrese el período (1-8)" class="input-class" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button class="mt-5" type="submit">
      Guardar
    </Button>
  </form>
</template>
