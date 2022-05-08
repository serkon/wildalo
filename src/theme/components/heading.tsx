import { fonts } from 'src/theme/fonts';
import { Box } from './box';

export const Heading = {
  ...Box,
  variants: {
    primary: {
      color: '#FBB739',
    },
    footerLinkTitle: {
      fontFamily: fonts.body,
      fontSize: '17px',
      lineHeight: '20px',
      color: '#ffffff',
    },
  },
};
