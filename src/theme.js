import { createTheme, Customizations } from 'office-ui-fabric-react';

export const theme = createTheme({
  fonts: { 
    small: {
      fontSize: '60px'
    },
    smallPlus:{
        fontSize: '60px'
    },
    medium: {
      fontSize: '80px'
    },
    mediumPlus: {
      fontSize: '80px'
    },
    large: {
      fontSize: '100px',
    },
    LargePlus: {
      fontSize: '100px',
    },
    xLarge: {
      fontSize: '130px',
    },
    xLargePlus: {
      fontSize: '130px',
    },
    xxLarge: {
      fontSize: '130px',
    },
    xxLargePlus:{
        fontSize: '130px',
    },
    xxxLarge: {
      fontSize: '130px',
    }
  }
});

Customizations.applySettings({ theme });