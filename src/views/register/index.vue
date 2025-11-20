<!-- src/views/register/index.vue -->
<template>
  <login-imgs>
    <div class="w-full text-white">
      <!-- Logo 和标题 -->
      <div class="text-center mb-6">
        <img
          src="@/assets/vue.svg"
          class="w-16 h-16 mb-4 brightness-0 invert"
          alt="logo"
        />
        <h1 class="text-3xl font-semibold m-0 mb-2 text-white">Vue Admin</h1>
      </div>

      <!-- 注册表单 -->
      <el-form
        class="register-form"
        :rules="registerState.registerRules"
        :model="registerState.registerForm"
        ref="registerForm"
      >
        <el-form-item prop="username" class="mb-4">
          <el-input
            placeholder="请输入用户名"
            v-model="registerState.registerForm.username"
            :disabled="registerState.loading"
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

        <el-form-item prop="password" class="mb-4">
          <el-input
            placeholder="请输入密码"
            v-model="registerState.registerForm.password"
            type="password"
            autocomplete="off"
            show-password
            :disabled="registerState.loading"
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

        <el-form-item prop="confirmPassword" class="mb-4">
          <el-input
            placeholder="请确认密码"
            v-model="registerState.registerForm.confirmPassword"
            type="password"
            autocomplete="off"
            show-password
            :disabled="registerState.loading"
            size="large"
            class="form-input"
          >
            <template #prefix>
              <svg-icon
                icon-name="ant-design:safety-certificate-outlined"
                class="text-white/80"
              />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="role" class="mb-4">
          <el-select
            placeholder="请选择角色"
            v-model="registerState.registerForm.role"
            :disabled="registerState.loading"
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
          class="register-btn w-full font-medium rounded-lg border-none h-45px"
          @click="handleRegister"
          :loading="registerState.loading"
          :disabled="registerState.loading"
        >
          {{ registerState.loading ? '注册中...' : '注册' }}
        </el-button>
      </el-form>

      <!-- 其他操作 -->
      <div class="mt-4 text-center">
        <div class="flex justify-center">
          <router-link
            to="/login"
            class="text-sm text-white/80 no-underline hover:text-white transition-colors"
            >已有账户？立即登录</router-link
          >
        </div>
      </div>
    </div>
  </login-imgs>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import type { FormInstance } from 'element-plus';

const { register } = useUserStore();
const router = useRouter();

interface ValidatorCallback {
  (error?: Error): void;
}

const registerState = reactive({
  registerForm: {
    username: '',
    password: '',
    confirmPassword: '',
    role: 'USER'
  },
  registerRules: {
    username: [
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur'
      },
      {
        min: 3,
        max: 20,
        message: '用户名长度为3-20个字符',
        trigger: 'blur'
      }
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur'
      },
      {
        min: 6,
        max: 20,
        message: '密码长度为6-20个字符',
        trigger: 'blur'
      }
    ],
    confirmPassword: [
      {
        required: true,
        message: '请确认密码',
        trigger: 'blur'
      },
      {
        validator: (rule: any, value: string, callback: ValidatorCallback) => {
          if (value !== registerState.registerForm.password) {
            callback(new Error('两次输入的密码不一致'));
          } else {
            callback();
          }
        },
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

const registerFormInstance = useTemplateRef<FormInstance>('registerForm');

const handleRegister = () => {
  registerFormInstance.value?.validate(async (valid) => {
    if (valid) {
      try {
        registerState.loading = true;
        const { confirmPassword, ...registerData } = registerState.registerForm;
        await register(registerData); // 🔥 调用你的 store 方法
        await router.push('/login');
      } catch (error: any) {
        // ElMessage 已在 store 中处理
        console.error('注册失败:', error);
      } finally {
        registerState.loading = false;
      }
    }
  });
};
</script>
<style lang="scss" scoped>
.register-form {
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

  .register-btn {
    background: linear-gradient(135deg, #42b883 0%, #369970 100%);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(66, 184, 131, 0.4);
    }

    &:active {
      transform: translateY(0);
    }
  }
}
</style>
