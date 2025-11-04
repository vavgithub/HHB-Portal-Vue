import StyleDictionary  from 'style-dictionary';
import { transforms } from 'style-dictionary/enums';

export default {
  source: [
    'src/themes/theme.light.json'
  ],
  platforms: {
    light: {
      transforms: [
        transforms.attributeCti,
        transforms.nameKebab,
        transforms.colorCss,
        transforms.sizePxToRem,
      ],
      // transformGroup: 'css',
      buildPath: 'src/styles/generated/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables'
        }
      ]
    }
  }
};
