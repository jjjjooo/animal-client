import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/main/Index.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/main/Home.vue'),
      },
      {
        path: '/protect-post',
        name: 'Protect',
        component: () =>
          import('@/views/post/MainList.vue'),
      },
      {
        path: '/add-form',
        name: 'AddForm',
        component: () => import('@/views/post/AddForm.vue'),
      },
      {
        path: '/post-detail/:id',
        name: 'PostDetail',
        component: () =>
          import('@/views/post/DetailPost.vue'),
      },
      {
        path: '/auth/my-post',
        component: () => import('@/views/member/MyPost'),
      },

      {
        path: '/auth/my-good',
        component: () =>
          import('@/views/member/MyGoodPost'),
      },
      {
        path: '/chat/room',
        component: () => import('@/views/member/ChatRoom'),
      },
      {
        path: '/search-tag',
        name: 'search',
        component: () =>
          import('@/views/post/SearchPostTag'),
        props: true,
      },
      {
        path: '/chat',
        component: () => import('@/components/Chat'),
      },
      {
        path: '/chat/room',
        component: () => import('@/views/member/ChatRoom'),
      },
    ],
  },
  {
    path: '/members/sign-in',
    component: () => import('@/views/member/SignIn'),
  },
  {
    path: '/members/sign-up',
    component: () => import('@/views/member/SignUp'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
