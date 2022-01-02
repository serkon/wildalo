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
        'color': 'teal.500',
        '_hover': {
          'textDecoration': 'underline',
        },
      },
    },
  },
};
