<template>
  <svg-icon
    @click="handleClick"
    :icon-name="
      isFullScreen
        ? 'ant-design:fullscreen-exit-outlined'
        : 'ant-design:fullscreen-outlined'
    "
    custom-class="w-2em h-2em"
  ></svg-icon>
</template>

<script lang="ts" setup>
import screenfull from 'screenfull';
const isFullScreen = ref(false);
const { proxy } = getCurrentInstance()!;
function handleClick() {
  if (screenfull.isEnabled) {
    screenfull.toggle();
  } else {
    proxy?.$message('当前浏览器不支持全屏');
  }
}

function updateFullScreenStatus() {
  //看是否是全屏,全屏就切换状态
  isFullScreen.value = screenfull.isFullscreen;
}

onMounted(() => {
  if (screenfull.isEnabled) {
    screenfull.on('change', updateFullScreenStatus);
  }
});

onBeforeUnmount(() => {
  if (screenfull.isEnabled) {
    screenfull.off('change', updateFullScreenStatus);
  }
});
</script>
