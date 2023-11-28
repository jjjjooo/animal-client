<template>
  <ValidationObserver ref="observer" v-slot="{ invalid }">
    <v-container>
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="타입"
                rules="required-select"
              >
                <v-select
                  :error-messages="errors"
                  v-model="type"
                  :items="items"
                  hint="게시글 타입을 선택해주세요"
                  label="Type"
                  outlined
                ></v-select>
              </ValidationProvider>
            </v-col>
            <v-col cols="8">
              <ValidationProvider
                v-slot="{ errors }"
                name="제목"
                rules="required|max:30"
              >
                <v-text-field
                  :error-messages="errors"
                  v-model="title"
                  label="제목"
                  hint="제목은 30자 미만으로 적어주세요"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="성별"
                rules="required-select"
              >
                <v-select
                  v-model="gender"
                  :error-messages="errors"
                  :items="['남', '여', '기타']"
                  label="성별"
                  outlined
                  hint="성별을 선택해주세요"
                ></v-select>
              </ValidationProvider>
            </v-col>

            <v-col cols="8">
              <post-code
                :updateFlag="updateFlag"
                @address="addrSelected"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ValidationProvider
                v-slot="{ errors }"
                name="특징"
                rules="required:max:200"
              >
                <v-textarea
                  v-model="feature"
                  auto-grow
                  rows="5"
                  hint="200자 미만으로 특징을 적어주세요"
                  label="특징"
                  :error-messages="errors"
                ></v-textarea>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-file-input
                v-model="images"
                counter
                multiple
                truncate-length="15"
              ></v-file-input>
            </v-col>
            <v-col>
              <v-combobox
                v-model="tagNameList"
                :items="chips"
                chips
                clearable
                label="Your favorite hobbies"
                multiple
                solo
              >
                <template
                  v-slot:selection="{
                    attrs,
                    item,
                    select,
                    selected,
                  }"
                >
                  <v-chip
                    v-bind="attrs"
                    :input-value="selected"
                    close
                    @click="select"
                    @click:close="removeTag(item)"
                  >
                    <strong>{{ item }}</strong
                    >&nbsp;
                  </v-chip>
                </template>
              </v-combobox>
            </v-col>
          </v-row>
          <v-row>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="createPost"
              :disabled="invalid"
            >
              Save
            </v-btn>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </ValidationObserver>
</template>

<script>
import { createPost } from '@/api/post.js';
export default {
  components: {
    PostCode: () => import('@/components/PostCode.vue'),
  },
  data: () => ({
    title: '',
    feature: '',
    postType: '',
    items: [
      { text: '보호', value: 'PROTECT' },
      { text: '분실', value: 'MISSING' },
    ],
    tagNameList: [],
    chips: ['태그를', '추가해보세요'],
    gender: '',
    address: '',
    updateFlag: true,
  }),
  computed: {
    userarea() {
      return this.$store.state.memberStore.address;
    },
  },
  methods: {
    addrSelected(data) {
      this.address = data;
    },
    removeTag(item) {
      this.chips = this.chips.filter(chip => chip !== item);
    },
    async createPost() {
      const postData = new FormData();
      let saveRequest = {
        title: this.title,
        feature: this.feature,
        postType: this.postType,
        images: this.images,
        tagNameList: this.tagNameList,
        gender: this.gender,
        address: this.address,
      };

      postData.append(
        'saveRequest',
        new Blob([JSON.stringify(saveRequest)], {
          type: 'application/json',
        }),
      );

      this.images.forEach(image =>
        postData.append('images', image),
      );
      await createPost(postData);
      this.$router.push('/protect-post');
    },
  },
};
</script>
