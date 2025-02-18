<script setup lang="ts">

// * Este es el punto de entrada de nuestra aplicación de Vue 3!

import ColorMode from "@/components/ColorMode.vue";
import Logo from "@/components/logo.vue";
</script>

<template>
  <div class="flex flex-row items-center justify-between px-5 mx-5 mt-5 bg-accent text-secondary-foreground rounded-2xl shadow-lg">
    <Logo/>
    <ColorMode/>
  </div>

  <div class="container py-5 mx-auto">
    <!-- RouterView es el componente que se encarga de renderizar las vistas de acuerdo a la ruta actual -->
    <RouterView/>
  </div>
</template>

<style scoped>

</style>

