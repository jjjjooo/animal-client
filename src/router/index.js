import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    name: 'INDEX',
    component: () => import('@/views/Index.vue'),
    children: [
      {
        path: '/',
        name: 'HomePreview',
        component: () =>
          import('@/components/post/Preview.vue'),
      },
      {
        path: '/add-form',
        name: 'AddForm',
        component: () =>
          import('@/components/post/AddForm.vue'),
      },
      {
        path: '/post-category',
        name: 'Category',
        component: () =>
          import('@/components/post/MainList.vue'),
      },
      {
        path: '/post-detail/:postId',
        name: 'PostDetail',
        component: () =>
          import('@/components/post/DetailPost.vue'),
      },
      // {
      //   path: '/auth/my-post',
      //   component: () => import('@/views/member/MyPost'),
      // },

      // {
      //   path: '/auth/my-good',
      //   component: () =>
      //     import('@/views/member/MyGoodPost'),
      // },
      // {
      //   path: '/chat/room',
      //   component: () => import('@/views/member/ChatRoom'),
      // },
      // {
      //   path: '/search-tag',
      //   name: 'search',
      //   component: () =>
      //     import('@/views/post/SearchPostTag'),
      //   props: true,
      // },
      // {
      //   path: '/chat',
      //   component: () => import('@/components/Chat'),
      // },
      // {
      //   path: '/chat/room',
      //   component: () => import('@/views/member/ChatRoom'),
      // },
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
