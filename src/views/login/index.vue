<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import type { FormInstance } from 'element-plus';
const { login } = useUserStore();

const loginState = reactive({
  loginForm: {
    username: '',
    password: ''
  },
  loginRules: {
    username: [
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur'
      }
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur'
      }
    ]
  }
});

const loginFormInstance = useTemplateRef<FormInstance>('loginForm');

const { loginForm, loginRules } = toRefs(loginState);
const handleLogin = () => {
  loginFormInstance.value?.validate(async (valid) => {
    if (valid) {
      const r = await login(loginForm.value);
      console.log(r);
    }
  });
};
</script>

<template>
  <div class="login-container">
    <el-form
      class="login-form"
      :rules="loginRules"
      :model="loginForm"
      ref="loginForm"
    >
      <div class="admin-logo">
        <img src="@/assets/vue.svg" class="logo" alt="logo" />
        <h1 class="name">Vue Admin</h1>
      </div>
      <el-form-item prop="username">
        <el-input placeholder="请输入用户名" v-model="loginForm.username">
          <template #prepend>
            <span class="svg-container">
              <svg-icon icon-name="ant-design:user-outlined"></svg-icon>
            </span>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          placeholder="请输入密码"
          v-model="loginForm.password"
          type="password"
          autocomplete="on"
          show-password
        >
          <template #prepend>
            <span class="svg-container">
              <svg-icon icon-name="ant-design:lock-outlined"></svg-icon>
            </span>
          </template>
        </el-input>
      </el-form-item>

      <!--登录按钮-->
      <el-button type="primary" w-full mb-30px @click="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  @apply min-h-screen mx-auto w-full;
  .login-form {
    @apply w-500px mx-auto py-50px;
  }
}
</style>
