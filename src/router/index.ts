import Vue from 'vue';
// import VueRouter, { RouteConfig } from 'vue-router';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';
import store from '../store'

import TopStories from '../views/TopStories.vue';
import CodeExamples from '../views/CodeExamples.vue';
import MyFavorites from '../views/MyFavorites.vue';

Vue.use(VueRouter);

class RouteMeta {
  title: string;

  constructor({title}: { title: string }) {
    this.title = title;
  }
}

// const routes: RouteConfig[] = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
//   {
//     path: '/',
//     name: 'top-stories',
//     component: TopStories
//   },
//   {
//     path: '/code-examples',
//     name: 'code-examples',
//     component: CodeExamples
//   },
//   {
//     path: '/my-favorites',
//     name: 'my-favorites',
//     component: MyFavorites
//   }
// ];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'top-stories',
      component: TopStories,
      meta: new RouteMeta({ title: 'Top Stories' })
    },
    {
      path: '/code-examples',
      name: 'code-examples',
      component: CodeExamples,
      meta: new RouteMeta({ title: 'Code Examples' })
    },
    {
      path: '/my-favorites',
      name: 'my-favorites',
      component: MyFavorites,
      meta: new RouteMeta({ title: 'Favorites' })
    }
  ]
});

// This callback runs before every route change, including on initial load
router.beforeEach((to, from, next) => {

  const routeMeta = to.meta as RouteMeta;
  store.dispatch('topToolbar/changeTitle', routeMeta.title);
  next();
});

export default router;
