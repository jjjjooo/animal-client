<template>
  <v-app app>
    <toolbar />
    <jumbotron />
    <chat-wrap />
    <router-view />
  </v-app>
</template>

<script>
export default {
  components: {
    Toolbar: () => import('@/components/core/AppBar'),
    Jumbotron: () => import('@/components/core/Jumbotron'),
    ChatWrap: () => import('@/components/chat/Chat.vue'),
  },
};
</script>
