// 3. 最简单的重定向组件
<script lang="ts" setup>
const router = useRouter();
const route = useRoute();

// 立即执行重定向
const redirectPath = `/${(route.params.path as string) || ''}`;

router.replace({
  path: redirectPath,
  query: route.query
});
</script>

<template>
  <div></div>
</template>
