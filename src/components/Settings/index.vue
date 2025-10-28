<script lang="ts" setup>
import { useSettingStore } from '@/stores/settings';
const settingsStore = useSettingStore();
const isShowTagsView = computed(() => settingsStore.settings.tagsView);
const tagsView = computed({
  get: () => isShowTagsView.value,
  set: (val: boolean) => {
    settingsStore.changeSetting('tagsView', val);
  }
});
</script>

<template>
  <div class="drawer-item">
    <span>主题色</span>
    <theme-picker></theme-picker>
  </div>
  <div class="drawer-item">
    <span>是否展示TagsView</span>
    <el-switch v-model="tagsView"></el-switch>
  </div>
</template>
