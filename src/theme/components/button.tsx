export const Button = {
  baseStyle: {
    borderRadius: '24px',
    fontWeight: 'bold',
    textDecoration: 'none',
    _hover: {
      textDecorarion: 'none',
    },
    _disabled: {
      opacity: 0.5,
      backgroundColor: 'interit',
    },
  },
  variants: {
    ghost: {
      backgroundColor: 'transparent',
      color: '#FFC633',
      fontSize: '14px',
      lineHeight: '16px',
      _hover: {
        backgroundColor: 'transparent',
        color: 'rgba(255, 198, 51, 0.75);',
      },
      _focus: {
        backgroundColor: 'transparent',
      },
      _active: {
        backgroundColor: 'transparent',
      },
    },
    outline: {
      color: 'white',
      borderColor: '#FFC633',
      fontSize: '14px',
      lineHeight: '16px',
      _hover: {
        borderColor: 'rgba(255, 198, 51, 0.8)',
        color: 'rgba(255, 255, 255, 0.8)',
        bg: 'transparent',
      },
      _focus: {
        backgroundColor: 'transparent',
      },
      _active: {
        backgroundColor: 'transparent',
      },
    },
    primary: {
      color: '#09241F',
      borderColor: 'transparent',
      backgroundColor: '#FFC633',
      fontSize: '14px',
      lineHeight: '16px',
      _hover: {
        bg: 'rgba(255, 198, 51, 0.8)',
        _disabled: {
          backgroundColor: '#FFC633',
        },
      },
    },
    white: {
      color: '#09241F',
      borderColor: 'transparent',
      backgroundColor: '#ffffff',
      height: '32px',
      fontSize: '14px',
      lineHeight: '16px',
      _hover: {
        bg: 'rgba(255, 255, 255, 0.8)',
      },
    },
    green: {
      color: '#87AFA8',
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: '18px',
      letterSpacing: '-0.204545px',
      padding: 0,
      height: 'auto',
      boxShadow: 'none',
      _focus: {
        boxShadow: 'none',
      },
      _hover: {
        textDecoration: 'underline',
      },
    },
    footer: {
      color: 'white',
      border: 'none',
      padding: 0,
      fontWeight: 400,
      fontSize: '15px',
      _focus: {
        boxShadow: 'none',
      },
      _hover: {
        textDecoration: 'underline',
      },
    },
  },
};
