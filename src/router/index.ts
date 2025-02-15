import { createRouter, createWebHistory } from 'vue-router'
import StudentLoad from '@/views/GradesLoad.vue'
import Students from "@/views/Students.vue";

const routes = [
    { path: '/', component: Students },
    { path: '/grades-load/:id', component: StudentLoad, name: 'studentLoad' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
