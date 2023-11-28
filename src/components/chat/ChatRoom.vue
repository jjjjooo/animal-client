<template>
  <div class="chat" id="chat">
    <chat-list :messageList="messageList"></chat-list>
    <chat-form @submitMessage="sendMessage"></chat-form>
  </div>
</template>

<script>
import ChatList from '@/components/chat/ChatList';
import ChatForm from '@/components/chat/ChatForm';

export default {
  props: {
    selectedRoomId: Number,
  },
  components: {
    ChatList,
    ChatForm,
  },
  computed: {
    messageList() {
      return this.$store.state.chatStore.chatLogList;
    },
    userId() {
      return this.$store.state.memberStore.userId;
    },
  },
  methods: {
    sendMessage(msg) {
      this.$stomp.send(
        '/pub/msg',
        JSON.stringify({
          writerId: this.userId,
          roomId: this.selectedRoomId,
          message: msg,
        }),
      );
    },
  },
};
</script>

<style scoped>
.chat {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  display: block;
  width: 100%;
  height: 500;
  box-sizing: border-box;
  padding: 5px 22px;
  margin-bottom: 5px;
  flex: 1 1;
}
</style>
