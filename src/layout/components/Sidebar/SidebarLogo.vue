<template>
  <div class="sidebar-logo-container" :class="{ collapse }">
    <transition name="logo-combo" mode="out-in">
      <router-link to="/" :key="collapse ? 'a' : 'b'" class="sidebar-logo">
        <div class="logo-wrapper">
          <img :src="logo" class="logo-img" />
          <div class="logo-glow"></div>
        </div>
        <transition name="title-typing">
          <h1 v-if="!collapse" class="sidebar-logo-title">Vue Admin</h1>
        </transition>
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import logo from '@/assets/vue.svg';
defineProps<{
  collapse?: boolean;
}>();
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  @apply w-full h-60px flex items-center justify-center relative;
}

.sidebar-logo {
  @apply flex items-center justify-center relative;
}

.logo-wrapper {
  @apply relative flex items-center justify-center;
}

.logo-img {
  @apply w-32px h-32px relative z-10;
  filter: drop-shadow(0 0 8px rgba(64, 158, 255, 0.3));
}

.logo-glow {
  @apply absolute inset-0 rounded-full;
  background: radial-gradient(
    circle,
    rgba(64, 158, 255, 0.2) 0%,
    transparent 70%
  );
  animation: pulse-glow 2s ease-in-out infinite alternate;
}

.sidebar-logo-title {
  @apply inline-block text-20px text-white mx-10px relative;
  white-space: nowrap;
  background: linear-gradient(45deg, #409eff, #67c23a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 主动画 */
.logo-combo-enter-from {
  transform: scale(0.3) rotateZ(-180deg);
  opacity: 0;
}

.logo-combo-leave-to {
  transform: scale(1.3) rotateZ(180deg);
  opacity: 0;
}

.logo-combo-enter-active {
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.logo-combo-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

/* 标题打字机效果 */
.title-typing-enter-from {
  opacity: 0;
  width: 0;
}

.title-typing-leave-to {
  opacity: 0;
  width: 0;
}

.title-typing-enter-active {
  transition: all 0.6s ease-out;
  transition-delay: 0.3s;
}

.title-typing-leave-active {
  transition: all 0.4s ease-in;
}

/* 光晕动画 */
@keyframes pulse-glow {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.2);
    opacity: 0.1;
  }
}

/* 悬停效果 */
.sidebar-logo:hover .logo-img {
  animation: bounce-rotate 0.6s ease-in-out;
}

@keyframes bounce-rotate {
  0%,
  100% {
    transform: rotateZ(0deg) scale(1);
  }
  25% {
    transform: rotateZ(-10deg) scale(1.1);
  }
  75% {
    transform: rotateZ(10deg) scale(1.1);
  }
}

/* 响应式适配 */
.collapse .logo-wrapper {
  transform: scale(1.2);
}
</style>
