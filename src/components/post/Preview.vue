<template>
  <v-container>
    <v-row justify="center">
      <v-col align="center">
        <v-btn
          small
          class="mt-4"
          color="primary"
          dark
          to="/post-category"
          >더 보기</v-btn
        ></v-col
      >
    </v-row>
    <v-row>
      <v-col align="start">
        <p class="font-weight-black">찾고 있어요</p>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12">
        <v-slide-group class="pa-4" multiple show-arrows>
          <v-slide-item
            v-for="n in missingPostList"
            :key="n.id"
          >
            <v-card class="ma-4">
              <router-link :to="`/post-detail/${n.id}`">
                <v-img
                  class="white--text align-end"
                  :src="`http://localhost:9000/thumbnail/${n.thumbnailId}`"
                  height="200"
                  width="150"
                >
                </v-img>
              </router-link>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col align="start">
        <p class="font-weight-black">보호 중이에요</p>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12">
        <v-slide-group class="pa-4" multiple show-arrows>
          <v-slide-item
            v-for="n in protectPostList"
            :key="n.id"
          >
            <v-card class="ma-4">
              <router-link :to="`/post-detail/${n.id}`">
                <v-img
                  class="white--text align-end"
                  :src="`http://localhost:9000/thumbnail/${n.thumbnailId}`"
                  height="200"
                  width="150"
                >
                </v-img>
              </router-link>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    category: 'PROTECT',
    categories: [
      {
        text: '보호 중',
        filter: 'PROTECT',
      },
      {
        text: '찾는 중',
        filter: 'MISSING',
      },
    ],
  }),

  computed: {
    missingPostList() {
      return this.$store.state.postStore.missingPostList;
    },
    protectPostList() {
      return this.$store.state.postStore.protectPostList;
    },
  },
  methods: {
    async select(category) {
      this.category = category.filter;
    },
  },
  created() {
    const protectForm = {
      page: 0,
      postType: 'PROTECT',
    };
    this.$store.dispatch(
      'REQUEST_GET_PROTECT_POST_LIST',
      protectForm,
    );
    const missingForm = {
      page: 0,
      postType: 'MISSING',
    };
    this.$store.dispatch(
      'REQUEST_GET_MISSING_POST_LIST',
      missingForm,
    );
  },
};
</script>
