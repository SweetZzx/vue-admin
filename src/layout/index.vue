<script lang="ts" setup>
import { useSettingStore } from '@/stores/settings';
import variables from '@/style/variables.module.scss';

const setting = ref(false);
const openSetting = () => {
  setting.value = true;
};

const settingsStore = useSettingStore();
const isShowTagsView = computed(() => settingsStore.settings.tagsView);

const outerHeight = computed(() =>
  isShowTagsView.value
    ? `${parseInt(variables.tagsViewHeight) + parseInt(variables.navBarHeight)}px`
    : `${parseInt(variables.navBarHeight)}px`
);
</script>

<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <sidebar></sidebar>
    </div>
    <div class="main-container">
      <div class="header">
        <!--这个是导航条-->
        <navbar @showSetting="openSetting"></navbar>
        <tags-view v-if="isShowTagsView"></tags-view>
      </div>
      <!--这个是核心渲染的部分-->
      <div class="app-main">
        <app-main></app-main>
      </div>
    </div>
    <!--这个是抽屉组件(设置)-->
    <right-panel v-model="setting" title="设置">
      <!--设置功能-->
      <Settings> </Settings>
    </right-panel>
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
  .app-main {
    @apply bg-cyan overflow-hidd pos-relative;
    min-height: calc(100vh - v-bind(outerHeight));
  }
  @apply flex w-full h-full;
  .sidebar-container {
    //跨组件设置样式
    @apply bg-[var(--menu-bg)];
    :deep(.sidebar-container-menu:not(.el-menu--collapse)) {
      @apply w-[var(--sidebar-width)];
    }
  }
  .main-container {
    @apply flex-1 flex-col flex overflow-hidden;
  }
}
</style>
