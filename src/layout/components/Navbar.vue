<template>
  <div class="navbar" flex>
    <hamburger @toggleCollapse="toggleSidebar" :collapse="sidebar.opened" />

    <breadcrumb></breadcrumb>

    <div flex justify-end flex-1 items-center>
      <screenfull></screenfull>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app';

//在结构的时候要考虑值是不是对象，如果非对象结构出来就丧失响应式了
const { toggleSidebar, sidebar } = useAppStore();
</script>

<style class="scss" scoped>
.navbar {
  @apply h-[var(--navbar-height)];
}
</style>
