<template>
  <el-breadcrumb separator="/" leading-50px text-lg ml-30px inline-block>
    <el-breadcrumb-item v-for="(route, index) in list" :key="route.path">
      <span v-if="list.length - 1 === index">{{ route.meta?.title }} </span>
      <a v-else @click="handleLink(route)">{{ route.meta?.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import type { RouteLocationMatched } from 'vue-router';
import { compile } from 'path-to-regexp';

const route = useRoute();
const router = useRouter();

const list = ref<Partial<RouteLocationMatched>[]>([]);
const getBreadCrumb = () => {
  let matched = route.matched.filter(
    (match) => match.meta?.title
  ) as Partial<RouteLocationMatched>[];
  if (matched[0]?.path !== '/dashboard') {
    //当前访问的不是首页，增加匹配项
    matched = [
      { path: '/dashboard', meta: { title: 'dashboard' } },
      ...matched
    ];
  }
  list.value = matched.filter((match) => match.meta?.breadcrumb !== false);
};
watch(() => route.path, getBreadCrumb, { immediate: true });

//根据面包屑导航+当前访问的路径 -》生成跳转路径
function compilePath(path: string) {
  const params = route.params;
  const resultPath = compile(path)(params);
  return resultPath;
}
function handleLink(route: Partial<RouteLocationMatched>) {
  const { path, redirect } = route;

  if (redirect) {
    return router.push(redirect as string);
  }
  router.push(compilePath(path!));
}

// 组件卸载时清理
onUnmounted(() => {
  list.value = [];
});
</script>
