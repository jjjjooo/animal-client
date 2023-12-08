<template>
  <div v-if="!getShowChatStatus" class="chattingWrap2">
    <v-icon large @click="openChatSection">{{
      'mdi-wechat'
    }}</v-icon>
  </div>
  <div v-else class="chattingWrap">
    <div class="chattingContentWrap">
      <div class="chattingHeader">
        <div class="left">
          <p>대화 목록</p>
        </div>

        <div class="right">
          <div class="thumbWrap">
            <div class="thumb">
              <img />
            </div>
          </div>

          <div class="postTitleAndTimeInfo">
            <p class="postTitle">
              {{ this.selectedRoomDetail }}
            </p>
            <div class="alamOnBtn"></div>
            <div class="moreBtn"></div>
          </div>
        </div>
        <div class="foldChatBtn" @click="closeChat">
          닫기
        </div>
      </div>

      <div class="chattingSection">
        <div class="list left">
          <chat-room-list
            @roomSelected="handleRoomSelected"
          />
        </div>

        <chat-room
          :selectedRoomId="selectedRoomId"
          @sendMessage="sendMessage"
          v-if="selectedRoomId"
        />
      </div>
    </div>
  </div>
</template>
<script>
import ChatRoomList from '@/components/chat/ChatRoomList.vue';
import ChatRoom from '@/components/chat/ChatRoom.vue';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

export default {
  data() {
    return {
      isChatShow: false,
      selectedRoomId: null,
      selectedRoomInfo: null,
      stompClient: null,
    };
  },
  components: {
    ChatRoom,
    ChatRoomList,
  },

  methods: {
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
                  'READ_ALL_MESSAGE',
                  data,
                );
              }
            },
            headers,
          ),
        );
      });
    },
    sendMessage(msg) {
      this.stompClient.send(
        '/pub/msg',
        JSON.stringify({
          writerId: this.memberId,
          roomId: this.selectedRoomId,
          message: msg,
        }),
      );
    },

    sendEntryMessage() {
      this.stompClient.send(
        '/pub/entry',
        JSON.stringify({
          writerId: this.memberId,
          roomId: this.selectedRoomId,
        }),
      );
    },

    sendExitMessage() {
      this.stompClient.send(
        '/pub/exit',
        JSON.stringify({
          writerId: this.memberId,
          roomId: this.selectedRoomId || 0,
        }),
      );
    },

    openChatSection() {
      this.$store.dispatch('OPEN_CHAT_DIALOG', true);
      this.connect();
    },
    closeChat() {
      this.$store.dispatch('CLOSE_CHAT_DIALOG', false);
      this.sendExitMessage();
      this.stompClient.disconnect();
    },

    handleRoomSelected(room) {
      if (this.selectedRoomId != null) {
        console.log('이전방 나가기');
        this.sendExitMessage();
      }
      if (room != null) {
        console.log('들어가기');
        this.selectedRoomId = room.chatRoomId;
        this.selectedRoomInfo = room;
        this.$store.dispatch(
          'ADD_SELECTED_ROOM_DEATIL',
          room,
        );
        this.sendEntryMessage();
        this.getChatLogs();
      }
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
  computed: {
    chatRoomList() {
      return this.$store.state.chatStore.chatRoomList;
    },
    getShowChatStatus() {
      return this.$store.getters.getShowChatStatus;
    },
    memberId() {
      return this.$store.state.memberStore.memberId;
    },
    selectedRoomDetail() {
      return this.$store.state.chatStore.selectedRoomDetail;
    },
  },

  destroyed() {
    this.sendExitMessage;
    this.$stomp.disconnet();
  },
};
</script>

<style lang="scss">
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
    .chattingHeader {
      display: inline-flex;
      flex-direction: row;
      position: relative;
      .foldChatBtn {
        position: absolute;
        left: 12px;
        top: 16px;
        background-color: #fff;

        width: 24px;
        height: 24px;
        background-repeat: no-repeat;
        background-size: 24px;
        background-position: 50%;
        cursor: pointer;
        box-sizing: border-box;
      }

      .right {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
        padding: 5px 16px 5px 20px;
        width: 100%;
        position: relative;
        border-bottom: 1px solid #f0f0f0;
        .postTitleAndTimeInfo {
          display: inline-flex;
          flex-direction: column;
          margin-left: 12px;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
          -webkit-line-clamp: 1;
          word-break: break-all;
        }
        .postTitle {
          font-size: 0.8125rem;
          color: #424251;
          cursor: pointer;
          position: relative;
          margin-left: 2px;
        }
      }
    }
    .left {
      max-width: 250px;
      width: 100%;
      border-right: 1px solid #f0f0f0;
      box-sizing: border-box;
      padding: 0 12px;
      p {
        padding: 18px 0 7px;
        font-weight: 700;
        font-size: 1rem;
      }
    }
    .chattingSection {
      display: inline-flex;
      flex-direction: row;
      height: 100%;
      overflow-y: hidden;
      .chatInputArea {
        width: 100%;
        display: flex;
        box-sizing: border-box;
        align-items: flex-end;
        background-color: #fff;
        padding: 0 24px;
        align-items: center;
        box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.12);
        z-index: 1;
      }
      .chatRoom {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
        .right {
          position: relative;
          width: 100%;
          display: none;
        }
        .chatRoomWrap {
          position: relative;
          overflow-x: hidden;
          overflow-y: auto;
          display: block;
          width: 100%;

          box-sizing: border-box;
          padding: 5px 22px;
          margin-bottom: 5px;
          flex: 1 1;
          &::-webkit-scrollbar {
            width: 0;
            background: transparent;
          }
          .my {
            display: flex;
            flex-direction: row-reverse;
            margin-bottom: 8px;
            flex: 1 0 auto;
            position: relative;

            .timeWrap {
              position: absolute;
              bottom: 0;
              left: -55px;
              font-size: 0.65rem;
              color: #222;
              display: inline-flex;
              flex-direction: column;
              align-items: flex-end;
              .time {
                color: #b1b1b1;
                font-size: 11px;
              }
            }

            .chatTxt {
              box-sizing: border-box;
              padding: 9px 18px;
              color: #fff;
              font-size: 0.8125rem;
              background-color: #ea6560;
              margin-right: 10px;
              border-radius: 4px;
              max-width: 206px;
              width: auto;
              position: relative;
              word-wrap: break-word;
              text-align: left !important;
            }
          }
          .dayInfo {
            width: 100%;
            text-align: center;
            position: relative;
            padding-top: 5px;
            padding-bottom: 5px;
            p {
              font-size: 0.8125rem;
              color: #686868;
              width: 100%;
              text-align: center;
            }
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

            .userIdChatTxt {
              display: inline-flex;
              flex-direction: column;

              .timeWrap {
                position: absolute;
                bottom: 0;
                right: 0;
                font-size: 0.65rem;
                color: #222;
                display: inline-flex;
                flex-direction: column;
                align-items: flex-end;
              }

              .userId {
                font-size: 0.8rem;
                color: #222;
                margin-left: 10px;
                text-align: left;
                margin-top: 5px;
                margin-bottom: 5px;
              }
              .chatTxt {
                box-sizing: border-box;
                padding: 9px 18px;
                font-size: 0.8125rem;
                background-color: #f1f1f3;
                position: relative;
                margin-left: 10px;
                border-radius: 4px;
                max-width: 205px;
                text-align: left;
                word-wrap: break-word;
                margin-bottom: 5px;
                .time {
                  position: absolute;
                  font-size: 0.65rem;
                  color: #b1b1b1;
                  bottom: 0;
                  right: -55px;
                }
                .chatTxtContents {
                  display: block;
                }
              }
            }
          }
        }
      }

      .list {
        box-sizing: border-box;
        padding: 0 12px;
        overflow: auto;
        position: relative;
        ul {
          width: 100%;
          li {
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
            .chatInfo {
              display: inline-flex;
              flex-direction: column;
              z-index: 99;
              width: 85%;

              .chatInfoTxt {
                font-size: 1rem;
                width: 100%;
                text-overflow: ellipsis;
                white-space: normal;
                line-height: 1.2;

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
              .userIdAndBeforeTime {
                display: inline-flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                .beforeTime {
                  font-size: 0.7rem;
                  color: #222;
                  width: 61px;
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
                .right {
                  display: inline-flex;
                  flex-direction: row;
                  align-items: center;
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
          }
        }
      }
    }
  }
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
</style>
