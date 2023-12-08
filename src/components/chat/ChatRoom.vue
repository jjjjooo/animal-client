<template>
  <div class="chatRoom right">
    <div class="chatRoomWrap" id="chatRoomWrap">
      <div v-for="(msg, index) in messageList" :key="index">
        <template v-if="shouldShowDateBorder(index)">
          <div class="dayInfo">
            <p>{{ formatDateTime(msg.createdAt) }}</p>
          </div>
        </template>
        <chat-message
          :msg="msg"
          :prev="[
            index === 0 ? null : messageList[index - 1],
          ]"
        />
      </div>
    </div>
    <div class="chatInputArea">
      <chat-form @submitMessage="sendMessage"></chat-form>
    </div>
  </div>
</template>

<script>
import ChatForm from '@/components/chat/ChatForm';
import ChatMessage from '@/components/chat/ChatMessage.vue';

export default {
  props: {
    selectedRoomId: Number,
  },
  components: {
    ChatForm,
    ChatMessage,
  },

  computed: {
    messageList() {
      return this.$store.state.chatStore.chatLogList;
    },
    memberId() {
      return this.$store.state.memberStore.memberId;
    },
  },
  methods: {
    shouldShowDateBorder(index) {
      if (index === 0) {
        return true;
      }
      const currentMsgDate = new Date(
        this.messageList[index].createdAt,
      ).toLocaleDateString();
      const prevMsgDate = new Date(
        this.messageList[index - 1].createdAt,
      ).toLocaleDateString();

      return currentMsgDate !== prevMsgDate;
    },
    formatDateTime(dateTime) {
      const localDateTime = new Date(dateTime);
      return localDateTime.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
    scrollToEnd() {
      var chatBody =
        document.getElementById('chatRoomWrap');
      chatBody.scrollTop = chatBody.scrollHeight;
    },
    sendMessage(msg) {
      if (msg) {
        this.$emit('sendMessage', msg);
      }
      return;
    },
  },
  updated() {
    this.scrollToEnd();
  },
};
</script>
