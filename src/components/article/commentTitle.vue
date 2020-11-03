<template>
  <div class="comment">
    <p class="comment-title">
      <span>评论</span>
      <span>({{ dataLength }})</span>
    </p>
    <div class="commentMyinfo">
      <img :src="myuser.user_img" alt="" v-if="myuser" />
      <img src="@/assets/default_img.jpg" alt="" v-else />
      <input
        v-model="comcontent"
        ref="Postipt"
        type="text"
        placeholder="说点什么吧"
      />
      <button @click="cmmentPublish">发表</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["dataLength"],
  data() {
    return {
      myuser: null,
      comcontent: "",
    };
  },
  methods: {
    async myUserinfo() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.myuser = res.data[0];
    },
    cmmentPublish() {
      if (
        !this.myuser &&
        !localStorage.getItem("token") &&
        !localStorage.getItem("id")
      ) {
        this.$msg.fail("请先登录");
        return;
      }
      this.$emit("Postcomment", this.comcontent);
      this.comcontent = "";
    },
    focusIpt() {
      this.$refs.Postipt.focus();
    },
  },
  created() {
    if (localStorage.getItem("token")) {
      this.myUserinfo();
    }
  },
};
</script>

<style>
.comment {
  padding: 8.333vw 2.778vw 0 2.778vw;
}
.comment-title > span:nth-child(2) {
  color: #aaa;
  margin-left: 2.778vw;
}
.commentMyinfo {
  padding: 2.778vw 0;
  display: flex;
}
.commentMyinfo > img {
  height: 7.944vw;
  width: 7.944vw;
  border-radius: 50%;
}
.commentMyinfo > input {
  width: 210px;
  outline: none;
  border: none;
  background-color: #f4f4f4;
  border-radius: 3.611vw;
  font-size: 3.333vw;
  padding: 0 5.556vw 0 4.167vw;
  margin-left: 2.778vw;
}
.commentMyinfo > button {
  outline: none;
  border: none;
  border-radius: 2.778vw;
  background-color: #fb7299;
  color: white;
  font-size: 3.333vw;
  padding: 0 4.167vw;
  margin-left: 2.778vw;
}
</style>