<template>
  <section class="postInfoSection">
    <div class="topBtnWrap" v-if="checkOwner">
      <button
        class="pinkBtn"
        @click="updatePost(postDetail.postId)"
      >
        수정하기
      </button>
      <button
        class="blackBtn"
        @click="deletePost(postDetail.postId)"
      >
        삭제하기
      </button>
    </div>
    <div class="topBtnWrap">
      <v-btn
        rounded
        style="margin-right: 10px"
        :disabled="!isLogin"
        @click="pushGood(postDetail.postId)"
      >
        <v-icon :disabled="!good">mdi-heart</v-icon>
      </v-btn>

      <v-btn rounded @click="openChat" :disabled="!isLogin">
        <v-icon right> mdi-chat </v-icon>
      </v-btn>
    </div>
    <v-divider />
    <div class="summaryInfo">
      <div class="summaryInfoWrap">
        <ul>
          <li
            v-for="(item, index) in userCharacterList"
            :key="index"
            class="postCharacter"
          >
            <span>{{ item.label }}</span>
            <h3 class="gray">{{ item.value }}</h3>
          </li>
          <li class="tagWordWrap">
            <span>태 그</span>
            <div
              class="keyWordTag"
              v-for="tag in postDetail.tagResponseList"
              :key="tag.id"
            >
              <span>#{{ tag.tagName }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="postConponents">
        <div
          style="
            border: 0px;
            width: 100%;
            hight: 100%;
            font-size: 14px;
            color: rgb(102, 102, 102);
            margin-bottom: 20px;
            padding: 20px;
            background-color: rgb(249, 249, 249);
            font-weight: normal;
            box-sizing: border-box;
          "
        >
          <div
            style="
              font-size: 15px;
              min-height: 21px;
              margin-bottom: 50px;
            "
          >
            특징
            <p
              style="
                font-size: 14px;
                min-height: 21px;
                margin-top: 10px;
                color: rgb(51, 51, 51);
              "
            >
              기사는 중세부터 유럽에서 기마로 싸우는
              전사에게 주는 명예 칭호 및 그로부터 파생한
              계급을 가리킨다. 기사는 분류상 귀족이지만 귀족
              중에는 최하급 귀족에 속하며 준귀족적인 성격을
              띤다. 우리가 흔히 부르는 귀족은 기사보다
              상위의 귀족을 의미한다.
            </p>
          </div>
        </div>
        <div class="screenShotBooth"></div>
        <div class="screenShotBox">
          <div
            class="screenShotWrap"
            v-for="index in 4"
            :key="index"
          >
            <img src="https://source.unsplash.com/random" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      userCharacterList: [
        { label: '제 목', value: 'UI/UX디자인' },
        { label: '작성자', value: '회원1번' },
        { label: '작성일', value: '2023/12/21' },
        { label: '주 소', value: '판교역 123번지' },
        { label: '성 별', value: '수컷' },
      ],
      good: false,
      images: [],
    };
  },
  methods: {
    checkOwner() {
      if (this.memberId !== this.postDetail.creatorId) {
        return false;
      }
      return true;
    },
    searchTag(tag, id) {
      this.$router.push({
        name: 'search',
        params: { tag: tag, id: id },
      });
    },
    addrSelected(data) {
      this.updateDetail.address = data;
    },

    removeTag(item) {
      this.chips = this.chips.filter(chip => chip !== item);
    },

    openChat() {
      const checkChatRequest = {
        postId: this.postDetail.postId,
        postCreatorId: this.postDetail.creatorId,
      };
      this.$store
        .dispatch('REQUEST_ADD_CHATROOM', checkChatRequest)
        .then();
    },

    pushGood(postId) {
      this.$store.dispatch('REQUEST_PUSH_GOOD', postId);
    },

    deletePost() {
      if (this.isLogin()) {
        this.$store.dispatch(
          'REQUEST_DELETE_POST',
          this.postDetail.postId,
        );
      }
    },

    updatePost() {
      const postData = new FormData();
      let updateRequest = {
        // title: this.updateDetail.title,
        // feature: this.updateDetail.feature,
        // postType: this.updateDetail.postType,
        // gender: this.updateDetail.gender,
        // address: this.updateDetail.address,
        // newTagName: this.chips,
        // removeTag: this.rChips,
      };

      postData.append(
        'updateRequest',
        new Blob([JSON.stringify(updateRequest)], {
          type: 'application/json',
        }),
      );

      this.images.forEach(image =>
        postData.append('images', image),
      );
      this.$store.dispatch('REQUEST_UPDATE_POST', postData);
    },
  },
  computed: {
    postGood() {
      return this.$store.state.postStore.postGood;
    },
    postDetail() {
      return this.$store.state.postStore.postDetail;
    },
    memberId() {
      return this.$store.state.memeberStore.memberId;
    },
    isLogin() {
      return this.$store.getters.isLogin;
    },
    getShowChatStatus() {
      return this.$store.getters.getShowChatStatus;
    },
  },
  created() {
    this.$store.dispatch(
      'REQUEST_GET_POST_DETAIL',
      this.$route.params.postId,
    );
  },
};
</script>

<style lang="scss">
.postInfoSection {
  width: 100%;
  margin: 0 auto;
  transition: all 0.2s;
  .postComponents {
    margin-bottom: 50px;
    position: relative;
  }
  .screenShotBooth {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  .screenShotBox {
    display: flex;
    flex-direction: row;
    gap: 16px;
    overflow-x: auto;
    white-space: nowrap;
    flex-shrink: 0;
    margin-bottom: 30px;
  }
  .screenShotWrap {
    width: 412px;
    height: 290px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    border: 1px solid #f3f3f4;
    flex-shrink: 0;
  }
  .leftBtnWrap {
    position: relative;
    text-align: left;
    margin-left: 20px;
    margin-bottom: 20px;
  }
  .topBtnWrap {
    position: relative;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    .pinkBtn {
      border-radius: 4px;
      font-size: 0.75rem;
      color: #fff;
      width: auto !important;
      padding: 12px 38px !important;
      background-color: #ea6560;
    }
    .blackBtn {
      border-radius: 4px;
      margin-left: 6px;
      font-size: 0.75rem;
      color: #fff;
      padding: 12px 35px !important;
      background-color: #302f24;
    }
    .whiteBtn {
      border-radius: 4px;
      font-size: 0.75rem;
      color: #fff;
      padding: 12px 35px !important;
      background-color: rgb(86, 89, 226);
    }
  }
  .summaryInfo {
    margin-top: 10px;
    padding: 0 20px;
    box-sizing: border-box;

    .summaryInfoWrap {
      ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          margin-bottom: 15px;

          span {
            display: inline-block;
            margin-right: 10px;
          }

          h2,
          h3 {
            color: #666;
            font-size: 0.875rem;
            line-height: 0.875rem;
            display: inline-block;
            font-weight: 400;
          }

          &.postCharacter {
            display: flex;
            align-items: center;

            .gray {
              color: gray;
            }

            h3 {
              margin-left: 10px;
            }
          }
          &.tagWordWrap {
            .keyWordTag {
              display: inline-flex;
              flex-direction: row;
              align-items: center;
              width: auto;
              margin-right: 6px;
              margin-bottom: 6px;
              border-radius: 17px;
              border: 1px solid #e8e8e8;
              background-color: #fff;
              padding: 7px 12px;
              font-weight: 400;
              span {
                margin-left: 6px;
                font-size: 14px;
                line-height: 1.36;
                color: #333;
                box-sizing: border-box;
                display: inline-flex;
              }
            }
          }
        }
      }
    }
  }
}
</style>
