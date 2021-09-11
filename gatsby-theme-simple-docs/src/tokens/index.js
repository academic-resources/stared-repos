import colorsDefault from './colors';
import fontsDefault from './fonts';
import mediaDefault from './media';
import theme from '../theme';

export const colors = { ...colorsDefault, ...(theme.colors || {}) };
export const fonts = { ...fontsDefault, ...(theme.fonts || {}) };
export const media = { ...mediaDefault, ...(theme.media || {}) };
