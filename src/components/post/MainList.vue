<template>
  <v-app>
    <v-container>
      <v-row justify="center" no-gutters class="mt-6">
        <v-col cols="3">
          <v-text-field
            label="태그로 검색하기"
            solo
            v-model="search"
            v-on:keydown.enter.prevent="searchTag(search)"
            @click:append-outer="searchTag(search)"
            append-outer-icon="mdi-magnify"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-tabs
            background-color="transparent"
            centered
            class="mb-5"
            show-arrows
          >
            <v-tab
              v-for="(category, i) in categories"
              :key="i"
              @click="selectFilter(category)"
            >
              <span v-text="category.text" />
            </v-tab>
          </v-tabs>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="(list, index) in postList"
          :key="index"
          cols="3"
          sm="3"
          align="center"
          ><v-tabs-items>
            <v-card max-width="400" class="auto"
              ><router-link
                :to="`/post-detail/${list.postId}`"
              >
                <v-img
                  :src="`https://source.unsplash.com/random`"
                  height="200px"
                  width="auto"
                  class="white--text align-end"
                ></v-img
              ></router-link>
              <div v-if="list.postType === 'PROTECT'">
                <v-card-text class="font-weight-bold">
                  [보호]{{ list.title }}
                </v-card-text>
              </div>
              <div v-if="list.postType === 'MISSING'">
                <v-card-text class="font-weight-bold">
                  [분실]{{ list.title }}
                </v-card-text>
              </div>

              <v-card-text>
                <v-chip-group
                  mandatory
                  show-arrows
                  active-class="primary--text"
                >
                  <v-chip
                    small
                    outlined
                    v-for="tag in list.tagResponseList"
                    :key="tag.id"
                    @click="searchTag(tag.tagName)"
                  >
                    {{ tag.tagName }}
                  </v-chip>
                </v-chip-group>
              </v-card-text>
            </v-card>
          </v-tabs-items>
        </v-col>
      </v-row>
      <v-row justify="center">
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="totalPage"
            circle
            outlined
            total-visible="16"
            @input="fecthPostList(page)"
          ></v-pagination>
        </div>
      </v-row>
      <v-row justify="center">
        <v-btn
          color="primary"
          class="mt-2"
          @click="openForm()"
          outlined
          >글쓰기</v-btn
        >
      </v-row>
      <v-dialog
        max-width="1000"
        v-model="openPostForm"
        persistent
        @click:outside="closeModal"
      >
        <post-form :closeModal="closeModal" />
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script>
export default {
  components: {
    postForm: () => import('@/components/post/PostForm'),
  },

  data() {
    return {
      openPostForm: false,
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
      page: 1,
    };
  },
  watch: {
    category: async function (category) {
      if (category === 'PROTECT') {
        const form = {
          page: 0,
          postType: 'PROTECT',
        };
        this.$store.dispatch(
          'REQUEST_GET_SEARCH_POST',
          form,
        );
      }
      if (category === 'MISSING') {
        const form = {
          page: 0,
          postType: 'MISSING',
        };
        this.$store.dispatch(
          'REQUEST_GET_SEARCH_POST',
          form,
        );
      }
    },
  },

  methods: {
    openForm() {
      if (this.isLogin) {
        this.openPostForm = true;
      } else {
        console.log('로그인이 필요합니다');
      }
    },

    closeModal() {
      this.openPostForm = false;
    },

    searchTag(tag, id) {
      this.$router.push({
        name: 'search',
        params: { tag: tag, id: id },
      });
    },

    selectFilter(category) {
      this.category = category.filter;
    },

    fecthPostList(page) {
      this.$store.commit('SET_POST_CURRENT_PAGE', page);
      let form = {
        page: this.currentPage - 1,
        postType: this.category,
      };
      this.$store.dispatch(
        'REQUEST_GET_ALL_POST_PAGE',
        form,
      );
    },
  },

  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
    totalPage() {
      return this.$store.state.postStore.postTotalPage;
    },
    currentPage() {
      return this.$store.state.postStore.postCurrentPage;
    },
    postList() {
      return this.$store.state.postStore.searchList;
    },
  },

  created() {
    this.page = this.currentPage;
  },

  mounted() {
    const form = {
      page: 0,
      postType: 'PROTECT',
    };
    this.$store.dispatch('REQUEST_GET_SEARCH_POST', form);
  },
};
</script>

<style></style>
