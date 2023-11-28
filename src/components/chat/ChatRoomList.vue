<template>
  <div>
    <div
      v-for="room in chatRoomList"
      :key="room.chatRoomId"
      @click="selectRoom(room.chatRoomId)"
    >
      <div class="msgBox">
        <div class="thumb">
          <img
            :src="`https://source.unsplash.com/random`"
            alt="img"
          />
        </div>
        <div class="chatInfo">
          <div class="userIdAndBeforeTime">
            <p class="userId">{{ room.chatRoomId }}</p>
            <P class="beforeTime">9시간전</P>
          </div>
          <div class="chatIntoTxt">
            {{ shortenMsg(room.lastMessage) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
export default {
  data() {
    return {
      receiver: '',
    };
  },
  methods: {
    selectRoom(roomId) {
      this.$emit('roomSelected', roomId);
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

    connect() {
      const headers = {
        AUTH_TOKEN: localStorage.getItem('ACCESS_TOKEN'),
        ROOM_ID: null,
        LOUNGE: true,
      };

      this.socket = new SockJS(
        `${process.env.VUE_APP_API_URL}/ws`,
      );
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(headers, () => {
        this.chatRoomList.map(cr =>
          this.stompClient.subscribe(
            '/sub/room' + cr.chatRoomId,
            async res => {
              const data = JSON.parse(res.body);
              await this.$store.dispatch(
                `ADD_NEW_CHAT`,
                data,
              );
              await this.$store.dispatch(
                'RESPONSE_MESSAGE',
                data,
              );
              if (data.messageType === 'ENTRY') {
                await this.$store.dispatch(
                  ' READ_ALL_MESSAGE',
                  data,
                );
              }
            },
            headers,
          ),
        );
      });
    },
  },
  computed: {
    chatRoomList() {
      return this.$store.state.chatStore.chatRoomList;
    },
    username() {
      return this.$store.state.memberStore.username;
    },
  },
  created() {
    this.$store.dispatch(
      'REQUEST_GET_CHAT_ROOM_LIST',
      this.username,
    );
    this.connect();
  },

  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.msgBox {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  box-sizing: border-box;
  border-top: 1px solid #f0f0f0;
  padding: 8px 0;
  cursor: pointer;
  width: 100%;
  max-width: 220px;
  position: relative;
  margin: 0 auto;
  .thumb {
    width: 28px;
    height: 28px;
    border-radius: 100px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
    margin-right: 8px;
    z-index: 99;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 0.5px solid #ced2d4;
    box-sizing: border-box;
  }
  .chatInfo {
    display: inline-flex;
    flex-direction: column;
    z-index: 99;
    width: 85%;
    .userIdAndBeforeTime {
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    .userId {
      font-size: 0.8rem;
      color: #424251;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      word-break: break-all;
      -webkit-box-orient: vertical;
      text-align: left;
    }

    .beforeTime {
      font-size: 0.7rem;
      color: #222;
      width: 61px;
    }

    .chatInfoTxt {
      font-size: 0.7rem;
      width: 100%;
      text-overflow: ellipsis;
      white-space: normal;
      line-height: 1.2;
      height: 26px;
      text-align: left;
      overflow: hidden;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: #222;
      margin-bottom: 2px;
      margin-top: 2px;
    }
  }
}

.time-box {
  width: 16vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .last-msg-time {
    text-align: end;
    font-size: 12px;
    color: #737373;
  }
  .is-unread {
    width: 24px;
    height: 24px;
    background-color: #ff0000;
    color: white;
    margin-left: auto;
    line-height: 24px;
    border-radius: 8px;
    text-align: center;
    font-size: 12px;
  }
  .no-unread {
    width: 24px;
    height: 24px;
  }
}
p {
  margin: 0px;
}
</style>
