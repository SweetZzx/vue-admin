<template>
  <template v-if="!item.meta?.hidden">
    <sidebarItemLink
      v-if="filterChildren.length <= 1 && !item.meta?.alwaysShow"
      :to="resolvePath(singleChildRoute?.path || '')"
    >
      <el-menu-item :index="resolvePath(singleChildRoute?.path || '')">
        <el-icon v-if="iconName">
          <svg-icon :icon-name="iconName" />
        </el-icon>
        <template #title>{{ singleChildRoute?.meta?.title }}</template>
      </el-menu-item>
    </sidebarItemLink>

    <el-sub-menu v-else :index="item.path">
      <template #title>
        <el-icon v-if="iconName"> <svg-icon :icon-name="iconName" /> </el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <sidebar-item
        v-for="child of filterChildren"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      ></sidebar-item>
    </el-sub-menu>
  </template>
</template>

<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router';
import path from 'path-browserify';
const { item, basePath } = defineProps<{
  item: RouteRecordRaw;
  basePath: string;
}>();

//如果只有一个儿子，说明我们直接渲染这里的一个儿子即可
//如果菜单对应的children有多个，使用el-sub-menu渲染
const filterChildren = computed(() =>
  (item.children || []).filter((child) => !child.meta?.hidden)
);

//要渲染的路由
const singleChildRoute = computed(
  () =>
    filterChildren.value.length === 1
      ? filterChildren.value[0]
      : { ...item, path: '' } //如果没有单个子路由 则使用当前路由
);

//要渲染的图标
const iconName = computed(() => singleChildRoute.value?.meta?.icon);

//解析父路径 + 子路径  resolve可以解析绝对路径
const resolvePath = (childPath: string) => {
  if (isExternal(childPath)) {
    return childPath;
  }
  return path.join(basePath, childPath);
};
</script>

<style scoped></style>
