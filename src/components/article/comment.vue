<template>
  <div class="commentParent">
    <div v-for="(item, index) in commentList" :key="index">
      <div class="commentItem">
        <div class="userImg">
          <img
            v-if="item.userinfo && item.userinfo.user_img"
            :src="item.userinfo.user_img"
            alt
          />
          <img v-else src="@/assets/default_img.jpg" alt="" />
        </div>
        <div class="commentContent">
          <p>
            <span v-if="item.userinfo">{{ item.userinfo.name }}</span>
            <span v-else>匿名</span>
            <span>{{ item.comment_date }}</span>
          </p>
          <div>
            {{ item.comment_content }}
            <span class="publishs" @click="publishClick(item.comment_id)"
              >回复</span
            >
          </div>
        </div>
      </div>
      <div style="padding-left: 8.333vw">
        <comment-item
          @PostPublish="publishClick"
          :commentChild="item.child"
        ></comment-item>
      </div>
    </div>
  </div>
</template>

<script>
import commentItem from "./commentItem";
export default {
  data() {
    return {
      commentList: null,
    };
  },
  components: {
    commentItem,
  },
  methods: {
    async commentData() {
      const res = await this.$http.get("/comment/" + this.$route.params.id);
      //   传递评论length
      if (res.data) {
        this.$emit("lengthselect", res.data.length);
      }
      this.commentList = this.changeCommentData(res.data);
    },
    // 利用递归的方式处理数据
    changeCommentData(data) {
      function fn(temp) {
        let arr1 = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i].parent_id == temp) {
            arr1.push(data[i]);
            data[i].child = fn(data[i].comment_id);
          }
        }
        return arr1;
      }
      return fn(null);
    },
    publishClick(id) {
      this.$emit("publishClick", id);
    },
  },
  created() {
    this.commentData();
  },
  
};
</script>

<style>
.commentParent {
  padding: 2.778vw 2.778vw;
}
.commentParent > div {
  border-bottom: 0.278vw solid #e7e7e7;
}
.commentItem {
  display: flex;
  margin: 2.778vw 0;
}
/* .userImg {
  margin-left: 2px;
} */
.userImg > img {
  height: 7.944vw;
  width: 7.944vw;
  border-radius: 50%;
}
.commentItem > .commentContent {
  flex: 1;
  position: relative;
}
.commentContent > p {
  font-size: 3.889vw;
  color: #555;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.389vw;
}
.commentContent > div {
  font-size: 3.889vw;
}
.publishs {
  position: absolute;
  right: 0;
  color: red;
}
</style>