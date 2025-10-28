<script lang="ts" setup>
const setting = ref(false);
const openSetting = () => {
  setting.value = true;
};
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
        <tags-view></tags-view>
      </div>
      <!--这个是核心渲染的部分-->
      <app-main></app-main>
    </div>
    <!--这个是抽屉组件(设置)-->
    <right-panel v-model="setting" title="设置主题色">
      <!--设置功能-->
      <Settings> </Settings>
    </right-panel>
  </div>
</template>

<style lang="scss">
.app-wrapper {
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
  .header {
    @apply h-84px;
  }
}
</style>
