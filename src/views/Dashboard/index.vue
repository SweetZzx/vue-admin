<template>
  <div>
    <div i-ant-design:apple-filled icon></div>
    <svg-icon
      icon-name="token-branded:1art"
      custom-class="text-red w-2em h-2em"
      @click="handle"
    ></svg-icon>

    <svg-icon
      icon-name="meterial-symbols-light:18-up-rating-outline-rounded"
    ></svg-icon>
    <svg-icon
      icon-name="https://zishui.oss-cn-beijing.aliyuncs.com/BugFilled.svg"
      :custom-class="val"
    ></svg-icon>
    <input type="text" />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'dashboard'
});
const { proxy } = getCurrentInstance()!;
const handle = () => {
  proxy?.$message('this is a message');
};

const val = ref('text-yellow');

setTimeout(() => {
  val.value = 'text-black';
}, 5000);
</script>
