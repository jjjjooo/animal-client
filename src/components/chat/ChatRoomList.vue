<template>
  <ul>
    <li
      v-for="room in chatRoomList"
      :key="room.chatRoomId"
      @click="selectRoom(room)"
    >
      <div class="thumb">
        <img />
      </div>
      <div class="chatInfo">
        <div class="userIdAndBeforeTime">
          <div class="right">
            <span class="userId">{{ room.postTitle }}</span>
          </div>
          <span class="beforeTime">{{
            formatDate(room.modifiedAt)
          }}</span>
        </div>
        <div class="chatInfoTxt">
          {{ room.lastMessage }}
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
export default {
  data() {
    return {
      receiver: '',
    };
  },
  methods: {
    selectRoom(room) {
      this.$emit('roomSelected', room);
    },

    shortenMsg(msg) {
      if (msg == null) {
        return '';
      }
      if (msg.length > 12) {
        return msg.slice(0, 12) + '...';
      }
      return msg;
    },

    formatDate(createdAt) {
      dayjs.locale('ko'); // 한국어로 표시하려면 필요
      const now = dayjs();
      const messageDate = dayjs(createdAt);

      const diffInMinutes = now.diff(messageDate, 'minute');
      const diffInDays = now.diff(messageDate, 'day');

      if (diffInMinutes < 60) {
        return `${diffInMinutes}분 전`;
      } else if (diffInDays < 7) {
        return `${diffInDays}일 전`;
      } else {
        return messageDate.format('YYYY-MM-DD HH:mm:ss');
      }
    },
  },

  computed: {
    chatRoomList() {
      return this.$store.state.chatStore.chatRoomList;
    },
    memberId() {
      return this.$store.state.memberStore.memberId;
    },
  },
  created() {
    const memberId = this.memberId;
    this.$store.dispatch(
      'REQUEST_GET_CHAT_ROOM_LIST',
      memberId,
    );
  },
};
</script>
