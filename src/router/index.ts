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
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          icon: 'ant-design:bank-outlined',
          title: 'Dashboard',
          affix: true,
          noCache: false
        }
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: ':path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      hidden: true
    },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      hidden: true
    },
    component: () => import('@/views/register/index.vue')
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
    path: '/role',
    component: Layout,
    redirect: '/role/person',
    meta: {
      icon: 'ant-design:setting-outlined',
      title: 'role',
      alwaysShow: false,
      breadcrumb: false
    },
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/role/admin.vue'),
        meta: {
          icon: 'ant-design:user-outlined',
          title: 'admin',
          hidden: false
        }
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/role/user.vue'),
        meta: {
          icon: 'ant-design:user-outlined',
          title: 'user'
        }
      },
      {
        path: 'person',
        name: 'person',

        component: () => import('@/views/role/person.vue'),
        meta: {
          icon: 'ant-design:menu-outlined',
          title: 'person',
          noCache: true
        }
      },
      {
        path: 'changepassword',
        name: 'changepassword',
        component: () => import('@/views/role/changepassword.vue'),
        meta: {
          icon: 'ant-design:lock-outlined',
          title: 'changepassword'
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
  history: createWebHistory(import.meta.env.BASE_URL) //路由模式
});
