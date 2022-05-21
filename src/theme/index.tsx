import { extendTheme } from '@chakra-ui/react';
import style from './theme';

const theme = extendTheme(style);

console.log('theme', theme);

export default theme;

window.getVersion = () => process.env;
