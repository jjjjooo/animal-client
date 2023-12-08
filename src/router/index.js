import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    component: () => import('@/views/Index.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () =>
          import('@/components/post/MainList.vue'),
      },
      {
        path: '/post-detail/:postId',
        name: 'PostDetail',
        component: () =>
          import('@/components/post/PostDetail.vue'),
      },
    ],
  },
  {
    path: '/members/sign-in',
    component: () => import('@/views/SignIn'),
  },
  {
    path: '/members/sign-up',
    component: () => import('@/views/SignUp'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
