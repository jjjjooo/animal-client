<template>
  <div id="chatDiv">
    <div
      v-if="msg.writerId === this.userId"
      class="my-msg-created-and-isread"
      :class="[isSame ? '' : 'chat__first']"
    >
      <div
        v-if="msg.checked != true"
        class="my-msg-isread"
      />
      <div
        v-if="msg.createdAt != ''"
        class="my-msg-created"
      >
        {{ formatDate(msg.createdAt) }}
      </div>
      <div class="my-msg">
        {{ msg.message }}
      </div>
    </div>
    <div
      v-else
      class="opponent"
      :class="[isSame ? '' : 'chat__first']"
    >
      <div>
        <div
          v-if="msg.checked != true"
          class="my-msg-isread"
        />
        <p class="chatTxt">{{ msg.message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['msg', 'prev'],
  data() {
    return {
      userId: null,
      isSame: false,
    };
  },
  methods: {
    formatDate(createdAt) {
      // JavaScript Date 객체를 생성하여 필요한 형식으로 포맷팅
      const date = new Date(createdAt);
      const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      };
      return date.toLocaleString('ko-KR', options);
    },
    isSamePerson(msg, prev) {
      if (prev === null) {
        return false;
      } else if (prev[0]?.userId == msg?.userId) {
        return true;
      } else {
        return false;
      }
    },
  },

  created() {
    this.userId = this.$store.state.memberStore.userId;
  },
};
</script>

<style scoped>
.chatTxt {
  box-sizing: border-box;
  padding: 9px 18px;
  font-size: 0.8125rem;
  background-color: #f1f1f3;
  position: relative;
  margin-left: px;
  border-radius: 4px;
  max-width: 205px;
  text-align: left;
  word-wrap: break-word;
  margin-bottom: 5px;
}
.opponent {
  display: flex;
  flex-direction: row;
  width: 100%;
  position: relative;
  justify-content: flex-start;
  margin-bottom: 8px;
  flex: 1 0 auto;
  margin-top: 10px;
}
.my-msg-isread {
  width: 8px;
  height: 8px;
  background-color: #ff6c03;
  border-radius: 100%;
  margin-right: 8px;
  margin-bottom: 4px;
}
.my-msg-created {
  margin-right: 8px;
  color: #c4c4c4;
  font-size: 12px;
}
.my-msg {
  word-break: break-all;
  word-wrap: normal;
  max-width: 230px;
  padding: 10px 20px;
  font-size: 14px;
  color: white;
  background-color: #00b286;
  border-radius: 8px;
}
.my-msg-created-and-isread {
  justify-content: flex-end;
  margin-top: 16px;
  align-items: flex-end;
  display: flex;
}
</style>
