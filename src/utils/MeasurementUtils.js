import { Dimensions, PixelRatio } from 'react-native';

/**
 * Calcule les pixels par centimètre en fonction des DPI de l'écran
 * Formule: 1 pouce = 2.54 cm
 * pixels/cm = DPI / 2.54
 */
export const calculatePixelsPerCM = () => {
  const pixelRatio = PixelRatio.get();
  const { width, height } = Dimensions.get('window');
  
  // Calcul basé sur PixelRatio (plus fiable que densityDpi sur Android)
  // Valeur DPI standard Android: 160 DPI = PixelRatio 1
  // iOS retina: 326 DPI = PixelRatio 2
  const estimatedDPI = pixelRatio * 160;
  
  // Conversion DPI vers pixels par centimètre
  const pixelsPerCM = estimatedDPI / 2.54;
  
  console.log('Calcul DPI:', {
    pixelRatio,
    estimatedDPI,
    pixelsPerCM: pixelsPerCM.toFixed(2),
    screenWidth: width,
    screenHeight: height
  });
  
  return pixelsPerCM;
};

/**
 * Convertit des pixels en centimètres
 * @param {number} pixels - Nombre de pixels
 * @param {number} pixelsPerCM - Pixels par centimètre de l'écran
 * @returns {number} Mesure en centimètres
 */
export const pixelsToCM = (pixels, pixelsPerCM) => {
  if (!pixelsPerCM || pixelsPerCM <= 0) {
    console.warn('pixelsPerCM invalide:', pixelsPerCM);
    return 0;
  }
  return pixels / pixelsPerCM;
};

/**
 * Convertit des centimètres en pixels
 * @param {number} cm - Mesure en centimètres
 * @param {number} pixelsPerCM - Pixels par centimètre de l'écran
 * @returns {number} Nombre de pixels
 */
export const cmToPixels = (cm, pixelsPerCM) => {
  if (!pixelsPerCM || pixelsPerCM <= 0) {
    console.warn('pixelsPerCM invalide:', pixelsPerCM);
    return 0;
  }
  return cm * pixelsPerCM;
};

/**
 * Formate une mesure en centimètres pour l'affichage
 * @param {number} cm - Mesure en centimètres
 * @param {number} precision - Nombre de décimales (par défaut 1)
 * @returns {string} Mesure formatée avec unité
 */
export const formatMeasurement = (cm, precision = 1) => {
  if (isNaN(cm) || cm < 0) {
    return '0.0 cm';
  }
  
  // Gestion des très petites mesures
  if (cm < 0.01) {
    return '<0.1 cm';
  }
  
  // Affichage en mm si < 1 cm
  if (cm < 1) {
    const mm = cm * 10;
    return `${mm.toFixed(0)} mm`;
  }
  
  // Affichage en cm
  return `${cm.toFixed(precision)} cm`;
};

/**
 * Valide si les mesures DPI semblent correctes
 * @param {number} pixelsPerCM - Pixels par centimètre calculés
 * @returns {boolean} true si les valeurs semblent raisonnables
 */
export const validateDPI = (pixelsPerCM) => {
  // Plage raisonnable pour les smartphones/tablettes
  // 30-200 pixels/cm (environ 76-508 DPI)
  return pixelsPerCM >= 30 && pixelsPerCM <= 200;
};

/**
 * Calcul alternatif des DPI basé sur les dimensions d'écran connues
 * Utilisé comme fallback si le calcul automatique semble incorrect
 * @param {number} screenDiagonalInches - Diagonale écran en pouces (si connue)
 * @returns {number} Pixels par centimètre
 */
export const calculatePixelsPerCMFromDiagonal = (screenDiagonalInches) => {
  const { width, height } = Dimensions.get('screen'); // Utilise 'screen' pour les pixels physiques
  const pixelRatio = PixelRatio.get();
  
  // Calcul de la diagonale en pixels physiques
  const physicalWidth = width * pixelRatio;
  const physicalHeight = height * pixelRatio;
  const diagonalPixels = Math.sqrt(physicalWidth * physicalWidth + physicalHeight * physicalHeight);
  
  // DPI = pixels / pouces
  const dpi = diagonalPixels / screenDiagonalInches;
  
  // Conversion en pixels par centimètre
  return dpi / 2.54;
};

/**
 * Système de calibrage manuel pour corriger les DPI
 * @param {number} knownLengthCM - Longueur connue en cm
 * @param {number} measuredPixels - Pixels mesurés pour cette longueur
 * @returns {number} Facteur de correction DPI
 */
export const calibrateFromKnownLength = (knownLengthCM, measuredPixels) => {
  return measuredPixels / knownLengthCM;
};

export default {
  calculatePixelsPerCM,
  pixelsToCM,
  cmToPixels,
  formatMeasurement,
  validateDPI,
  calculatePixelsPerCMFromDiagonal,
  calibrateFromKnownLength
};