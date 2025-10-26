import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';

const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard/index.vue'),
        meta: {
          icon: 'ant-design:bank-outlined',
          title: 'Dashboard'
        }
      }
    ]
  }
];

const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [
      {
        path: 'index',
        name: 'documentation',
        component: () => import('@/views/documentation/index.vue'),
        meta: {
          icon: 'ant-design:database-filled',
          title: 'documentation'
        }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    redirect: '/test/index',
    children: [
      {
        path: 'index/:id',
        name: 'test',
        component: () => import('@/views/test/index.vue'),
        meta: {
          icon: 'ant-design:database-filled',
          title: 'test'
        }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        name: 'guide',
        component: () => import('@/views/guide/index.vue'),
        meta: {
          icon: 'ant-design:question-circle-outlined',
          title: 'guide'
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/menu',
    meta: {
      icon: 'ant-design:setting-outlined',
      title: 'system',
      alwaysShow: true,
      breadcrumb: false
    },
    children: [
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/system/menu.vue'),
        meta: {
          icon: 'ant-design:menu-outlined',
          title: 'menu'
        }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/system/role.vue'),
        meta: {
          icon: 'ant-design:user-outlined',
          title: 'role',
          hidden: true
        }
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/system/user.vue'),
        meta: {
          icon: 'ant-design:user-outlined',
          title: 'user'
        }
      }
    ]
  },
  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://www.baidu.com',
        redirect: '/',
        meta: {
          icon: 'ant-design:link-outlined',
          title: 'Link'
        }
      }
    ]
  }
];

export const routes = [...staticRoutes, ...asyncRoutes];

export default createRouter({
  routes, //路由表
  history: createWebHistory() //路由模式
});
