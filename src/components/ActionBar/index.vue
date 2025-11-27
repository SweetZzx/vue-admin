<template>
  <div class="card" style="margin-bottom: 5px">
    <el-button type="primary" @click="handleAdd">新 增</el-button>
    <el-button type="danger" @click="deleteBatch">批量删除</el-button>
    <el-button type="info" @click="exportData">批量导出</el-button>
    <el-upload
      style="display: inline-block; margin-left: 10px"
      :action="importUrl"
      :show-file-list="false"
      :on-success="handleImportSuccess"
      :on-error="handleImportError"
    >
      <el-button type="success">批量导入</el-button>
    </el-upload>
  </div>
</template>

<script setup>
const props = defineProps({
  importUrl: {
    type: String,
    required: true
  }
});

const emit = defineEmits([
  'add',
  'delete',
  'export',
  'importSuccess',
  'importError'
]);

// 发射事件
const handleAdd = () => {
  emit('add');
};

const deleteBatch = () => {
  emit('delete');
};

const exportData = () => {
  emit('export');
};

const handleImportSuccess = (res) => {
  emit('importSuccess', res);
};

const handleImportError = (err) => {
  emit('importError', err); // 处理导入错误
};
</script>

<style scoped>
.card {
  margin-bottom: 5px;
}
</style>
