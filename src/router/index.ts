import { createRouter, createWebHistory } from 'vue-router'
import GradesLoad from '@/views/GradesLoad.vue'
import Students from "@/views/Students.vue";


const routes = [
    { path: '/', component: Students },
    { path: '/grades-load/:id', component: GradesLoad, name: 'studentLoad' },
    // path: '/grades-edit/:id', component: GradesEdit, name: 'gradesEdit' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
