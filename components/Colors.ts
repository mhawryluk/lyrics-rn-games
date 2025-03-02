import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config.js';

const config = resolveConfig(tailwindConfig);

// @ts-ignore
const colors: Record<string, string> = config.theme.colors.pw;

const Colors = {
  background: colors.background,
  orange: colors.orange,
  orangeLight: colors['orange-light'],
  green: colors.green,
  greenLight: colors['green-light'],
  navy: colors.navy,
};

export default Colors;
