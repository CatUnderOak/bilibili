<template>
  <div @click="pathPush" v-if="detailitem">
    <div class="detailItem">
      <div class="imgparent">
        <img
          :src="detailitem.img"
          alt=""
          style="width: 100%; height: 27.778vw"
        />
      </div>
      <p>{{ detailitem.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["detailitem"],
  methods: {
    pathPush() {
      if (this.$router.path != `/article/${this.detailitem.id}`) {
        this.$router.push(`/article/${this.detailitem.id}`);
      }
    },
  },
};
</script>

<style>
.detailItem p {
  font-size: 3.333vw;
  padding: 0.833vw 0;
}
</style>