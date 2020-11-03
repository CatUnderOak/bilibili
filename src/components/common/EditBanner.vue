<template>
  <div @click="bannerClick">
      <div class="editBanner">
          <span>{{left}}</span>
          <span><slot name="right"/></span>
      </div>
  </div>
</template>

<script>
export default {
  props:['left'],
  methods:{
      bannerClick(){
          this.$emit('bannerClick')
      }
  }
}
</script>

<style>
.editBanner{
    display: flex;
    /* space-between左右对齐布局 */
    justify-content: space-between;
    align-items: center;
    padding: 4.167vw;
    font-size: 3.889vw;
    color: #333;
    background-color: white;
    border-bottom: 0.278vw solid #eee;
}
</style>