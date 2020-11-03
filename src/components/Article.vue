<template>
  <div v-if="model">
    <nav-bar></nav-bar>
    <div class="detailinfo">
      <div class="video">
        <video controls="controls" :src="model.content"></video>
      </div>
      <div class="detailinfoText">
        <div>
          <div class="infouser">
            <div class="user_img">
              <img
                :src="model.userinfo.user_img"
                alt=""
                v-if="model.userinfo.user_img"
              />
              <img src="@/assets/default_img.jpg" alt="" v-else />
            </div>
            <span style="margin-left: 8px">{{ model.userinfo.name }}</span>
          </div>
          <div @click="subscriptClick" :class="[subscritionActive ? sub : gz]">
            {{ ygz }}
          </div>
          <!-- <div @click="subscriptClick" class="gz" v-else>+关注</div> -->
        </div>
        <div>
          <span>{{ model.category.title }}</span>
          <span>{{ model.name }}</span>
        </div>
        <div>
          <span>145.4万次观看</span>
          <span>4312弹幕</span>
          <span>{{ model.date }}</span>
        </div>
        <div>
          <p
            @click="collectionClick"
            :class="{ activeColor: collectionActive }"
          >
            <span class="icon-star-full"></span>
            <span>收藏</span>
          </p>
          <p>
            <span class="icon-box-add"></span>
            <span>缓存</span>
          </p>
          <p>
            <span class="icon-redo2"></span>
            <span>分享</span>
          </p>
        </div>
      </div>
      <div class="detailparent">
        <cover
          class="detailitem"
          v-for="(item, index) in commendList"
          :key="index"
          :detailitem="item"
        />
      </div>
      <comment-title
        :dataLength="lens"
        @Postcomment="PostSuccess"
        ref="commentIpt"
      />
      <comment
        @lengthselect="(len) => (lens = len)"
        ref="commentPulish"
        @publishClick="PostChildClick"
      />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import cover from "./cover";
import commentTitle from "@/components/article/commentTitle";
import comment from "@/components/article/comment";
export default {
  data() {
    return {
      model: null,
      commendList: null,
      lens: null,
      Postcom: {
        comment_content: "",
        comment_date: "",
        parent_id: null,
        article_id: null,
      },
      collectionActive: null,
      subscritionActive: null,
      gz: "gzColor",
      sub: "subColor",
      ygz: null,
    };
  },
  components: {
    NavBar,
    cover,
    commentTitle,
    comment,
  },
  methods: {
    //   获取文章信息
    async articleitemDate() {
      const res = await this.$http.get("/article/" + this.$route.params.id);
      this.model = res.data[0];
      if (this.model) {
        this.subscritionInit();
      }
    },
    // 获取推荐文章
    async commendData() {
      const res = await this.$http.get("/commend");
      this.commendList = res.data;
    },
    // 发送评论
    async PostSuccess(res) {
      const date = new Date();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      let str = `${m}-${d}`;
      this.Postcom.comment_content = res;
      this.Postcom.comment_date = str;
      this.Postcom.article_id = this.$route.params.id;
      const result = await this.$http.post(
        "/comment_post/" + localStorage.getItem("id"),
        this.Postcom
      );
      this.$refs.commentPulish.commentData();
      this.Postcom.parent_id = null;
      if (result.status == 200) {
        this.$msg.fail("评论发表成功");
      }
    },
    // 聚焦输入框
    PostChildClick(id) {
      this.Postcom.parent_id = id;
      this.$refs.commentIpt.focusIpt();
    },
    // 收藏文章
    async collectionClick() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.post(
          "/collection/" + localStorage.getItem("id"),
          { article_id: this.$route.params.id }
        );
        if (res.data.msg == "收藏成功") {
          this.collectionActive = true;
        } else {
          this.collectionActive = false;
        }
        this.$msg.fail(res.data.msg);
      }
    },
    //进入页面获取是否收藏
    async collectionInit() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.get(
          "/collection/" + localStorage.getItem("id"),
          {
            params: {
              article_id: this.$route.params.id,
            },
          }
        );
        this.collectionActive = res.data.success;
      }
    },
    //点击关注发帖用户
    async subscriptClick() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.post(
          "/sub_scription/" + localStorage.getItem("id"),
          { sub_id: this.model.userid }
        );
        if (res.data.msg == "关注成功") {
          this.subscritionActive = true;
          this.ygz = "已关注";
        } else {
          this.subscritionActive = false;
          this.ygz = "+关注";
        }
        this.$msg.fail(res.data.msg);
      }
    },
    //进入页面获取是否关注
    async subscritionInit() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.get(
          "/sub_scription/" + localStorage.getItem("id"),
          {
            params: {
              sub_id: this.model.userid,
            },
          }
        );
        this.subscritionActive = res.data.success;
        if (this.subscritionActive) {
          this.ygz = "已关注";
        } else {
          this.ygz = "+关注";
        }
      }
    },
  },
  created() {
    this.articleitemDate();
    this.commendData();
    this.collectionInit();
  },
  watch: {
    $route() {
      this.articleitemDate();
      this.commendData();
      this.collectionInit();
    },
  },
};
</script>

<style>
.detailinfo {
  background-color: white;
}
.video {
  width: 100%;
}
video {
  width: 100%;
}
.detailinfoText {
  padding: 4.167vw;
  font-size: 5vw;
}
.detailinfoText > div:nth-child(1) {
  display: flex;
  /* space-between左右对齐布局 */
  justify-content: space-between;
  align-items: center;
}
.infouser {
  display: flex;
  align-items: center;
}
.gzColor {
  width: 22.222vw;
  height: 8.333vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 4.167vw;
  background-color: #fb7299;
  border-radius: 1.389vw;
}
.subColor {
  width: 22.222vw;
  height: 8.333vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 4.167vw;
  background-color: #b9b5b5;
  border-radius: 1.389vw;
}
.detailinfoText > div:nth-child(2) > span:nth-child(1) {
  padding: 0 2.778vw;
  color: #fb7299;
  background-color: #f4f4f4;
  border-radius: 2.778vw;
  font-size: 3.889vw;
}
.detailinfoText > div:nth-child(3) {
  padding: 2.778vw;
}
.detailinfoText > div:nth-child(3) > span {
  color: #aaa;
  font-size: 3.333vw;
  padding-right: 2.778vw;
}
.user_img > img {
  width: 46.001px;
  height: 46.001px;
  border-radius: 50%;
}
.detailinfoText > div:nth-child(4) {
  padding: 0 2.778vw;
  display: flex;
}
.detailinfoText > div:nth-child(4) > p {
  margin-right: 2.778vw;
  display: flex;
  align-items: center;
  color: #757575;
}
.detailinfoText > div:nth-child(4) > .activeColor {
  color: #fb7299;
}
.detailinfoText > div:nth-child(4) > p > span:nth-child(1) {
  margin-right: 1.389vw;
  font-size: 5.833vw;
}
.detailinfoText > div:nth-child(4) > p > span:nth-child(2) {
  font-size: 3.611vw;
}
.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.detailparent > .detailitem {
  margin: 1.389vw 0;
  width: 45%;
}
</style>