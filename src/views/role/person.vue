<template>
  <div class="role-page profile-page">
    <div class="card profile-card">
      <div class="profile-header">
        <div class="header-main">
          <div class="icon-badge">
            <svg-icon
              icon-name="ant-design:user-outlined"
              class="text-white size-5"
            />
          </div>
          <div class="profile-title">
            <p class="header-label">个人中心</p>
            <h2 class="header-title">完善信息，让团队更了解你</h2>
          </div>
          <el-tag effect="plain" type="success" v-if="data.user.role">
            {{ data.user.role }}
          </el-tag>
        </div>
        <div class="header-actions">
          <el-button type="primary" plain @click="openPasswordDialog">
            <svg-icon
              icon-name="ant-design:safety-outlined"
              class="m-r-6px size-4"
            />
            <span>修改密码</span>
          </el-button>
        </div>
      </div>

      <div class="profile-summary">
        <el-avatar :src="data.user.avatar" class="profile-avatar" :size="64">
          {{ summaryInitial }}
        </el-avatar>
        <div>
          <div class="summary-name">
            {{ data.user.name || data.user.username }}
          </div>
          <p class="summary-meta">账号：{{ data.user.username }}</p>
          <p class="summary-meta">邮箱：{{ data.user.email || '未填写' }}</p>
        </div>
      </div>

      <el-form
        ref="formRef"
        :model="data.user"
        label-width="80px"
        class="profile-form"
      >
        <div class="form-grid">
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
          <el-form-item prop="avatar" label="头像" class="avatar-item">
            <el-upload
              action="https://sweetzzx.dpdns.org/files/upload"
              :headers="{ token: data.user.token }"
              :on-success="handleFileSuccess"
              list-type="picture-card"
              :show-file-list="false"
            >
              <div class="upload-slot">
                <svg-icon
                  icon-name="ant-design:cloud-upload-outlined"
                  class="size-6"
                />
                <span class="upload-text">上传头像</span>
              </div>
            </el-upload>
          </el-form-item>
        </div>
      </el-form>
      <div class="form-footer">
        <el-button type="primary" class="save-btn" @click="update"
          >保 存</el-button
        >
      </div>
    </div>

    <el-dialog
      v-model="passwordState.visible"
      title="修改密码"
      width="460px"
      class="dialog-panel"
      destroy-on-close
      @close="handleDialogClose"
    >
      <el-form
        ref="passwordFormRef"
        :model="passwordState.form"
        :rules="passwordState.rules"
        label-width="90px"
        class="password-form"
      >
        <el-form-item prop="password" label="原密码">
          <el-input
            show-password
            v-model="passwordState.form.password"
            autocomplete="off"
            placeholder="请输入原密码"
          />
        </el-form-item>
        <el-form-item prop="newPassword" label="新密码">
          <el-input
            show-password
            v-model="passwordState.form.newPassword"
            autocomplete="off"
            placeholder="请输入新密码"
          />
        </el-form-item>
        <el-form-item prop="new2Password" label="确认密码">
          <el-input
            show-password
            v-model="passwordState.form.new2Password"
            autocomplete="off"
            placeholder="请再次输入新密码"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleDialogClose">取 消</el-button>
          <el-button type="primary" @click="updatePassword">保 存</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import request from '@/api/config/request';
import { ElMessage } from 'element-plus';

const props = defineProps<{
  openSecurity?: boolean;
}>();

const route = useRoute();
const router = useRouter();

const data = reactive({
  user: JSON.parse(localStorage.getItem('userInfo') || '{}')
});

const passwordState = reactive({
  visible: false,
  form: {
    password: '',
    newPassword: '',
    new2Password: ''
  },
  rules: {
    password: [{ required: true, message: '请填写原密码', trigger: 'blur' }],
    newPassword: [{ required: true, message: '请填写新密码', trigger: 'blur' }],
    new2Password: [
      {
        validator: (_: any, value: string, callback: (err?: Error) => void) => {
          if (!value) {
            callback(new Error('请确认新密码'));
          } else if (value !== passwordState.form.newPassword) {
            callback(new Error('两次输入的密码不一致'));
          } else {
            callback();
          }
        },
        trigger: 'blur'
      }
    ]
  } as FormRules
});

const formRef = ref<FormInstance>();
const passwordFormRef = ref<FormInstance>();

const summaryInitial = computed(() =>
  (data.user.name || data.user.username || 'U').slice(0, 1)
);

const handleFileSuccess = (res: string) => {
  data.user.avatar = res;
};

const emit = defineEmits(['updateUser']);

const resetPasswordForm = () => {
  passwordState.form.password = '';
  passwordState.form.newPassword = '';
  passwordState.form.new2Password = '';
  passwordFormRef.value?.clearValidate();
};

const openPasswordDialog = () => {
  passwordState.visible = true;
};

const handleDialogClose = async () => {
  passwordState.visible = false;
  resetPasswordForm();
  if (
    route.meta.openSecurity ||
    props.openSecurity ||
    route.query.security === '1'
  ) {
    await router.replace({ name: 'person' });
  }
};

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

const updatePassword = async () => {
  const valid = await passwordFormRef.value?.validate();
  if (!valid) return;

  try {
    await request.post(
      '/updatePassword',
      {
        oldPassword: passwordState.form.password,
        newPassword: passwordState.form.newPassword
      },
      {
        successMsg: '密码修改成功，您将被重新登录',
        errorMsg: '修改密码失败，请重试',
        showDefaultMsg: true,
        onSuccess: () => {
          setTimeout(() => {
            localStorage.removeItem('userInfo');
            location.href = '/login';
          }, 500);
        }
      }
    );
    handleDialogClose();
  } catch (error) {
    console.error('密码修改请求失败:', error);
  }
};

const maybeOpenSecurity = () => {
  const shouldOpen =
    props.openSecurity ||
    route.meta.openSecurity ||
    route.query.security === '1';
  if (shouldOpen && !passwordState.visible) {
    openPasswordDialog();
  }
};

watch(
  () => route.fullPath,
  () => {
    maybeOpenSecurity();
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.role-page {
  @apply flex flex-col items-center;
}

.profile-page {
  @apply max-w-900px w-full;
}

.profile-card {
  @apply card flex flex-col gap-16px;
}

.profile-header {
  @apply flex items-center justify-between gap-12px flex-wrap;
}

.header-main {
  @apply flex items-center gap-12px;
}

.profile-title {
  @apply flex-1;
}

.header-actions {
  @apply flex items-center gap-8px;
}

.icon-badge {
  @apply flex items-center justify-center w-48px h-48px rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 shadow-md;
}

.header-label {
  @apply text-12px color-[#6b7280] mb-2px;
}

.header-title {
  @apply text-18px font-semibold color-[#111827] m-0;
}

.profile-summary {
  @apply flex items-center gap-12px p-12px rounded-lg bg-[#f6f8fb] border border-[#edf0f5];
}

.profile-avatar {
  @apply rounded-full shadow-sm bg-white text-16px font-semibold;
}

.summary-name {
  @apply text-16px font-semibold text-[#111827];
}

.summary-meta {
  @apply text-12px text-gray-500 mb-2px;
}

.profile-form {
  @apply w-full;

  :deep(.el-form-item__label) {
    @apply text-gray-600;
  }
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px 16px;
}

.avatar-item {
  @apply col-span-full;

  :deep(.el-upload) {
    @apply bg-[#f5f7fb] border-dashed border border-[#d6e0f0] rounded-lg w-full h-36 flex items-center justify-center cursor-pointer transition-all duration-200;

    &:hover {
      @apply border-[#8ab4f8] bg-[#eef4ff];
    }
  }

  .upload-slot {
    @apply flex flex-col items-center gap-6px text-[#3b82f6];
  }

  .upload-text {
    @apply text-13px;
  }
}

.form-footer {
  @apply flex justify-end;
}

.save-btn {
  @apply h-44px px-26px rounded-lg;
}

.password-form {
  @apply w-full flex flex-col gap-10px;

  :deep(.el-input__wrapper) {
    @apply h-42px shadow-none border border-[#e5e7eb] rounded-md bg-white;
    transition: all 0.2s ease;

    &:hover {
      @apply border-[#93c5fd];
    }

    &.is-focus {
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
      @apply border-[#3b82f6];
    }
  }
}

.dialog-panel {
  :deep(.el-dialog) {
    @apply rounded-xl;
  }

  .dialog-footer {
    @apply flex justify-end gap-10px;
  }
}
</style>
