<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <Sidebar />
    </div>
    <div class="main-container">
      <div class="header">
        <navbar />
        <div class="tags-view">导航条2</div>
      </div>
      <div class="app-main">
        <router-view></router-view>
      </div>
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
  .app-main {
    @apply bg-cyan;
    min-height: calc(100vh - var(--tagsview-height) - var(--navbar-height));
  }
}
</style>
