<script lang="ts" setup>
import { useSettingStore } from '@/stores/settings';
const settingsStore = useSettingStore();
const isShowTagsView = computed(() => settingsStore.settings.tagsView);
const isShowLogo = computed(() => settingsStore.settings.sidebarLogo);

const tagsView = computed({
  get: () => isShowTagsView.value,
  set: (val: boolean) => {
    settingsStore.changeSetting('tagsView', val);
  }
});
const sidebarLogo = computed({
  get: () => isShowLogo.value,
  set: (val: boolean) => {
    settingsStore.changeSetting('sidebarLogo', val);
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
  <div class="drawer-item">
    <span>是否展示Logo</span>
    <el-switch v-model="sidebarLogo"></el-switch>
  </div>
</template>
