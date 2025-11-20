<template>
  <el-config-provider :size="store.size">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { useAppStore } from './stores/app';
import { useUserStore } from '@/stores/user';

import { useGenerateTheme } from '@/hooks/useGenerateTheme';
const store = useAppStore();
const { initUserInfo } = useUserStore();
onMounted(() => {
  initUserInfo();
  useGenerateTheme();
});
</script>
<style scoped></style>
