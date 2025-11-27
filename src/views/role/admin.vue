<template>
  <div>
    <div class="card m-b-5px">
      <el-input
        clearable
        @clear="load"
        class="w-260px m-r-5px"
        v-model="data.username"
        placeholder="请输入账号查询"
      />
      <el-input
        clearable
        @clear="load"
        class="w-260px m-r-5px"
        v-model="data.name"
        placeholder="请输入名称查询"
      />
      <el-button type="primary" @click="load">查 询</el-button>
      <el-button @click="reset">重 置</el-button>
    </div>
    <div class="card m-b-5px">
      <el-button type="primary" @click="handleAdd">新 增</el-button>
      <el-button type="danger" @click="deleteBatch">批量删除</el-button>
      <el-button type="info" @click="exportData">批量导出</el-button>
      <el-upload
        class="inline-block m-l-10px"
        action="https://sweetzzx.dpdns.org/admin/import"
        :show-file-list="false"
        :on-success="handleImportSuccess"
      >
        <el-button type="success">批量导入</el-button>
      </el-upload>
    </div>

    <div class="card m-b-5px">
      <el-table
        :data="data.tableData"
        class="w-full"
        @selection-change="handleSelectionChange"
        :header-cell-style="{ color: '#333', backgroundColor: '#eaf4ff' }"
      >
        <el-table-column type="selection" class="w-40px" />
        <el-table-column label="头像" class="w-40px">
          <template #default="scope">
            <el-image
              :src="scope.row.avatar || dfimg"
              :preview-src-list="[scope.row.avatar || data.DEFAULT_AVATAR]"
              :preview-teleported="true"
              class="w-40px h-40px rounded-full"
            />
          </template>
        </el-table-column>
        <el-table-column prop="username" label="账号" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column label="操作" class="w-100px">
          <template #default="scope">
            <el-button class="p-0" type="text" @click="handleEdit(scope.row)">
              <svg-icon
                icon-name="ant-design:edit-outlined"
                class="text-blue-500 size-5"
              />
            </el-button>
            <el-button class="p-0" type="text" @click="del(scope.row.id)">
              <svg-icon
                icon-name="ant-design:delete-outlined"
                class="text-red-500 size-5 m-l-10px"
              />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="card">
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

    <el-dialog
      title="管理员信息"
      v-model="data.formVisible"
      class="w-30%"
      destroy-on-close
    >
      <el-form
        ref="formRef"
        :model="data.form"
        :rules="data.rules"
        label-width="80px"
        class="p-5px px-2"
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
    phone: [{ required: true, message: '请填写手机', trigger: 'blur' }],
    email: [{ required: true, message: '请填写邮箱', trigger: 'blur' }]
  },
  rows: [],
  ids: []
});

const formRef = ref();

// 添加方法
const add = async () => {
  const valid = await formRef.value.validate();
  if (valid) {
    try {
      await request.post('/admin/add', data.form, {
        successMsg: '添加成功',
        errorMsg: '请确保所有必填字段已填写',
        showDefaultMsg: true,
        onSuccess: () => {
          data.formVisible = false;
          load(); // 成功后刷新数据
        }
      });
    } catch (error) {
      console.error('添加失败:', error);
    }
  }
};

// 更新方法
const update = async () => {
  const valid = await formRef.value.validate();
  if (valid) {
    try {
      await request.put('/admin/update', data.form, {
        successMsg: '修改成功',
        errorMsg: '请确保所有必填字段已填写',
        showDefaultMsg: true,
        onSuccess: () => {
          data.formVisible = false;
          load(); // 成功后刷新数据
        }
      });
    } catch (error) {
      console.error('修改失败:', error);
    }
  }
};

// 保存方法
const save = () => {
  if (data.form.id) {
    update(); // 调用更新方法
  } else {
    add(); // 调用添加方法
  }
};

// 加载数据方法
const load = async () => {
  try {
    const res = await request.get('/admin/selectPage', {
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
// 重置查询条件
const reset = () => {
  data.username = null;
  data.name = null;
  load();
};

// 处理新增
const handleAdd = () => {
  data.formVisible = true;
  data.form = {};
};

// 处理编辑
const handleEdit = (row) => {
  data.form = JSON.parse(JSON.stringify(row));
  data.formVisible = true;
};

// 处理选择变更
const handleSelectionChange = (rows) => {
  data.rows = rows;
  data.ids = data.rows.map((v) => v.id);
};

// 批量删除
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
      '/admin/deleteBatch',
      { data: data.rows },
      {
        successMsg: '批量删除成功',
        errorMsg: '批量删除失败',
        showDefaultMsg: true,
        onSuccess: () => {
          load(); // 成功后刷新数据
        }
      }
    );
  } catch (error) {
    console.error('批量删除失败:', error);
  }
};

// 单项删除
const del = async (id) => {
  try {
    await ElMessageBox.confirm('删除后无法恢复，您确认删除吗？', '删除确认', {
      type: 'warning'
    });

    await request.delete(`/admin/delete/${id}`, {
      successMsg: '删除成功',
      onSuccess: () => {
        load(); // 成功后刷新数据
      }
    });
  } catch (error) {
    console.error('删除失败:', error);
  }
};

// 成功上传头像处理
const handleFileSuccess = (res) => {
  data.form.avatar = res.data;
};

// 导出数据
const exportData = () => {
  const idsStr = data.ids.join(',');
  const url =
    `https://sweetzzx.dpdns.org/admin/export?username=${data.username || ''}` +
    `&name=${data.name || ''}` +
    `&ids=${idsStr}` +
    `&token=${data.user.token}`;
  window.open(url);
};

// 导入数据成功处理
const handleImportSuccess = (res) => {
  if (res.code === '200') {
    ElMessage.success('批量导入数据成功');
    load(); // 导入成功后刷新表格
  } else {
    ElMessage.error(res.msg);
  }
};

onMounted(() => {
  load();
});
</script>
