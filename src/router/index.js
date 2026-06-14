import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import BookDetail from '../components/BookDetail.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      title: 'Міла Іванцова | Сучасна українська письменниця',
      description: 'Офіційний сайт Міли Іванцової. 34 книги сучасної прози, романи, оповідання. Київська авторка терапевтичної прози.'
    }
  },
  {
    path: '/book/:id',
    name: 'book-detail',
    component: BookDetail,
    meta: {
      titleTemplate: (book) => `${book.title} | Міла Іванцова`
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

// Dynamic meta tags per route
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router