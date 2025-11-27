<!-- src/views/login/index.vue -->
<template>
  <login-imgs>
    <div class="w-full text-white">
      <!-- Logo 和标题 -->
      <div class="text-center mb-8">
        <img
          src="@/assets/vue.svg"
          class="w-16 h-16 mb-4 brightness-0 invert"
          alt="logo"
        />
        <h1 class="text-3xl font-semibold m-0 mb-2 text-white">Vue Admin</h1>
        <p class="text-sm text-white/90 m-0">欢迎回来，请登录您的账户</p>
      </div>

      <!-- 登录表单 -->
      <el-form
        class="login-form"
        :rules="loginState.loginRules"
        :model="loginState.loginForm"
        ref="loginForm"
      >
        <el-form-item prop="username" class="mb-5">
          <el-input
            placeholder="请输入用户名"
            v-model="loginState.loginForm.username"
            :disabled="loginState.loading"
            size="large"
            class="form-input"
          >
            <template #prefix>
              <svg-icon
                icon-name="ant-design:user-outlined"
                class="text-white/80"
              />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password" class="mb-5">
          <el-input
            placeholder="请输入密码"
            v-model="loginState.loginForm.password"
            type="password"
            autocomplete="on"
            show-password
            :disabled="loginState.loading"
            @keyup.enter="handleLogin"
            size="large"
            class="form-input"
          >
            <template #prefix>
              <svg-icon
                icon-name="ant-design:lock-outlined"
                class="text-white/80"
              />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="role" class="mb-5">
          <el-select
            placeholder="请选择角色"
            v-model="loginState.loginForm.role"
            :disabled="loginState.loading"
            size="large"
            class="form-input role-select"
          >
            <template #prefix>
              <svg-icon
                icon-name="ant-design:crown-outlined"
                class="text-white/80"
              />
            </template>
            <el-option label="管理员" value="ADMIN" />
            <el-option label="普通用户" value="USER" />
          </el-select>
        </el-form-item>

        <el-button
          type="primary"
          size="large"
          class="login-btn w-full font-medium rounded-lg border-none h-45px"
          @click="handleLogin"
          :loading="loginState.loading"
          :disabled="loginState.loading"
        >
          {{ loginState.loading ? '登录中...' : '登录' }}
        </el-button>
      </el-form>

      <!-- 其他操作 -->
      <div class="mt-6 text-center">
        <div class="flex justify-between">
          <a
            href="#"
            class="text-sm text-white/80 no-underline hover:text-white hover:underline transition-colors"
            >忘记密码？</a
          >
          <router-link
            to="/register"
            class="text-sm text-white/80 no-underline hover:text-white hover:underline transition-colors"
            >注册账户</router-link
          >
        </div>
      </div>
    </div>
  </login-imgs>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import type { FormInstance } from 'element-plus';

const { login } = useUserStore();
const router = useRouter();

const loginState = reactive({
  loginForm: {
    username: '',
    password: '',
    role: 'USER'
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
    ],
    role: [
      {
        required: true,
        message: '请选择角色',
        trigger: 'change'
      }
    ]
  },
  loading: false
});

const loginFormInstance = useTemplateRef<FormInstance>('loginForm');

const handleLogin = () => {
  loginFormInstance.value?.validate(async (valid) => {
    if (valid) {
      try {
        loginState.loading = true;
        await login(loginState.loginForm);
        await router.push('/dashboard');
      } catch (error: any) {
        // ElMessage 已在 store 中处理
        console.error('登录失败:', error);
      } finally {
        loginState.loading = false;
      }
    }
  });
};
</script>

<style lang="scss" scoped>
.login-form {
  .form-input {
    :deep(.el-input__wrapper) {
      @apply border border-white/25 rounded-lg shadow-none bg-white/8;
      backdrop-filter: blur(8px);
      transition: all 0.3s ease;

      &:hover {
        @apply bg-white/12 border-white/40;
      }

      &.is-focus {
        @apply bg-white/15 border-blue-500;
        box-shadow: 0 0 0 2px theme('colors.blue.500/25');
      }
    }

    :deep(.el-input__inner) {
      @apply text-white;

      &::placeholder {
        @apply text-white/70;
      }
    }
  }

  .role-select {
    :deep(.el-select__wrapper) {
      @apply border border-white/25 rounded-lg shadow-none bg-white/8;
      backdrop-filter: blur(8px);
      transition: all 0.3s ease;

      &:hover {
        @apply bg-white/12 border-white/40;
      }

      &.is-focused {
        @apply bg-white/15 border-blue-500;
        box-shadow: 0 0 0 2px theme('colors.blue.500/25');
      }

      .el-select__selected-item {
        @apply text-white;
      }

      .el-select__placeholder {
        @apply text-white/70;
      }
    }
  }

  .login-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }

    &:active {
      transform: translateY(0);
    }
  }
}
</style>
