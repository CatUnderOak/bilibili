<template>
  <div class="navbar">
    <div>
      <img src="@/assets/logo.png" @click="$router.push('/')" />
    </div>
    <div>
      <p>
        请输入内容
        <van-icon class="iconNav" name="search" />
      </p>
    </div>
    <div>
      <img
        :src="imgUrl"
        alt=""
        @click="$router.push('/userinfo')"
        v-if="imgUrl"
      />
      <img
        src="@/assets/default_img.jpg"
        alt=""
        @click="$router.push('/login')"
        v-else
      />
      <p>下载App</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: "",
    };
  },
  methods: {
    async NavInit() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.get("/user/" + localStorage.getItem("id"));
        this.imgUrl = res.data[0].user_img;
      }
    },
  },
  mounted() {
    this.NavInit();
  },
};
</script>

<style>
.navbar {
  height: 12.5vw;
  background-color: white;
  display: flex;
}
.navbar > div:nth-child(1) {
  width: 26.389vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.navbar > div:nth-child(1) > img {
  width: 100%;
}
.navbar > div:nth-child(2) {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1.389vw;
}
.navbar > div:nth-child(2) > p {
  position: relative;
  font-size: 3.333vw;
  line-height: 7.222vw;
  height: 7.222vw;
  background-color: #f4f4f4;
  padding-left: 6.944vw;
  width: 100%;
  border-radius: 3.611vw;
}
.navbar > div:nth-child(2) > p > .iconNav {
  color: #aaa;
  position: absolute;
  left: 2.778vw;
  top: 50%;
  transform: translate(0, -50%);
}
.navbar > div:nth-child(3) {
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 1.944vw 0;
}
.navbar > div:nth-child(3) img {
  width: 6.667vw;
  height: 6.667vw;
  margin-top: 2.999px;
  border-radius: 50%;
}
.navbar > div:nth-child(3) > p {
  padding: 1.389vw 2.778vw;
  margin: 0 2.222vw;
  background-color: #fb7299;
  color: white;
  border-radius: 0.833vw;
  font-size: 3.611vw;
}
</style>