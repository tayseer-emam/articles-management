import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import Home from './views/Home.vue'
const Login = () => import('@/views/Login.vue');
const Register = () => import('@/views/Register.vue');
const AddArticle = () => import('@/views/AddArticle.vue');
const ArticleView = () => import('@/views/ArticleView.vue');

Vue.use(Router)

const isAuthenticated = (to, from, next) => {
  const { isLoggedIn } = store.getters;
  if(isLoggedIn)
    next();
  else 
    next({ name: 'login' });
}

const isNotAuthenticated = (to, from, next) => {
  const { isLoggedIn } = store.getters;
  if(!isLoggedIn)
    next();
  else 
    next({ name: 'home' });
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: isAuthenticated,
    },
    {
      path: '/add-article',
      name: 'add-article',
      component: AddArticle,
      beforeEnter: isAuthenticated,
    },
    {
      path: '/edit-article/:id',
      name: 'edit-article',
      component: AddArticle,
      beforeEnter: isAuthenticated,
    },
    {
      path: '/article/:id',
      name: 'article-view',
      component: ArticleView,
      beforeEnter: isAuthenticated,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: isNotAuthenticated
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: isNotAuthenticated
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  scrollBehavior() {
    return {x: 0, y: 0}
  }
})
