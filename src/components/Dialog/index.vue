<template>
  <el-dialog
    :title="dialogTitle"
    :visible="visible"
    width="30%"
    @close="close"
    destroy-on-close
  >
    <el-form
      ref="formRef"
      :model="localForm"
      :rules="rules"
      label-width="80px"
      style="padding: 20px 30px 10px 0"
    >
      <!-- 表单项 -->
      <el-form-item label="账号" prop="username">
        <el-input v-model="localForm.username"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="localForm.name"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="localForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="localForm.email"></el-input>
      </el-form-item>
      <!-- 其他表单项 -->
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">保 存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue';
import { ElMessage } from 'element-plus';

const formRef = ref();

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  rules: {
    type: Object,
    required: true
  },
  user: {
    type: Object,
    required: true
  },
  formData: {
    type: Object,
    required: true
  },
  dialogTitle: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['close', 'save', 'fileSuccess']);

const localForm = ref({ ...props.formData });

// 监听表单数据的变化
watch(
  () => props.formData,
  (newVal) => {
    localForm.value = { ...newVal };
  }
);

const save = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      emit('save', { ...localForm.value }); // 发射保存事件
      close(); // 确认保存后关闭
    } else {
      ElMessage.error('表单验证未通过，请检查所有输入。');
    }
  });
};

// 关闭对话框
const close = () => {
  localForm.value = { ...props.formData }; // 重置表单
  emit('close');
};
</script>
