import variables from '@/style/variables.module.scss';

interface ISettings {
  theme: string;
  originalTheme: string;
  // 方便以后扩展
  sidebarCollapsed?: boolean;
  language?: string;
}

export const useSettingStore = defineStore(
  'setting',
  () => {
    const settings: ISettings = reactive({
      theme: variables.theme || '#1e90ff',
      originalTheme: ''
    });

    const changeSetting = <K extends keyof ISettings>(
      key: K,
      value: ISettings[K]
    ) => {
      settings[key] = value;
    };

    return { settings, changeSetting };
  },
  {
    persist: {
      storage: window.sessionStorage,
      pick: ['settings.theme']
    }
  }
);
