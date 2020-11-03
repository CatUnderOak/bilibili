<template>
  <div class="edit">
    <div style="margin-bottom: 10px"><nav-bar></nav-bar></div>
    <div class="uploadfile">
      <van-uploader
        class="uploadimg"
        preview-size="100vw"
        :after-read="afterRead"
      />
      <edit-banner left="头像">
        <img :src="model.user_img" slot="right" alt="" v-if="model.user_img" />
        <img src="@/assets/default_img.jpg" slot="right" alt="" v-else />
      </edit-banner>
    </div>

    <edit-banner left="昵称" @bannerClick="show = true">
      <a href="javascript:;" slot="right">{{ model.name }}</a>
    </edit-banner>
    <edit-banner left="UID">
      <a href="javascript:;" slot="right">{{ model.username }}</a>
    </edit-banner>
    <edit-banner left="性别" @bannerClick="sexshow = true">
      <a href="javascript:;" slot="right">{{ model.gender ? "男" : "女" }}</a>
    </edit-banner>
    <edit-banner left="个性签名" @bannerClick="textshow = true"></edit-banner>

    <div class="editback" @click="$router.back()">
        返回个人中心
    </div>

    <van-dialog
      v-model="show"
      title="昵称"
      show-cancel-button
      @confirm="confirmclick"
      @cancel="content = ''"
    >
      <van-field v-model="content" autofocus />
    </van-dialog>

    <van-dialog
      v-model="textshow"
      title="个性签名"
      show-cancel-button
      @confirm="textareaclick"
      @cancel="content = ''"
    >
      <van-field v-model="content" type="textarea" autofocus />
    </van-dialog>

    <van-action-sheet
      v-model="sexshow"
      cancel-text="取消"
      :actions="actions"
      @select="onSelect"
    />
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import editBanner from "@/components/common/EditBanner";

export default {
  components: {
    NavBar,
    editBanner,
  },
  data() {
    return {
      model: {},
      show: false,
      textshow: false,
      sexshow: false,
      content: "",
      actions: [
        { name: "男", val: 1 },
        { name: "女", val: 0 },
      ],
    };
  },
  methods: {
    async selectUser() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
    },
    async afterRead(file) {
      const fromdata = new FormData();
      fromdata.append("file", file.file);
      const res = await this.$http.post("/upload", fromdata);
      this.model.user_img = res.data.url;
      this.UserUpload();
    },
    async UserUpload() {
      const res = await this.$http.post(
        "/update/" + localStorage.getItem("id"),
        this.model
      );
      if(res.data.code ==200){
          this.$msg.fail('修改成功')
      }
    },
    confirmclick() {
      this.model.name = this.content;
      this.UserUpload();
      this.content = "";
    },
    textareaclick() {
      this.model.user_desc = this.content;
      this.UserUpload();
      this.content = "";
    },
    onSelect(item) {
      this.sexshow = false;
      this.model.gender = item.val;
      this.UserUpload();
    },
  },
  created() {
    this.selectUser();
  },
};
</script>

<style>
.edit a {
  color: #333;
}
.edit img {
  width: 12.778vw;
  height: 12.778vw;
  border-radius: 50%;
}
.uploadfile {
  position: relative;
  overflow: hidden;
}
.uploadimg {
  opacity: 0;
  position: absolute;
}
.editback{
    margin-top: 5.556vw;
    background-color: #fb7299;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 4.167vw 0;
    font-size: 4vw;
    border-radius: 4.167vw;
}
</style>