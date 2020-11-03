<template>
  <div class="index" v-if="category">
    <nav-bar></nav-bar>
    <div class="categorytab">
      <van-tabs v-model="active" swipeable sticky animated>
        <van-tab
          v-for="(item, index) in category"
          :key="index"
          :title="item.title"
        >
          <van-list
            v-model="item.loading"
            :immediate-check="false"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="detailparent">
              <cover
                class="detailitem"
                :detailitem="categoryitem"
                v-for="(categoryitem, categoryindex) in item.list"
                :key="categoryindex"
              />
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import cover from "./cover";
export default {
  data() {
    return {
      category: [],
      active: 0,
    };
  },
  components: {
    NavBar,
    cover,
  },
  methods: {
    async selectCategory() {
      if (localStorage.getItem("newCat")) {
        return;
      }
      const res = await this.$http.get("/category");
      this.category = this.changeCategory(res.data);
      this.selectArticle();
    },
    changeCategory(data) {
      const reform = data.map((item, index) => {
        item.list = [];
        item.page = 0;
        item.pagesize = 10;
        item.finished = false;
        item.loading = true;
        return item;
      });
      return reform;
    },
    async selectArticle() {
      const categoryitem = this.categoryItem();
      const res = await this.$http.get("/detail/" + categoryitem._id, {
        params: {
          page: categoryitem.page,
          pagesize: categoryitem.pagesize,
        },
      });
      // ...解构 [1,2,3,4]=1 2 3 4
      categoryitem.list.push(...res.data);
      categoryitem.loading = false;
      if (res.data.length < categoryitem.pagesize) {
        categoryitem.finished = true;
      }
    },
    onLoad() {
      const categoryitem = this.categoryItem();
      setTimeout(() => {
        categoryitem.page += 1;
        this.selectArticle();
      }, 1000);
    },
    categoryItem() {
      const categoryitem = this.category[this.active];
      return categoryitem;
    },
  },
  watch: {
    active() {
      const categoryitem = this.categoryItem();
      if (!categoryitem.list.length) {
        this.selectArticle();
      }
    },
  },
  created() {
    this.selectCategory();
  },
};
</script>

<style>
.index {
  background-color: white;
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