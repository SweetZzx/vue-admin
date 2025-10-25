<template>
  <el-menu
    router
    :default-active="defaultActive"
    :background-color="varaibles.menuBg"
    :text-color="varaibles.menuText"
    :active-text-color="varaibles.menuActiveText"
    :collapse="false"
  >
    <el-menu-item index="/dashboard">
      <el-icon></el-icon>
      <template #title>Navigator Four</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import varaibles from '@/style/variables.module.scss';

const route = useRoute();

const defaultActive = computed(() => {
  return route.path;
});
</script>
