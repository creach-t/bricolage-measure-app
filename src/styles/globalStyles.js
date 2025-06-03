import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  // Conteneurs principaux
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  
  flex1: {
    flex: 1,
  },
  
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Layout principal
  row: {
    flexDirection: 'row',
  },
  
  column: {
    flexDirection: 'column',
  },

  // Couleurs de base
  blackBackground: {
    backgroundColor: '#000000',
  },
  
  whiteBackground: {
    backgroundColor: '#FFFFFF',
  },
  
  whiteText: {
    color: '#FFFFFF',
  },
  
  yellowText: {
    color: '#FFFF00',
  },

  // Espacements
  padding10: {
    padding: 10,
  },
  
  padding20: {
    padding: 20,
  },
  
  margin10: {
    margin: 10,
  },
  
  margin20: {
    margin: 20,
  },

  // Bordures et ombres
  border: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  
  borderRadius5: {
    borderRadius: 5,
  },
  
  borderRadius10: {
    borderRadius: 10,
  },

  // Positionnement
  absolute: {
    position: 'absolute',
  },
  
  relative: {
    position: 'relative',
  },

  // Texte
  textCenter: {
    textAlign: 'center',
  },
  
  textBold: {
    fontWeight: 'bold',
  },
  
  fontSize12: {
    fontSize: 12,
  },
  
  fontSize14: {
    fontSize: 14,
  },
  
  fontSize16: {
    fontSize: 16,
  },

  // États d'interaction
  opacity50: {
    opacity: 0.5,
  },
  
  opacity75: {
    opacity: 0.75,
  },

  // Dimensions spécifiques
  fullWidth: {
    width: '100%',
  },
  
  fullHeight: {
    height: '100%',
  },

  // Pour le debug
  debugRed: {
    backgroundColor: 'red',
    opacity: 0.3,
  },
  
  debugGreen: {
    backgroundColor: 'green',
    opacity: 0.3,
  },
  
  debugBlue: {
    backgroundColor: 'blue',
    opacity: 0.3,
  },
});

// Constantes de couleurs
export const COLORS = {
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  YELLOW: '#FFFF00',
  GRAY_DARK: '#333333',
  GRAY_LIGHT: '#CCCCCC',
  GRAY_MEDIUM: '#666666',
};

// Constantes de dimensions
export const DIMENSIONS = {
  TOOLBAR_WIDTH: 60,
  BUTTON_SIZE: 50,
  ICON_SIZE: 24,
  BORDER_RADIUS: 5,
  STROKE_WIDTH: 2,
};

// Constantes de typographie
export const TYPOGRAPHY = {
  FONT_SIZE_SMALL: 12,
  FONT_SIZE_MEDIUM: 14,
  FONT_SIZE_LARGE: 16,
  FONT_SIZE_XL: 18,
};

export default {
  globalStyles,
  COLORS,
  DIMENSIONS,
  TYPOGRAPHY,
};