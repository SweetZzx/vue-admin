<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <sidebar></sidebar>
    </div>
    <div class="main-container">
      <div class="header">
        <!--这个是导航条-->
        <navbar></navbar>
        <div class="tags-view">导航条2</div>
      </div>
      <!--这个是核心渲染的部分-->
      <app-main></app-main>
    </div>
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
    @apply flex-1 flex-col flex;
  }
  .header {
    @apply h-[84px];

    .tags-view {
      @apply h-[var(--tagsview-height)] bg-blue;
    }
  }
}
</style>
