<script lang="ts" setup>
import { useTagsViewStore } from '@/stores/tagsView';
const store = useTagsViewStore();
const includes = computed(() => store.cacheViews as string[]);
</script>

<template>
  <router-view v-slot="{ Component }">
    <!--组件持久化-->
    <transition name="fade">
      <keep-alive :include="includes">
        <component :is="Component"></component>
      </keep-alive>
    </transition>
  </router-view>
</template>

<style class="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  @apply transition-all duration-500;
}

.fade-enter-from {
  @apply opacity-0 translate-x-[50px];
}
.fade-leave-to {
  @apply opacity-0 translate-x-[-50px];
}
</style>
