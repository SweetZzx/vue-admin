<template>
  <div class="dashboard-container">
    <!-- 头部欢迎信息 -->
    <el-row :gutter="20" class="welcome-section">
      <el-col :span="16">
        <div class="welcome-card">
          <div class="welcome-content">
            <h2>欢迎回来，Admin 👋</h2>
            <p>今天是 {{ formattedDate }}，祝你有美好的一天！</p>
          </div>
          <div class="welcome-stats">
            <div class="stat-item">
              <SvgIcon iconName="User" customClass="text-32px" />
              <div>
                <p class="stat-number">{{ statsData.users }}</p>
                <p class="stat-label">总用户数</p>
              </div>
            </div>
            <div class="stat-item">
              <SvgIcon iconName="ShoppingCart" customClass="text-32px" />
              <div>
                <p class="stat-number">{{ statsData.orders }}</p>
                <p class="stat-label">订单总数</p>
              </div>
            </div>
            <div class="stat-item">
              <SvgIcon iconName="TrendCharts" customClass="text-32px" />
              <div>
                <p class="stat-number">¥{{ statsData.revenue }}</p>
                <p class="stat-label">总收入</p>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <el-card class="quick-actions-card">
          <template #header>
            <div class="card-header">
              <span>快捷操作</span>
            </div>
          </template>
          <div class="quick-actions">
            <el-button type="primary" plain @click="handleAction('addUser')">
              <SvgIcon iconName="Plus" customClass="mr-8px" />
              添加用户
            </el-button>
            <el-button type="success" plain @click="handleAction('addProduct')">
              <SvgIcon iconName="Goods" customClass="mr-8px" />
              新增商品
            </el-button>
            <el-button
              type="warning"
              plain
              @click="handleAction('viewReports')"
            >
              <SvgIcon iconName="Document" customClass="mr-8px" />
              查看报告
            </el-button>
            <el-button type="info" plain @click="handleAction('settings')">
              <SvgIcon iconName="Setting" customClass="mr-8px" />
              系统设置
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 统计卡片 -->
    <el-row :gutter="20" class="stats-section">
      <el-col :span="6" v-for="item in countData" :key="item.name">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-card-content">
            <div class="stat-icon" :style="{ backgroundColor: item.color }">
              <SvgIcon
                :iconName="item.icon"
                customClass="text-24px text-white"
              />
            </div>
            <div class="stat-info">
              <p class="stat-value">¥{{ item.value }}</p>
              <p class="stat-name">{{ item.name }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="20" class="charts-section">
      <el-col :span="16">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>销售趋势</span>
              <el-select v-model="timeRange" size="small" style="width: 120px">
                <el-option label="近7天" value="7days"></el-option>
                <el-option label="近30天" value="30days"></el-option>
                <el-option label="近90天" value="90days"></el-option>
              </el-select>
            </div>
          </template>
          <div ref="salesChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>用户分布</span>
            </div>
          </template>
          <div ref="userChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 数据表格 -->
    <el-row :gutter="20" class="tables-section">
      <el-col :span="24">
        <el-card class="table-card">
          <template #header>
            <div class="card-header">
              <span>最新订单</span>
              <el-button link type="primary" @click="viewAllOrders"
                >查看全部</el-button
              >
            </div>
          </template>
          <el-table :data="orderTableData" style="width: 100%">
            <el-table-column
              prop="id"
              label="订单ID"
              width="100"
            ></el-table-column>
            <el-table-column prop="user" label="用户"></el-table-column>
            <el-table-column prop="product" label="商品"></el-table-column>
            <el-table-column prop="amount" label="金额"></el-table-column>
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="status" label="状态">
              <template #default="scope">
                <el-tag :type="getStatusType(scope.row.status)">
                  {{ scope.row.status }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, reactive, computed } from 'vue';
import * as echarts from 'echarts';
import SvgIcon from '@/components/SvgIcon/index.vue';

const { proxy } = getCurrentInstance();

// 数据状态
const tableData = ref([]);
const countData = ref([]);
const chartData = ref([]);
const orderTableData = ref([]);
const statsData = reactive({
  users: 1286,
  orders: 342,
  revenue: '28,640'
});

// 图表引用
const salesChartRef = ref(null);
const userChartRef = ref(null);
let salesChart = null;
let userChart = null;

// 时间范围选择
const timeRange = ref('7days');

// 格式化当前日期
const formattedDate = computed(() => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const weekday = weekdays[date.getDay()];
  return `${year}年${month}月${day}日 ${weekday}`;
});

// 获取图片URL
const getImgUrl = (user) => {
  return new URL(`../assets/images/${user}.png`, import.meta.url).href;
};

// 快捷操作处理
const handleAction = (action) => {
  switch (action) {
    case 'addUser':
      proxy.$message.success('添加用户功能');
      break;
    case 'addProduct':
      proxy.$message.success('新增商品功能');
      break;
    case 'viewReports':
      proxy.$message.success('查看报告功能');
      break;
    case 'settings':
      proxy.$message.success('系统设置功能');
      break;
  }
};

// 查看所有订单
const viewAllOrders = () => {
  proxy.$message.info('查看全部订单');
};

// 获取状态标签类型
const getStatusType = (status) => {
  const statusMap = {
    已完成: 'success',
    处理中: 'warning',
    已取消: 'danger',
    待支付: 'info'
  };
  return statusMap[status] || 'info';
};

// 获取表格数据
const getTableData = async () => {
  try {
    // 模拟API调用
    const data = {
      tableData: [
        { name: 'Vue入门教程', todayBuy: 120, monthBuy: 860, totalBuy: 3420 },
        { name: 'React进阶实战', todayBuy: 80, monthBuy: 560, totalBuy: 2100 },
        {
          name: 'Node.js开发指南',
          todayBuy: 65,
          monthBuy: 420,
          totalBuy: 1850
        },
        { name: 'Python数据分析', todayBuy: 90, monthBuy: 680, totalBuy: 2980 },
        { name: 'Java企业级开发', todayBuy: 75, monthBuy: 510, totalBuy: 2350 }
      ]
    };
    tableData.value = data.tableData;

    // 设置订单表格数据
    orderTableData.value = [
      {
        id: '10001',
        user: '张三',
        product: 'Vue入门教程',
        amount: '¥99.00',
        date: '2023-06-15',
        status: '已完成'
      },
      {
        id: '10002',
        user: '李四',
        product: 'React进阶实战',
        amount: '¥129.00',
        date: '2023-06-15',
        status: '处理中'
      },
      {
        id: '10003',
        user: '王五',
        product: 'Node.js开发指南',
        amount: '¥109.00',
        date: '2023-06-14',
        status: '已完成'
      },
      {
        id: '10004',
        user: '赵六',
        product: 'Python数据分析',
        amount: '¥139.00',
        date: '2023-06-14',
        status: '待支付'
      },
      {
        id: '10005',
        user: '孙七',
        product: 'Java企业级开发',
        amount: '¥119.00',
        date: '2023-06-13',
        status: '已取消'
      }
    ];
  } catch (error) {
    console.error('获取表格数据失败:', error);
  }
};

// 获取统计数据
const getCountData = async () => {
  try {
    // 模拟API调用
    const data = [
      {
        name: '今日销售额',
        value: '12,340',
        icon: 'TrendCharts',
        color: '#40c9c6'
      },
      {
        name: '本月销售额',
        value: '234,560',
        icon: 'ShoppingCart',
        color: '#36a3f7'
      },
      { name: '用户总数', value: '12,860', icon: 'User', color: '#f4516c' },
      { name: '订单总数', value: '3,420', icon: 'Document', color: '#34bfa3' }
    ];
    countData.value = data;
  } catch (error) {
    console.error('获取统计数据失败:', error);
  }
};

// 获取图表数据
const getChartData = async () => {
  try {
    // 模拟API调用
    const salesData = {
      '7days': {
        dates: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        values: [1200, 1900, 1500, 2200, 1800, 2500, 1700]
      },
      '30days': {
        dates: ['第1周', '第2周', '第3周', '第4周'],
        values: [8500, 12300, 9800, 11200]
      },
      '90days': {
        dates: ['4月', '5月', '6月'],
        values: [32000, 38500, 35600]
      }
    };

    const userData = [
      { value: 335, name: '新用户' },
      { value: 510, name: '老用户' },
      { value: 234, name: '潜在用户' },
      { value: 135, name: '流失用户' }
    ];

    // 销售趋势图表
    if (salesChartRef.value) {
      if (!salesChart) {
        salesChart = echarts.init(salesChartRef.value);
      }

      const currentData = salesData[timeRange.value];
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          type: 'category',
          data: currentData.dates
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: currentData.values,
            type: 'line',
            smooth: true,
            areaStyle: {
              opacity: 0.3
            },
            lineStyle: {
              width: 3
            }
          }
        ],
        color: ['#40c9c6']
      };

      salesChart.setOption(option);
    }

    // 用户分布图表
    if (userChartRef.value) {
      if (!userChart) {
        userChart = echarts.init(userChartRef.value);
      }

      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: '0%',
          left: 'center'
        },
        series: [
          {
            name: '用户分布',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '14',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: userData
          }
        ],
        color: ['#40c9c6', '#36a3f7', '#f4516c', '#34bfa3']
      };

      userChart.setOption(option);
    }
  } catch (error) {
    console.error('获取图表数据失败:', error);
  }
};

// 监听时间范围变化
watch(timeRange, () => {
  getChartData();
});

// 初始化图表
const initCharts = () => {
  window.addEventListener('resize', () => {
    if (salesChart) salesChart.resize();
    if (userChart) userChart.resize();
  });
};

onMounted(() => {
  getTableData();
  getCountData();
  getChartData();
  initCharts();
});
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 84px);

  .welcome-section {
    margin-bottom: 20px;

    .welcome-card {
      background: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
      border-radius: 8px;
      padding: 20px;
      color: white;
      height: 100%;

      .welcome-content {
        h2 {
          font-size: 24px;
          margin-bottom: 10px;
        }

        p {
          font-size: 14px;
          opacity: 0.9;
        }
      }

      .welcome-stats {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;

        .stat-item {
          display: flex;
          align-items: center;

          .stat-number {
            font-size: 24px;
            font-weight: bold;
            margin: 0;
          }

          .stat-label {
            font-size: 12px;
            margin: 0;
            opacity: 0.8;
          }
        }
      }
    }

    .quick-actions-card {
      height: 100%;

      .quick-actions {
        display: flex;
        flex-direction: column;
        gap: 15px;

        .el-button {
          width: 100%;
          justify-content: flex-start;
        }
      }
    }
  }

  .stats-section {
    margin-bottom: 20px;

    .stat-card {
      border-radius: 8px;
      overflow: hidden;

      .stat-card-content {
        display: flex;
        align-items: center;

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
        }

        .stat-info {
          .stat-value {
            font-size: 20px;
            font-weight: bold;
            margin: 0 0 5px 0;
          }

          .stat-name {
            font-size: 14px;
            color: #999;
            margin: 0;
          }
        }
      }
    }
  }

  .charts-section {
    margin-bottom: 20px;

    .chart-card {
      border-radius: 8px;

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .chart-container {
        height: 300px;
        width: 100%;
      }
    }
  }

  .tables-section {
    .table-card {
      border-radius: 8px;

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
