<template>
  <div class="card" style="width: 50%">
    <div style="font-size: 15px">个人中心</div>
    <el-form
      ref="formRef"
      :model="data.user"
      label-width="80px"
      style="padding: 20px 30px 10px 0"
    >
      <el-form-item prop="username" label="账号">
        <el-input
          v-model="data.user.username"
          autocomplete="off"
          placeholder="请输入账号"
        />
      </el-form-item>
      <el-form-item prop="name" label="名称">
        <el-input
          v-model="data.user.name"
          autocomplete="off"
          placeholder="请输入名称"
        />
      </el-form-item>
      <el-form-item prop="phone" label="电话">
        <el-input
          v-model="data.user.phone"
          autocomplete="off"
          placeholder="请输入电话"
        />
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input
          v-model="data.user.email"
          autocomplete="off"
          placeholder="请输入邮箱"
        />
      </el-form-item>
      <el-form-item prop="avatar" label="头像">
        <el-upload
          action="https://sweetzzx.dpdns.org/files/upload"
          :headers="{ token: data.user.token }"
          :on-success="handleFileSuccess"
          list-type="picture"
        >
          <el-button type="primary">上传头像</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button type="primary" style="padding: 18px 35px" @click="update"
        >保存</el-button
      >
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
import request from '@/api/config/request';
import { ElMessage } from 'element-plus';

const data = reactive({
  user: JSON.parse(localStorage.getItem('userInfo') || '{}')
});

const handleFileSuccess = (res) => {
  data.user.avatar = res;
};

const emit = defineEmits(['updateUser']);

const update = async () => {
  let url;
  if (data.user.role === 'ADMIN') {
    url = '/admin/update';
  } else if (data.user.role === 'USER') {
    url = '/user/update';
  }

  try {
    const res = await request.put(url, data.user, {
      successMsg: '更新成功',
      errorMsg: '更新失败，请检查输入',
      showDefaultMsg: true,
      onSuccess: () => {
        localStorage.setItem('userInfo', JSON.stringify(data.user));
        emit('updateUser');
      }
    });

    if (res.code !== '200') {
      ElMessage.error(res.msg);
    }
  } catch (error) {
    console.error('更新失败:', error);
  }
};
</script>
