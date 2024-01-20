import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import Login from '../components/login.vue';
import Quiz from '../components/quiz.vue';
import CreateQuiz from '../components/createquiz.vue';
import Audio from '../components/audio.vue';
import Manage from '../components/manage.vue';
import Costum_quiz from '../components/costum_quiz.vue';
import Contact from '../components/contact.vue';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/audio',
      name: 'audio',
      component: Audio
    },
    {
      path: '/manage',
      name: 'manage',
      component: Manage
    },
    {
      path: '/logout',
      name: 'logout',
      component: Login
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: Quiz
    },
    {
      path: '/createquiz',
      name: 'createquiz',
      component: CreateQuiz
    },
    {
      path: '/costumize',
      name: 'costumize',
      component: Costum_quiz,
    },
    {
    path: '/contact',
    name: 'contact',
    component: Contact,
    },
  ],


})

export default router;
