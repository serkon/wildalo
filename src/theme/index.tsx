import { extendTheme } from '@chakra-ui/react';
import style from './theme';

const theme = extendTheme(style);

export default theme;

window.getVersion = () => process.env;
