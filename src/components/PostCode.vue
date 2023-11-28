<template>
  <section class="test">
    <div>
      <v-text-field
        text
        label="주소"
        v-model="address"
        prepend-icon="mdi-email-outline"
        v-on:click="search"
        :disabled="!updateFlag"
      />
    </div>
    <v-dialog v-model="postOpen">
      <div class="post-box">
        <template>
          <VueDaumPostcode @complete="oncomplete" />
        </template>
      </div>
    </v-dialog>
  </section>
</template>
<script>
import { VueDaumPostcode } from 'vue-daum-postcode';

export default {
  props: {
    updateFlag: {
      type: Boolean,
    },
    rAddress: {
      type: String,
    },
  },

  components: {
    VueDaumPostcode,
  },
  data() {
    return {
      address: this.rAddress,
      postOpen: false,
    };
  },

  methods: {
    search: function () {
      this.postOpen = true;
    },
    oncomplete: function (result) {
      if (result.userSelectedType === 'R') {
        this.address = result.roadAddress;
      } else {
        this.address = result.jibunAddress;
      }
      this.postOpen = false;
      this.$emit('address', result);
    },
  },
};
</script>
