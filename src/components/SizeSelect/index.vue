<template>
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      <svg-icon
        icon-name="ant-design:font-size-outlined"
        custom-class="w-2em h-2em"
      ></svg-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          :disabled="item.value === store.size"
          v-for="item in sizeOptions"
          :key="item.label"
          @click="store.setSize(item.value as Size)"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import type { Size } from '@/plugins/element';
import { useAppStore } from '@/stores/app';
const store = useAppStore();
const size = ref<Size>('default');
const sizeOptions = ref([
  { label: 'default', value: 'default' },
  { label: 'small', value: 'small' },
  { label: 'large', value: 'large' }
]);
</script>
