<template>
  <div class="userinfo">
    <nav-bar></nav-bar>
    <img src="@/assets/bannerTop_new.png" alt="" class="backImg" />
    <user-detail :userInfo="model"></user-detail>
    <user-article></user-article>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import userDetail from "@/components/userComponent/userDetail";
import userArticle from "@/components/userComponent/userArticle";
export default {
  data() {
    return {
      model: {},
    };
  },
  components: {
    NavBar,
    userDetail,
    userArticle,
  },
  methods: {
    async userinfoDate() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
    },
  },
  created() {
    this.userinfoDate();
  },
};
</script>

<style>
.userinfo > .backImg {
  width: 100%;
  height: 30.556vw;
}
</style>