<template>
  <el-config-provider :size="store.size">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { useAppStore } from './stores/app';
const store = useAppStore();
</script>

<style scoped></style>
