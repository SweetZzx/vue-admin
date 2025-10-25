import 'vue-router';

//给模块添加额外类型，ts中的接口合并
declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    icon?: string;
    activeMenu?: string;
    roles?: string[];
    hidden?: boolean;
    alwaysShow?: boolean;
  }
}
