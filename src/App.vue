<template>
  <el-config-provider :size="store.size">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { useAppStore } from './stores/app';
import { useGenerateTheme } from '@/hooks/useGenerateTheme';
const store = useAppStore();

useGenerateTheme();
</script>

<style scoped></style>
