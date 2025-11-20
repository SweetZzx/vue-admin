<template>
  <el-dropdown @command="handleCommand">
    <div
      class="flex items-center cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors"
    >
      <img
        :src="userAvatar"
        class="w-10 h-10 rounded-full outline-none object-cover border-2 border-gray-200"
        @error="handleImageError"
      />
      <span class="text-sm text-gray-700 ml-2 font-medium hidden sm:block">
        {{ displayName }}
      </span>
      <svg-icon
        icon-name="ant-design:down-outlined"
        class="ml-1 text-gray-500 text-xs hidden sm:block"
      />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="home">
          <svg-icon icon-name="ant-design:home-outlined" class="mr-2" />
          首页
        </el-dropdown-item>
        <el-dropdown-item command="profile">
          <svg-icon icon-name="ant-design:user-outlined" class="mr-2" />
          个人设置
        </el-dropdown-item>
        <el-dropdown-item divided command="logout">
          <svg-icon
            icon-name="ant-design:logout-outlined"
            class="mr-2 text-red-500"
          />
          <span class="text-red-500">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import defaultAvatar from '@/assets/vue.svg';
import { useUserStore } from '@/stores/user';
import { ElMessageBox } from 'element-plus';

const { logout, state } = useUserStore();
const router = useRouter();

const userAvatar = computed(() => {
  return state.userInfo?.avatar || defaultAvatar;
});

const displayName = computed(() => {
  return state.userInfo?.name || state.userInfo?.username || '用户';
});

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = defaultAvatar; // 加载失败时使用默认头像
};

// 统一处理下拉菜单命令
const handleCommand = async (command: string) => {
  switch (command) {
    case 'home':
      await router.push('/dashboard');
      break;
    case 'profile':
      await router.push('/profile/index');
      break;
    case 'logout':
      handleLogout();
      break;
  }
};

// 处理退出登录
const handleLogout = () => {
  ElMessageBox.confirm('确定要退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    confirmButtonClass: 'el-button--danger'
  })
    .then(async () => {
      logout();
      await router.push('/login');
    })
    .catch(() => {
      console.log('取消退出登录');
    });
};
</script>
