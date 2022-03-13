import { Button } from './components/button';
import { Box } from './components/box';
import { Heading } from './components/heading';
import { Link } from './components/link';
import { fonts } from './fonts';
import { colors } from './colors';

export default {
  fonts,
  colors,
  components: {
    Button,
    Box,
    Heading,
    Link,
  },
  config: {
    // 'cssVarPrefix': 'serkon',
  },
  styles: {
    global: {
      body: {},

      // styles for the `a`
      a: {
        color: 'white',
        fontSize: '17px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.35',
        _hover: {
          textDecoration: 'underline',
        },
      },
      p: {
        fontSize: '20px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: 'white',
      },
    },
  },
};
