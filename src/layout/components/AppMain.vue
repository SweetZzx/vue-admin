<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <!--组件持久化-->
      <transition name="fade">
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style class="scss" scoped>
.app-main {
  @apply bg-cyan overflow-hidd pos-relative;
  min-height: calc(100vh - var(--tagsview-height) - var(--navbar-height));
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-all duration-500;
}

.fade-enter-from {
  @apply opacity-0 translate-x-[50px];
}
.fade-leave-to {
  @apply opacity-0 translate-x-[-50px];
}
</style>
