<script setup lang="ts">
import StudentTable from "@/components/table/grades-table/GradesTable.vue";
import ColorMode from "@/components/ColorMode.vue";
import Logo from "@/components/logo.vue";
import StudentsTable from "@/components/table/students-table/StudentsTable.vue";
</script>


<template>
  <div class="min-h-screen m-5 flex flex-col items-center">
    <Logo />
    <ColorMode />
    <div class="container py-10 mx-auto">
      <StudentsTable/>
    </div>
  </div>
</template>

<style scoped>

</style>