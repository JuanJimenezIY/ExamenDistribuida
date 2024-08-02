
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    
    {
        path: '/',
        component: () => import('../pages/PaginaInicio.vue')
    }
,
    {
        path: '/autores',
        component: () => import('../components/Autor.vue')
    }
, {
    path: '/libros',
    component: () => import('../components/Libro.vue')
}

]

const router = createRouter({history: createWebHashHistory(), routes})

// Exporto la configuración:
export default router