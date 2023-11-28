<template>
  <div class="chatBody" id="chatBody">
    <chat-message
      v-for="(msg, index) in messageList"
      :key="index"
      :msg="msg"
      :prev="[index == 0 ? null : messageList[index - 1]]"
    >
    </chat-message>
  </div>
</template>

<script>
import ChatMessage from '@/components/chat/ChatMessage';
export default {
  components: {
    ChatMessage,
  },
  props: ['messageList'],

  methods: {
    scrollToEnd() {
      const div = document.getElementById('chatBody');

      if (div) {
        console.log(div);
        div.scrollTop = div.scrollHeight;
      }
    },
  },

  updated() {
    this.scrollToEnd();
  },
};
</script>

<style scoped>
.chatBody {
  padding: 2rem;
  scroll-behavior: smooth;
  overflow-y: auto;
  max-height: 450px;
}

.chatBody::-webkit-scrollbar {
  display: none;
}
</style>
