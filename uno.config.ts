import { defineConfig } from 'unocss';
import presetAttributify from '@unocss/preset-attributify';
import presetUno from '@unocss/preset-uno';
import transformerDirectives from '@unocss/transformer-directives';
//unocss图标预设会查找 以来的图标库
import presetIcons from '@unocss/preset-icons';

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  transformers: [transformerDirectives()],
  shortcuts: [['icon', ' inline-block w-1em h-1em align-middle text-current']]
});
