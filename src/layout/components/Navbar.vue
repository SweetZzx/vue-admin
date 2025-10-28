<template>
  <div class="navbar" flex>
    <hamburger @toggleCollapse="toggleSidebar" :collapse="sidebar.opened" />

    <breadcrumb></breadcrumb>

    <div flex justify-end flex-1 items-center mr-50px>
      <screenfull mx-5px></screenfull>
      <el-tooltip content="changeSize" placement="bottom">
        <size-select></size-select>
      </el-tooltip>
      <svg-icon
        icon-name="ant-design:setting-outlined"
        size-2em
        @click="openShowSetting"
      ></svg-icon>
      <avatar></avatar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app';

//在结构的时候要考虑值是不是对象，如果非对象结构出来就丧失响应式了
const { toggleSidebar, sidebar } = useAppStore();

const emit = defineEmits<{ showSetting: [isShow: boolean] }>();
const openShowSetting = () => {
  emit('showSetting', true);
};
</script>

<style class="scss" scoped>
.navbar {
  @apply h-[var(--navbar-height)];
}
</style>
