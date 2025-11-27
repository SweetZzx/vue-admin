<template>
  <div>
    <SearchBar
      :initialUsername="data.username"
      :initialName="data.name"
      @search="onSearch"
      @reset="reset"
    />

    <ActionBar
      :importUrl="importUrl"
      @add="handleAdd"
      @delete="deleteBatch"
      @export="exportData"
      @importSuccess="handleImportSuccess"
      @importError="handleImportError"
    />

    <div class="card" style="margin-bottom: 5px">
      <el-table
        :data="data.tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :header-cell-style="{ color: '#333', backgroundColor: '#eaf4ff' }"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="头像" width="100">
          <template #default="scope">
            <el-image
              v-if="scope.row.avatar"
              :src="scope.row.avatar"
              :preview-src-list="[scope.row.avatar]"
              :preview-teleported="true"
              style="
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: block;
              "
            />
          </template>
        </el-table-column>
        <el-table-column prop="username" label="账号" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button
              type="primary"
              icon="Edit"
              circle
              @click="handleEdit(scope.row)"
            />
            <el-button
              type="danger"
              icon="Delete"
              circle
              @click="del(scope.row.id)"
            />
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

    <Dialog
      :visible="data.formVisible"
      :rules="data.rules"
      :user="data.user"
      :formData="data.form"
      dialogTitle="管理员信息"
      @close="data.formVisible = false"
      @save="handleSave"
      @fileSuccess="handleFileSuccess"
    />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import request from '@/api/config/request2';
import { ElMessage, ElMessageBox } from 'element-plus';

const data = reactive({
  user: JSON.parse(localStorage.getItem('userInfo') || '{}'),
  username: null,
  name: null,
  pageNum: 1,
  pageSize: 5,
  total: 0,
  tableData: [],
  formVisible: false, // 控制对话框可见性
  form: {}, // 表单数据
  rules: {
    username: [{ required: true, message: '请填写账号', trigger: 'blur' }],
    name: [{ required: true, message: '请填写名称', trigger: 'blur' }],
    phone: [{ required: true, message: '请填写手机', trigger: 'blur' }],
    email: [{ required: true, message: '请填写邮箱', trigger: 'blur' }]
  },
  rows: [],
  ids: []
});

const importUrl = 'https://sweetzzx.dpdns.org/admin/import';

const load = () => {
  request
    .get('/admin/selectPage', {
      params: {
        pageNum: data.pageNum,
        pageSize: data.pageSize,
        username: data.username,
        name: data.name
      }
    })
    .then((res) => {
      if (res.code === '200') {
        data.tableData = res.data.list;
        data.total = res.data.total;
      } else {
        ElMessage.error(res.msg);
      }
    });
};

const reset = () => {
  data.username = null;
  data.name = null;
  load();
};

// 处理搜索事件
const onSearch = (searchParams) => {
  data.username = searchParams.username; // 更新用户名
  data.name = searchParams.name; // 更新名称
  load(); // 调用 load 方法执行查询
};

const handleAdd = () => {
  data.formVisible = true; // 设置对话框可见
  data.form = {}; // 准备空表单数据
};

const handleEdit = (row) => {
  data.form = JSON.parse(JSON.stringify(row)); // 深度拷贝行数据到表单
  data.formVisible = true; // 设置对话框可见
};

const handleSave = (formData) => {
  if (formData.id) {
    update(); // 如果有ID则更新
  } else {
    add(); // 否则添加
  }
};

const add = () => {
  request.post('/admin/add', data.form).then((res) => {
    if (res.code === '200') {
      data.formVisible = false; // 关闭对话框
      ElMessage.success('新增成功');
      load();
    } else {
      ElMessage.error('请确保所有必填字段已填写');
    }
  });
};

const update = () => {
  request.put('/admin/update', data.form).then((res) => {
    if (res.code === '200') {
      data.formVisible = false; // 关闭对话框
      ElMessage.success('修改成功');
      load();
    } else {
      ElMessage.error(res.msg);
    }
  });
};

const del = (id) => {
  ElMessageBox.confirm('删除后无法恢复，您确认删除吗？', '删除确认', {
    type: 'warning'
  })
    .then(() => {
      request.delete(`/admin/delete/${id}`).then((res) => {
        if (res.code === '200') {
          ElMessage.success('删除成功');
          load();
        } else {
          ElMessage.error(res.msg);
        }
      });
    })
    .catch(() => {});
};

const handleSelectionChange = (rows) => {
  data.rows = rows;
  data.ids = data.rows.map((v) => v.id); // 转换成 ID 数组
};

const deleteBatch = () => {
  if (data.rows.length === 0) {
    ElMessage.warning('请选择数据');
    return;
  }
  ElMessageBox.confirm('删除后无法恢复，您确认删除吗？', '删除确认', {
    type: 'warning'
  })
    .then(() => {
      request.delete('/admin/deleteBatch', { data: data.rows }).then((res) => {
        if (res.code === '200') {
          ElMessage.success('批量删除成功');
          load();
        } else {
          ElMessage.error(res.msg);
        }
      });
    })
    .catch(() => {});
};

const exportData = () => {
  const idsStr = data.ids.join(','); // 转换成字符串
  const url =
    `https://sweetzzx.dpdns.org/admin/export?username=${data.username || ''}` +
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

const handleImportError = (err) => {
  ElMessage.error(`导入失败: ${err.message}`); // 处理导入错误
};

const handleFileSuccess = (res) => {
  data.form.avatar = res.data; // 处理头像上传成功
};

// 初次加载数据
load();
</script>
