<template>
  <div class="userdetail">
    <div>
      <div class="user_img">
        <img :src="userInfo.user_img" alt="" v-if="userInfo.user_img" />
        <img src="@/assets/default_img.jpg" alt="" v-else />
      </div>
      <div class="user_edit">
        <div>
          <p>
            <span>1</span>
            <span class="user_text">粉丝</span>
          </p>
          <span class="line">|</span>
          <p>
            <span>54</span>
            <span class="user_text">关注</span>
          </p>
          <span class="line">|</span>
          <p>
            <span>10</span>
            <span class="user_text">获赞</span>
          </p>
        </div>
        <div @click="$router.push('/edit')">
          <div class="user_editBtn">编辑资料</div>
        </div>
      </div>
    </div>
    <div>
      <h2>{{ userInfo.name }}</h2>
      <p v-if="userInfo.user_desc">{{ userInfo.user_desc }}</p>
      <p v-else>这人很神秘，神秘都没写</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userInfo"],
};
</script>

<style>
.userdetail {
  padding: 0 3.333vw;
  background-color: white;
}
.userdetail > div:nth-child(1) {
  display: flex;
}
.user_img {
  margin-right: 5.556vw;
}
.user_img > img {
  width: 23.611vw;
  height: 23.611vw;
  border-radius: 50%;
}
.user_edit {
  flex: 1;
}
.user_edit > div:nth-child(1) {
  display: flex;
}
.user_edit > div:nth-child(1) > .line {
  display: flex;
  align-items: center;
  color: #ccc;
}
.user_edit > div:nth-child(1) > p {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 3.611vw;
}
.user_edit > div:nth-child(1) > p > .user_text {
  color: #aaa;
}
.user_edit > div:nth-child(2) {
  padding: 0 2.778vw;
}
.user_edit > div:nth-child(2) {
  display: flex;
  justify-content: center;
  padding: 0.833vw;
  border: 0.278vw solid #fb7a9f;
  color: #fb7a9f;
  border-radius: 1.389vw;
}
.userdetail > div:nth-child(2) > h2 {
  margin: 2.778vw 0 0.833vw 0;
  font-weight: 400;
}
.userdetail > div:nth-child(2) > p {
  padding: 0;
  margin: 2.778vw 0;
  color: #999;
}
</style>