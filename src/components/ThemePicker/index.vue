<script lang="ts" setup>
import { useSettingStore } from '@/stores/settings';

const store = useSettingStore();

const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585'
];

const theme = computed({
  get: () => store.settings.theme,
  set: (val: string) => {
    store.changeSetting('theme', val);
  }
});
</script>

<template>
  <el-color-picker v-model="theme" :predefine="predefineColors" />
</template>
