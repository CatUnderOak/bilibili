<template>
  <div class="NavTop">
    <div></div>
    <div>{{ Text }}</div>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["Text"],
};
</script>

<style>
.NavTop {
  height: 12.889vw;
  background-color: white;
  display: flex;
}
.NavTop > div {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4.444vw;
}
</style>