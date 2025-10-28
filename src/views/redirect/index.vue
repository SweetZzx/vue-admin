<script lang="ts">
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    // 在组件挂载后立即执行重定向
    onMounted(() => {
      const { params, query } = route;

      // 获取要重定向的路径
      let redirectPath = params.path as string;

      // 确保路径以 / 开头
      if (redirectPath && !redirectPath.startsWith('/')) {
        redirectPath = `/${redirectPath}`;
      }

      // 如果没有路径，默认跳转到首页
      if (!redirectPath || redirectPath === '/') {
        redirectPath = '/dashboard'; // 或者你的默认首页
      }

      console.log('重定向到:', redirectPath, '查询参数:', query);

      // 执行重定向 - 使用 replace 避免在历史记录中留下 redirect 路径
      router
        .replace({
          path: redirectPath,
          query
        })
        .catch((error) => {
          console.error('重定向失败:', error);
          // 失败时跳转到首页
          router.replace('/dashboard');
        });
    });

    // 返回空渲染
    return () => null;
  }
};
</script>
