<template>
  <div
    v-if="msg.writerId === this.memberId"
    class="my chatTxt"
  >
    <div class="chatTxt">
      <a style="color: rgb(255, 255, 255)">{{
        msg.message
      }}</a>

      <div class="timeWrap">
        <span v-if="showTime" class="time">{{
          formatDate(msg.createdAt)
        }}</span>
      </div>
    </div>
  </div>
  <div v-else class="opponent">
    <div class="userIdChatTxt">
      <span class="userId"> 상대방 </span>
      <div class="chatTxt">
        <a style="color: rgb(51, 51, 51)">{{
          msg.message
        }}</a>
        <div class="timeWrap">
          <span v-if="showTime" class="time">{{
            formatDate(msg.createdAt)
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['msg', 'prev'],
  data() {
    return {
      showTime: true,
      userId: null,
      isSame: false,
    };
  },
  methods: {
    formatDateBoundary(date) {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      };
      return date.toLocaleDateString(undefined, options);
    },

    formatDate(createdAt) {
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
      } else if (prev[0]?.memberId == msg?.memberId) {
        return true;
      } else {
        return false;
      }
    },
  },

  created() {
    this.memberId = this.$store.state.memberStore.memberId;
  },
};
</script>
