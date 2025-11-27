<script lang="ts" setup>
import { useTagsViewStore } from '@/stores/tagsView';
const store = useTagsViewStore();
const includes = computed(() => store.cacheViews as string[]);
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="includes">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style class="scss" scoped>
/* 如果希望保留动画，可以设置更简单的过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease; /* 更平滑的过渡 */
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0; /* 透明度 */
}
</style>
