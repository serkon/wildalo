import { Button } from './components/button';
import { Box } from './components/box';
import { Heading } from './components/heading';
import { fonts } from './fonts';
import { colors } from './colors';

export default {
  fonts,
  colors,
  'components': {
    Button,
    Box,
    Heading,
  },
  'config': {
    // 'cssVarPrefix': 'serkon',
  },
  'styles': {
    'global': {
      'body': {},

      // styles for the `a`
      'a': {
        'color': 'white',
        'font-size': '17px',
        'font-weight': 'bold',
        'font-stretch': 'normal',
        'font-style': 'normal',
        'line-height': '1.35',
        '_hover': {
          'textDecoration': 'underline',
        },
      },
      'p': {
        'font-size': '20px',
        'font-weight': 'normal',
        'font-stretch': 'normal',
        'font-style': 'normal',
        'line-height': 'normal',
        'letter-spacing': 'normal',
        'color': 'white',
      },
    },
  },
};
