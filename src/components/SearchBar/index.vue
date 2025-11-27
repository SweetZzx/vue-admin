<template>
  <div class="card" m-b-5px>
    <el-input
      clearable
      @clear="handleReset"
      style="width: 260px; margin-right: 5px"
      v-model="username"
      placeholder="请输入账号查询"
    />
    <el-input
      clearable
      @clear="handleReset"
      style="width: 260px; margin-right: 5px"
      v-model="name"
      placeholder="请输入名称查询"
    />
    <el-button type="primary" @click="handleSearch">查 询</el-button>
    <el-button @click="handleReset">重 置</el-button>
  </div>
</template>

<script setup>
import { ref, defineEmits, watch } from 'vue';

const props = defineProps({
  initialUsername: String,
  initialName: String
});

const emit = defineEmits(['search', 'reset']);

const username = ref(props.initialUsername);
const name = ref(props.initialName);

// 监听输入变化以同步数据
watch(
  () => props.initialUsername,
  (newVal) => {
    username.value = newVal;
  }
);

watch(
  () => props.initialName,
  (newVal) => {
    name.value = newVal;
  }
);

// 处理查询
const handleSearch = () => {
  emit('search', { username: username.value, name: name.value });
};

// 处理重置
const handleReset = () => {
  username.value = '';
  name.value = '';
  emit('reset');
};
</script>

<style scoped>
.card {
  margin-bottom: 5px;
}
</style>
