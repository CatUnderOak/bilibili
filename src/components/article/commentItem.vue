<template>
  <div class="commentitems">
    <div class="commentitem" v-for="(item, index) in commentChild" :key="index">
      <div class="userImg">
        <img
          :src="item.userinfo.user_img"
          v-if="item.userinfo && item.userinfo.user_img"
          alt=""
        />
        <img src="@/assets/default_img.jpg" alt="" v-else />
        <p>
          <span v-if="item.userinfo">{{ item.userinfo.name }}</span>
          <span v-else>匿名</span>
          <span>{{ item.comment_date }}</span>
        </p>
      </div>
      <div class="commentcontent">
        <div v-if="!temp">
          {{ item.comment_content }}
          <span class="publish" @click="PostItemcomment(item.comment_id)"
            >回复</span
          >
        </div>
        <div v-else>
          回复
          <span style="color: #478ef0">{{ item.parent_user_info.name }}</span>
          :{{ item.comment_content
          }}<span class="publish" @click="PostItemcomment(item.comment_id)"
            >回复</span
          >
        </div>
      </div>
      <!-- 递归 -->
      <commentchild-item
        :commentChild="item.child"
        @postChild="postChild"
        :temp="true"
      ></commentchild-item>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentchildItem",
  props: ["commentChild", "temp"],
  methods: {
    PostItemcomment(id) {
      // console.log(id);
      this.$emit("postChild", id);
      this.$emit("PostPublish", id);
    },
    postChild(id) {
      this.PostItemcomment(id);
      this.$emit("PostPublish", id);
    },
  },
};
</script>

<style>
.commentitems > .commentitem {
  display: flex;
  margin: 10px 0;
  flex-direction: column;
}
.commentitem > .userImg {
  display: flex;
}
.userImg > img {
  margin: 0 2.222vw 2.778vw 0;
  height: 7.944vw;
  width: 7.944vw;
  border-radius: 50%;
}
.userImg > p {
  flex: 1;
  font-size: 3.611vw;
  color: #555;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.389vw;
}
.commentitem > .commentcontent {
  position: relative;
  margin-bottom: 2.778vw;
}
.publish {
  position: absolute;
  right: 0;
  color: red;
}
</style>