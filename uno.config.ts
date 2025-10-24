import { defineConfig } from 'unocss';
import presetAttributify from '@unocss/preset-attributify';
import presetUno from '@unocss/preset-uno';
import transformerDirectives from '@unocss/transformer-directives';

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  transformers: [transformerDirectives()]
});
