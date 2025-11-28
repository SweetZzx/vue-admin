<template>
  <div class="role-page">
    <div class="card page-header">
      <div class="header-left">
        <div class="icon-badge">
          <svg-icon
            icon-name="ant-design:user-switch-outlined"
            class="text-white size-5"
          />
        </div>
        <div>
          <p class="header-label">普通用户列表</p>
        </div>
      </div>
      <div class="header-meta">
        <el-tag effect="plain" type="success">共 {{ data.total }} 位</el-tag>
        <el-tag effect="plain" type="info">已选 {{ data.rows.length }}</el-tag>
      </div>
    </div>

    <div class="card filter-card">
      <div class="section-title">
        <svg-icon
          icon-name="ant-design:search-outlined"
          class="text-blue-500 size-5"
        />
        <span>快速筛选</span>
      </div>
      <div class="filter-grid">
        <el-input
          clearable
          @clear="load"
          class="filter-input"
          v-model="data.username"
          placeholder="请输入账号查询"
        >
          <template #prefix>
            <svg-icon
              icon-name="ant-design:idcard-outlined"
              class="text-gray-500 size-4"
            />
          </template>
        </el-input>
        <el-input
          clearable
          @clear="load"
          class="filter-input"
          v-model="data.name"
          placeholder="请输入名称查询"
        >
          <template #prefix>
            <svg-icon
              icon-name="ant-design:user-outlined"
              class="text-gray-500 size-4"
            />
          </template>
        </el-input>
        <div class="filter-actions">
          <el-button type="primary" @click="load">
            <svg-icon
              icon-name="ant-design:search-outlined"
              class="m-r-6px size-4"
            />
            <span>查 询</span>
          </el-button>
          <el-button @click="reset">
            <svg-icon
              icon-name="ant-design:reload-outlined"
              class="m-r-6px size-4"
            />
            <span>重 置</span>
          </el-button>
        </div>
      </div>
    </div>

    <div class="card action-card">
      <div class="action-left">
        <el-button type="primary" plain @click="handleAdd">
          <svg-icon
            icon-name="ant-design:plus-circle-outlined"
            class="m-r-6px size-4"
          />
          <span>新增用户</span>
        </el-button>
        <el-button type="danger" plain @click="deleteBatch">
          <svg-icon
            icon-name="ant-design:delete-outlined"
            class="m-r-6px size-4"
          />
          <span>批量删除</span>
        </el-button>
        <el-button type="info" plain @click="exportData">
          <svg-icon
            icon-name="ant-design:export-outlined"
            class="m-r-6px size-4"
          />
          <span>批量导出</span>
        </el-button>
        <el-upload
          class="upload-btn"
          action="https://sweetzzx.dpdns.org/user/import"
          :show-file-list="false"
          :on-success="handleImportSuccess"
        >
          <el-button type="success" plain>
            <svg-icon
              icon-name="ant-design:import-outlined"
              class="m-r-6px size-4"
            />
            <span>批量导入</span>
          </el-button>
        </el-upload>
      </div>
      <div class="action-right">
        <svg-icon
          icon-name="ant-design:info-circle-outlined"
          class="text-gray-500 size-4"
        />
        <span>所有变更将实时生效，注意检查选择项</span>
      </div>
    </div>

    <div class="card table-card">
      <el-table
        :data="data.tableData"
        class="w-full"
        stripe
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" class="w-48px" />
        <el-table-column label="头像" class="w-60px">
          <template #default="scope">
            <el-image
              :src="scope.row.avatar || dfimg"
              :preview-src-list="[scope.row.avatar || data.DEFAULT_AVATAR]"
              :preview-teleported="true"
              class="avatar-img"
            />
          </template>
        </el-table-column>
        <el-table-column prop="username" label="账号" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column label="操作" class="w-120px action-cell">
          <template #default="scope">
            <el-button
              class="p-0 icon-btn"
              type="text"
              @click="handleEdit(scope.row)"
            >
              <svg-icon
                icon-name="ant-design:edit-outlined"
                class="text-blue-500 size-5"
              />
            </el-button>
            <el-button
              class="p-0 icon-btn"
              type="text"
              @click="del(scope.row.id)"
            >
              <svg-icon
                icon-name="ant-design:delete-outlined"
                class="text-red-500 size-5"
              />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="card pagination-card">
      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="data.pageNum"
          v-model:page-size="data.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[5, 10, 20]"
          :total="data.total"
          @current-change="load"
          @size-change="load"
        />
      </div>
    </div>

    <el-dialog
      title="普通用户信息"
      v-model="data.formVisible"
      class="dialog-panel"
      width="520px"
      destroy-on-close
    >
      <el-form
        ref="formRef"
        :model="data.form"
        :rules="data.rules"
        label-width="80px"
        class="dialog-form"
      >
        <el-form-item prop="username" label="账号">
          <el-input
            v-model="data.form.username"
            autocomplete="off"
            placeholder="请输入账号"
          />
        </el-form-item>
        <el-form-item prop="name" label="名称">
          <el-input
            v-model="data.form.name"
            autocomplete="off"
            placeholder="请输入名称"
          />
        </el-form-item>
        <el-form-item prop="phone" label="电话">
          <el-input
            v-model="data.form.phone"
            autocomplete="off"
            placeholder="请输入电话"
          />
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input
            v-model="data.form.email"
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
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="data.formVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">保 存</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import request from '@/api/config/request';
import { ElMessage, ElMessageBox } from 'element-plus';
import dfimg from '@/assets/imgs/default.jpg';

const data = reactive({
  user: JSON.parse(localStorage.getItem('userInfo') || '{}'),
  username: null,
  name: null,
  pageNum: 1,
  pageSize: 5,
  total: 0,
  tableData: [],
  formVisible: false,
  form: {},
  DEFAULT_AVATAR: '/assets/imgs/default.jpg',
  rules: {
    username: [{ required: true, message: '请填写账号', trigger: 'blur' }],
    name: [{ required: true, message: '请填写名称', trigger: 'blur' }],
    phone: [{ required: true, message: '请填写电话', trigger: 'blur' }],
    email: [{ required: true, message: '请填写邮箱', trigger: 'blur' }]
  },
  rows: [],
  ids: []
});

const formRef = ref();

const load = async () => {
  try {
    const res = await request.get('/user/selectPage', {
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      username: data.username,
      name: data.name
    });
    data.tableData = res.list;
    data.total = res.total;
  } catch (error) {
    console.error('加载数据失败:', error);
  }
};

const reset = () => {
  data.username = null;
  data.name = null;
  load();
};

const handleAdd = () => {
  data.formVisible = true;
  data.form = {};
};

const add = async () => {
  const valid = await formRef.value.validate();
  if (valid) {
    try {
      await request.post('/user/add', data.form, {
        successMsg: '新增成功',
        errorMsg: '请确保所有必填字段已填写',
        showDefaultMsg: true,
        onSuccess: () => {
          data.formVisible = false;
          load();
        }
      });
    } catch (error) {
      console.error('新增失败:', error);
    }
  }
};

const handleEdit = (row) => {
  data.form = JSON.parse(JSON.stringify(row));
  data.formVisible = true;
};

const update = async () => {
  const valid = await formRef.value.validate();
  if (valid) {
    try {
      await request.put('/user/update', data.form, {
        successMsg: '修改成功',
        errorMsg: '请确保所有必填字段已填写',
        showDefaultMsg: true,
        onSuccess: () => {
          data.formVisible = false;
          load();
        }
      });
    } catch (error) {
      console.error('修改失败:', error);
    }
  }
};

const save = () => {
  if (data.form.id) {
    update();
  } else {
    add();
  }
};

const del = async (id) => {
  try {
    await ElMessageBox.confirm('删除后无法恢复，您确认删除吗？', '删除确认', {
      type: 'warning'
    });
    await request.delete(`/user/delete/${id}`, {
      successMsg: '删除成功',
      onSuccess: () => {
        load();
      }
    });
  } catch (error) {
    console.error('删除失败:', error);
  }
};

const handleSelectionChange = (rows) => {
  data.rows = rows;
  data.ids = data.rows.map((v) => v.id);
};

const deleteBatch = async () => {
  if (data.rows.length === 0) {
    ElMessage.warning('请选择数据');
    return;
  }
  try {
    await ElMessageBox.confirm('删除后无法恢复，您确认删除吗？', '删除确认', {
      type: 'warning'
    });
    await request.delete(
      '/user/deleteBatch',
      { data: data.rows },
      {
        successMsg: '批量删除成功',
        errorMsg: '批量删除失败',
        showDefaultMsg: true,
        onSuccess: () => {
          load();
        }
      }
    );
  } catch (error) {
    console.error('批量删除失败:', error);
  }
};

const exportData = () => {
  const idsStr = data.ids.join(',');
  const url =
    `https://sweetzzx.dpdns.org/user/export?username=${data.username || ''}` +
    `&name=${data.name || ''}` +
    `&ids=${idsStr}` +
    `&token=${data.user.token}`;
  window.open(url);
};

const handleImportSuccess = (res) => {
  if (res.code === '200') {
    ElMessage.success('批量导入数据成功');
    load();
  } else {
    ElMessage.error(res.msg);
  }
};

const handleFileSuccess = (res) => {
  data.form.avatar = res.data;
};

onMounted(() => {
  load();
});
</script>

<style lang="scss" scoped>
.role-page {
  @apply flex flex-col gap-12px;
}

.page-header {
  @apply flex items-center justify-between gap-12px;
  background: linear-gradient(90deg, #f5f8ff 0%, #ffffff 100%);

  .header-left {
    @apply flex items-center gap-12px;
  }

  .icon-badge {
    @apply flex items-center justify-center w-48px h-48px rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-md;
  }

  .header-label {
    @apply text-12px color-[#6b7280] mb-2px;
  }

  .header-title {
    @apply text-18px font-semibold color-[#1f2937] m-0;
  }

  .header-meta {
    @apply flex items-center gap-8px;
  }
}

.section-title {
  @apply flex items-center gap-8px text-14px font-semibold text-[#1f2937];
}

.filter-card {
  @apply flex flex-col gap-12px;
}

.filter-grid {
  @apply flex flex-wrap items-center gap-10px;
}

.filter-input {
  @apply w-240px;

  :deep(.el-input__wrapper) {
    @apply h-40px shadow-none border border-[#e5e7eb] rounded-md bg-white;
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

.filter-actions {
  @apply flex gap-8px flex-wrap;

  .el-button {
    @apply h-40px;
  }
}

.action-card {
  @apply flex flex-wrap items-center justify-between gap-10px;

  .action-left {
    @apply flex flex-wrap items-center gap-8px;
  }

  .action-right {
    @apply flex items-center gap-6px text-12px text-gray-500;
  }

  .upload-btn {
    @apply inline-flex;
  }
}

.table-card {
  @apply overflow-hidden;

  :deep(.el-table__header-wrapper th) {
    @apply bg-[#f5f7fb] text-[#1f2937] font-medium;
  }

  :deep(.el-table__row:hover > td) {
    background: #f8fbff;
  }

  :deep(.el-table__cell) {
    @apply align-middle;
  }

  .avatar-img {
    @apply w-40px h-40px rounded-full object-cover;
  }

  .action-cell {
    @apply text-center;
  }

  .icon-btn {
    @apply m-r-10px;
  }
}

.pagination-card {
  .pagination-wrapper {
    @apply flex justify-between items-center flex-wrap gap-10px;

    :deep(.el-pagination) {
      @apply w-full justify-end;
    }
  }
}

.dialog-panel {
  :deep(.el-dialog) {
    @apply rounded-xl;
  }

  .dialog-form {
    @apply p-10px pt-0;
  }

  .dialog-footer {
    @apply flex justify-end gap-10px;
  }
}
</style>
