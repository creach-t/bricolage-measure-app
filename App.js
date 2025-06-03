import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Alert } from 'react-native';
import { Dimensions, PixelRatio } from 'react-native';
import DrawingCanvas from './src/components/DrawingCanvas';
import ToolBar from './src/components/ToolBar';
import { calculatePixelsPerCM } from './src/utils/MeasurementUtils';
import { globalStyles } from './src/styles/globalStyles';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function App() {
  const [currentTool, setCurrentTool] = useState('line');
  const [drawings, setDrawings] = useState([]);
  const [pixelsPerCM, setPixelsPerCM] = useState(0);
  const [isCalibrated, setIsCalibrated] = useState(false);

  useEffect(() => {
    // Calcul automatique des DPI au démarrage
    const calculatedPixelsPerCM = calculatePixelsPerCM();
    setPixelsPerCM(calculatedPixelsPerCM);
    setIsCalibrated(true);
    
    console.log('DPI Info:', {
      screenWidth,
      screenHeight,
      pixelRatio: PixelRatio.get(),
      pixelsPerCM: calculatedPixelsPerCM
    });
  }, []);

  const handleToolChange = (tool) => {
    setCurrentTool(tool);
  };

  const handleAddDrawing = (drawing) => {
    setDrawings(prev => [...prev, {
      ...drawing,
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString()
    }]);
  };

  const handleClearAll = () => {
    Alert.alert(
      'Effacer tout',
      'Voulez-vous vraiment effacer tous les dessins ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Effacer', style: 'destructive', onPress: () => setDrawings([]) }
      ]
    );
  };

  if (!isCalibrated) {
    return (
      <View style={[globalStyles.container, globalStyles.center]}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <View style={styles.mainContent}>
        <ToolBar
          currentTool={currentTool}
          onToolChange={handleToolChange}
          onClearAll={handleClearAll}
        />
        
        <DrawingCanvas
          currentTool={currentTool}
          drawings={drawings}
          onAddDrawing={handleAddDrawing}
          pixelsPerCM={pixelsPerCM}
          canvasWidth={screenWidth - 60} // Largeur moins la toolbar
          canvasHeight={screenHeight}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000000',
  },
});