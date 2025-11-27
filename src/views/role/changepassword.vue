<template>
  <div class="card" style="width: 50%">
    <div style="font-size: 16px">修改密码</div>
    <el-form
      ref="formRef"
      :rules="data.rules"
      :model="data.user"
      label-width="80px"
      style="padding: 20px 30px 10px 0"
    >
      <el-form-item prop="password" label="原密码">
        <el-input
          show-password
          v-model="data.user.password"
          autocomplete="off"
          prefix-icon="Lock"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item prop="newPassword" label="新密码">
        <el-input
          show-password
          v-model="data.user.newPassword"
          autocomplete="off"
          prefix-icon="Lock"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item prop="new2Password" label="确认密码">
        <el-input
          show-password
          v-model="data.user.new2Password"
          autocomplete="off"
          prefix-icon="Lock"
          placeholder="请输入密码"
        />
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button
        type="primary"
        style="padding: 20px 30px"
        @click="updatePassword"
        >保存</el-button
      >
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import request from '@/api/config/request';
import { ElMessage } from 'element-plus';

const data = reactive({
  user: JSON.parse(localStorage.getItem('userInfo') || '{}'),
  password: '',
  newPassword: '',
  new2Password: '',
  rules: {
    password: [{ required: true, message: '请填写原密码', trigger: 'blur' }],
    newPassword: [{ required: true, message: '请填写新密码', trigger: 'blur' }],
    new2Password: [{ required: true, message: '请确认新密码', trigger: 'blur' }]
  }
});

const formRef = ref();

const updatePassword = async () => {
  const valid = await formRef.value.validate();
  if (valid) {
    try {
      await request.post(
        '/updatePassword',
        {
          oldPassword: data.password,
          newPassword: data.newPassword
        },
        {
          onSuccess: () => {
            ElMessage.success('密码修改成功，您将被重新登录');
            setTimeout(() => {
              localStorage.removeItem('userInfo');
              location.href = '/login';
            }, 500);
          },
          errorMsg: '修改密码失败，请重试',
          showDefaultMsg: true
        }
      );
    } catch (error) {
      console.error('密码修改请求失败:', error);
    }
  }
};
</script>
