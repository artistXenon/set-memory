import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Case from '../views/Case.vue'
import Sets from '../components/Sets.vue'
import Tests from '../components/Tests.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cases/:caseId',
    name: 'Case',
    component: Case,
    children: [
      { path: '', component: Sets },
      { path: 'test/:testId', component: Tests },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
