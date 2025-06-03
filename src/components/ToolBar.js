import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { COLORS, DIMENSIONS } from '../styles/globalStyles';

const ToolBar = ({ currentTool, onToolChange, onClearAll }) => {
  const tools = [
    {
      id: 'line',
      name: 'Ligne',
      icon: '━',
      description: 'Tracer des lignes droites'
    },
    {
      id: 'circle',
      name: 'Cercle', 
      icon: '○',
      description: 'Tracer des cercles'
    }
  ];

  const renderToolButton = (tool) => (
    <TouchableOpacity
      key={tool.id}
      style={[
        styles.toolButton,
        currentTool === tool.id && styles.toolButtonActive
      ]}
      onPress={() => onToolChange(tool.id)}
      activeOpacity={0.7}
    >
      <Text style={[
        styles.toolIcon,
        currentTool === tool.id && styles.toolIconActive
      ]}>
        {tool.icon}
      </Text>
      <Text style={[
        styles.toolLabel,
        currentTool === tool.id && styles.toolLabelActive
      ]}>
        {tool.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.toolsSection}>
        {tools.map(renderToolButton)}
      </View>
      
      <View style={styles.actionsSection}>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={onClearAll}
          activeOpacity={0.7}
        >
          <Text style={styles.clearIcon}>🗑</Text>
          <Text style={styles.clearLabel}>Vider</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: DIMENSIONS.TOOLBAR_WIDTH,
    height: '100%',
    backgroundColor: COLORS.BLACK,
    borderRightWidth: 1,
    borderRightColor: COLORS.GRAY_DARK,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  
  toolsSection: {
    flex: 1,
    alignItems: 'center',
    gap: 15,
  },
  
  actionsSection: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  
  toolButton: {
    width: DIMENSIONS.BUTTON_SIZE,
    height: DIMENSIONS.BUTTON_SIZE + 15, // Plus haut pour le texte
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: DIMENSIONS.BORDER_RADIUS,
    borderWidth: 1,
    borderColor: COLORS.GRAY_DARK,
    backgroundColor: 'transparent',
    marginBottom: 5,
  },
  
  toolButtonActive: {
    backgroundColor: COLORS.GRAY_DARK,
    borderColor: COLORS.WHITE,
  },
  
  toolIcon: {
    fontSize: 20,
    color: COLORS.WHITE,
    textAlign: 'center',
    marginBottom: 2,
  },
  
  toolIconActive: {
    color: COLORS.YELLOW,
  },
  
  toolLabel: {
    fontSize: 8,
    color: COLORS.GRAY_LIGHT,
    textAlign: 'center',
    fontWeight: '500',
  },
  
  toolLabelActive: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
  
  clearButton: {
    width: DIMENSIONS.BUTTON_SIZE,
    height: DIMENSIONS.BUTTON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: DIMENSIONS.BORDER_RADIUS,
    borderWidth: 1,
    borderColor: '#CC0000',
    backgroundColor: 'transparent',
  },
  
  clearIcon: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 2,
  },
  
  clearLabel: {
    fontSize: 8,
    color: COLORS.GRAY_LIGHT,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default ToolBar;