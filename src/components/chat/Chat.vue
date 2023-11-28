<template>
  <div v-if="!isChatShow" class="chattingWrap2">
    <v-icon large @click="openDiagramEditor">{{
      'mdi-wechat'
    }}</v-icon>
  </div>
  <div v-else class="chattingWrap">
    <div class="chattingContentWrap">
      <div class="chattingHeader">
        <div class="left">
          <p
            style="
              padding: 18px 0 7px;
              font-weight: 700;
              font-size: 1rem;
            "
          >
            대화 목록
          </p>
        </div>
        <div class="right"></div>
      </div>
      <div class="chattingSection">
        <div class="list left">
          <chat-room-list
            @roomSelected="handleRoomSelected"
          />
        </div>
        <div class="list right">
          <chat-room
            :selectedRoomId="selectedRoomId"
            v-if="selectedRoomId"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChatRoomList from '@/components/chat/ChatRoomList.vue';
import ChatRoom from '@/components/chat/ChatRoom.vue';

export default {
  data() {
    return {
      isChatShow: false,
      selectedRoomId: null,
    };
  },
  components: {
    ChatRoom,
    ChatRoomList,
  },

  methods: {
    openDiagramEditor() {
      this.isChatShow = true;
    },
    handleRoomSelected(roomId) {
      this.selectedRoomId = roomId;
      this.getChatLogs();
    },

    getChatLogs() {
      let getLogData = {
        roomId: this.selectedRoomId,
      };
      this.$store.dispatch(
        'REQUEST_GET_CHAT_LOG_LIST',
        getLogData,
      );
    },
  },
};
</script>

<style scoped>
.chattingWrap {
  right: -360px;
  max-width: 720px;
  bottom: 0;
  position: fixed;
  width: 100%;
  margin: 0 auto;
  z-index: 6999;
  transform: translateX(-50%);
  display: block;
  text-align: right;
}
.chattingContentWrap {
  max-width: 720px;
  height: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
  background-color: #fff;
  margin-left: auto;
  border-radius: 4px;
}
.chattingHeader {
  display: inline-flex;
  flex-direction: row;
  position: relative;
}
.chattingWrap2 {
  right: -100px;
  top: 350px;
  max-width: 300px;
  position: fixed;
  width: 100%;
  margin: 0 auto;
  z-index: 6999;
  transform: translateX(-50%);
  display: block;
  text-align: right;
}

.chattingSection {
  display: inline-flex;
  flex-direction: row;
  height: 100%;
  overflow: hidden;
}
.left {
  max-width: 250px;
  width: 100%;
  border-right: 1px solid #f0f0f0;
  box-sizing: border-box;
  padding: 0 12px;
}
.right {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.list {
  box-sizing: border-box;
  padding: 0 12px;
  overflow: auto;
  position: relative;
}
</style>
