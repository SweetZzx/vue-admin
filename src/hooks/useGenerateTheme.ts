import { useSettingStore } from '@/stores/settings';
import { generateColors, setColors } from '@/utils/color';

export const useGenerateTheme = () => {
  //监控主题的变化,更新到store中
  //生成主题更新
  const store = useSettingStore();
  const theme = computed(() => store.settings.theme);
  const originalTheme = computed(() => store.settings.originalTheme);
  watchEffect(() => {
    if (theme.value !== originalTheme.value) {
      //primary primary-light-1/9
      const colors = { primary: theme.value, ...generateColors(theme.value) };
      setColors(colors);
      store.changeSetting('originalTheme', theme.value);
    }
  });
  //目的就是生成主体应用在根元素上
};
