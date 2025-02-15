<script setup lang="ts">
import ColorMode from "@/components/ColorMode.vue";
import Logo from "@/components/logo.vue";
</script>

<template>
  <div class="flex flex-row items-center justify-between px-5 mx-5 mt-5 bg-accent text-secondary-foreground rounded-2xl shadow-lg">
    <Logo/>
    <ColorMode/>
  </div>

  <div class="container py-5 mx-auto">
    <RouterView/>
  </div>
</template>

<style scoped>
</style>
