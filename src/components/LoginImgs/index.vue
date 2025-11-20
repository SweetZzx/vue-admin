<!-- src/components/AuthLayout.vue -->
<template>
  <div class="auth-container">
    <!-- 背景轮播图 -->
    <div class="auth-bg">
      <img :src="currentImg" ref="bgImg" class="bg-image" />
    </div>

    <!-- 认证框 -->
    <div class="auth-box">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 预先导入所有图片
import img1 from '@/assets/imgs/1.jpg';
import img2 from '@/assets/imgs/2.jpg';
import img3 from '@/assets/imgs/3.jpg';
import img4 from '@/assets/imgs/4.jpg';
import img5 from '@/assets/imgs/5.jpg';
import img6 from '@/assets/imgs/6.jpg';

interface Props {
  imageCount?: number;
}

const props = withDefaults(defineProps<Props>(), {
  imageCount: 6
});

const images = [img1, img2, img3, img4, img5, img6];
const bgImg = useTemplateRef<HTMLImageElement>('bgImg');
const currentImg = ref(images[0]);
let timer: number | null = null;
let currentIndex = 1;

const startCarousel = () => {
  timer = setInterval(() => {
    if (bgImg.value) {
      bgImg.value.style.opacity = '1';
    }

    currentIndex = currentIndex < props.imageCount ? currentIndex + 1 : 1;
    currentImg.value = images[currentIndex - 1];

    setTimeout(() => {
      if (bgImg.value) {
        bgImg.value.style.opacity = '0.8';
      }
    }, 4000);
  }, 5000);

  setTimeout(() => {
    if (bgImg.value) {
      bgImg.value.style.opacity = '0.8';
    }
  }, 4000);
};

onMounted(() => {
  startCarousel();
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style lang="scss" scoped>
.auth-container {
  @apply relative w-screen h-screen overflow-hidden;
}

.auth-bg {
  @apply absolute inset-0 w-full h-full z-0;

  .bg-image {
    @apply w-full h-full object-cover opacity-80;
    transition: opacity 1.5s ease-in-out;
  }
}

.auth-box {
  @apply absolute top-1/2 left-1/2 z-10;
  @apply w-500px min-h-400px p-10;
  @apply border border-white/20 rounded-xl shadow-2xl;
  // 🔥 几乎完全透明，只保留毛玻璃效果
  @apply bg-white/2; // 或者 bg-black/2，极低透明度
  backdrop-filter: blur(20px); // 增强毛玻璃效果
  transform: translate(-50%, -50%);
}
</style>
