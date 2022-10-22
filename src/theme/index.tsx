import { extendTheme } from '@chakra-ui/react';
import { store } from 'src/store/store';
import { set_maintenance } from 'src/store/reducers/LayoutReducer';

import style from './theme';

const theme = extendTheme(style);

export default theme;

window.getVersion = () => process.env;

// TODO: Important: Remove this method before production
window.setMaintenance = () => {
  store.dispatch(set_maintenance(false));
};
