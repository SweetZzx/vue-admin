<template>
  <IconifyIcon :icon="iconName" :class="svgClass" v-if="!isExt" />
  <template v-else>
    <div
      :style="styleExternalIcon"
      :class="svgClass"
      bg-current
      v-bind="$attrs"
    ></div>
  </template>
</template>

<script lang="ts" setup>
import { isExternal } from '@/utils/validate';
import { Icon as IconifyIcon } from '@iconify/vue';

const { iconName, customClass } = defineProps<{
  iconName: string;
  customClass?: string;
}>();

const isExt = computed(() => isExternal(iconName));

//class="customClass +icon"
//组合成的类名
const svgClass = computed(() => {
  return customClass ? `icon ${customClass}` : 'icon';
});

//通过msak 渲染svg图标 ，可以通过请求svg的方式来渲染
const styleExternalIcon = computed(() => ({
  mask: `url(${iconName}) no-repeat 50% 50%`,
  '--webkit-mask': `url(${iconName}) no-repeat 50% 50%`,
  'mask-size': 'cover'
}));
</script>

<!-- 在实现图标的时候 尽量采用svg 不要采用font图标-->
