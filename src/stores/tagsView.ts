import type {
  RouteLocationNormalizedLoadedGeneric,
  RouteRecordName
} from 'vue-router';

export const useTagsViewStore = defineStore('tagsView', () => {
  const visitedViews = ref<RouteLocationNormalizedLoadedGeneric[]>([]);
  const cacheViews = ref<RouteRecordName[]>([]);
  //区分哪些需要缓存
  const addCacheView = (view: RouteLocationNormalizedLoadedGeneric) => {
    if (cacheViews.value.includes(view.name)) return;
    if (!view.meta.noCache) {
      //将当前的name存起来
      cacheViews.value.push(view.name);
    }
  };
  const addView = (view: RouteLocationNormalizedLoadedGeneric) => {
    //当前添加的视图是否已经存在,存在则不再添加
    const exits = visitedViews.value.some((v) => v.path === view.path);
    if (exits) return;
    const newView = { ...view, title: view.meta.title };
    visitedViews.value.push(newView);
    addCacheView(view); //添加缓存
  };

  const deleteCacheView = (view: RouteLocationNormalizedLoadedGeneric) => {
    const index = cacheViews.value.indexOf(view.name);
    if (index > -1) {
      cacheViews.value.splice(index, 1);
    }
  };

  const deleteView = (view: RouteLocationNormalizedLoadedGeneric) => {
    const index = visitedViews.value.findIndex((v) => v.path === view.path);
    if (index > -1) {
      visitedViews.value.splice(index, 1);
    }
    deleteCacheView(view);
  };

  const delAllViews = () => {
    visitedViews.value = visitedViews.value.filter((v) => v.meta.affix);
    cacheViews.value = [];
  };

  const delOtherViews = (view: RouteLocationNormalizedLoadedGeneric) => {
    visitedViews.value = visitedViews.value.filter(
      (v) => v.meta.affix || v.path === view.path
    );
    cacheViews.value = cacheViews.value.filter((name) => name === view.name);
  };

  const refreshView = (view: RouteLocationNormalizedLoadedGeneric) => {
    deleteView(view);
    addView(view);
  };

  return {
    visitedViews,
    addView,
    deleteView,
    cacheViews,
    delAllViews,
    delOtherViews,
    refreshView
  };
});
