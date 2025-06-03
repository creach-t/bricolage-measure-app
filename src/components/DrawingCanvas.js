import React, { useState, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import {
  Line,
  Svg,
  Circle as SvgCircle,
  Text as SvgText,
} from "react-native-svg";
import { COLORS, DIMENSIONS } from "../styles/globalStyles";
import { formatMeasurement, pixelsToCM } from "../utils/MeasurementUtils";

const DrawingCanvas = ({
  currentTool,
  drawings,
  onAddDrawing,
  pixelsPerCM,
  canvasWidth,
  canvasHeight,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const svgRef = useRef(null);

  const panGesture = Gesture.Pan()
    .onStart((event) => {
      try {
        console.log("🎨 Dessin commencé:", { tool: currentTool, x: event.x, y: event.y });
        setIsDrawing(true);
        setStartPoint({ x: event.x, y: event.y });
        setEndPoint({ x: event.x, y: event.y });
      } catch (error) {
        console.error("Erreur onStart:", error);
      }
    })
    .onUpdate((event) => {
      try {
        if (isDrawing && startPoint) {
          setEndPoint({ x: event.x, y: event.y });
        }
      } catch (error) {
        console.error("Erreur onUpdate:", error);
      }
    })
    .onEnd(() => {
      try {
        console.log("🎨 Dessin terminé");
        finishDrawing();
      } catch (error) {
        console.error("Erreur onEnd:", error);
        cancelDrawing();
      }
    })
    .onFinalize(() => {
      // Nettoyage en cas d'annulation
      if (isDrawing) {
        cancelDrawing();
      }
    });

  const finishDrawing = () => {
    try {
      if (!startPoint || !endPoint || !pixelsPerCM) {
        console.log("Annulation: données manquantes");
        cancelDrawing();
        return;
      }

      let drawing = null;

      if (currentTool === "line") {
        const distance = Math.sqrt(
          Math.pow(endPoint.x - startPoint.x, 2) +
            Math.pow(endPoint.y - startPoint.y, 2)
        );

        // Ignorer les lignes trop courtes (moins de 5 pixels)
        if (distance < 5) {
          console.log("Ligne trop courte");
          cancelDrawing();
          return;
        }

        const realDistance = pixelsToCM(distance, pixelsPerCM);

        drawing = {
          type: "line",
          startX: startPoint.x,
          startY: startPoint.y,
          endX: endPoint.x,
          endY: endPoint.y,
          measurement: realDistance,
          measurementText: formatMeasurement(realDistance),
        };
      } else if (currentTool === "circle") {
        const radius = Math.sqrt(
          Math.pow(endPoint.x - startPoint.x, 2) +
            Math.pow(endPoint.y - startPoint.y, 2)
        );

        // Ignorer les cercles trop petits (moins de 10 pixels de rayon)
        if (radius < 10) {
          console.log("Cercle trop petit");
          cancelDrawing();
          return;
        }

        const realRadius = pixelsToCM(radius, pixelsPerCM);
        const realDiameter = realRadius * 2;

        drawing = {
          type: "circle",
          centerX: startPoint.x,
          centerY: startPoint.y,
          radius: radius,
          measurement: realDiameter,
          measurementText: `⌀ ${formatMeasurement(realDiameter)}`,
        };
      }

      if (drawing) {
        console.log("Ajout du dessin:", drawing.type);
        onAddDrawing(drawing);
      }

      cancelDrawing();
    } catch (error) {
      console.error("Erreur finishDrawing:", error);
      cancelDrawing();
    }
  };

  const cancelDrawing = () => {
    setIsDrawing(false);
    setStartPoint(null);
    setEndPoint(null);
  };

  const renderCurrentDrawing = () => {
    try {
      if (!isDrawing || !startPoint || !endPoint || !pixelsPerCM) return null;

      if (currentTool === "line") {
        const distance = Math.sqrt(
          Math.pow(endPoint.x - startPoint.x, 2) +
            Math.pow(endPoint.y - startPoint.y, 2)
        );
        
        if (distance < 1) return null; // Éviter division par zéro
        
        const realDistance = pixelsToCM(distance, pixelsPerCM);
        const midX = (startPoint.x + endPoint.x) / 2;
        const midY = (startPoint.y + endPoint.y) / 2;

        return (
          <React.Fragment>
            <Line
              x1={startPoint.x}
              y1={startPoint.y}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke={COLORS.WHITE}
              strokeWidth={DIMENSIONS.STROKE_WIDTH}
            />
            <SvgText
              x={midX}
              y={midY - 10}
              fill={COLORS.YELLOW}
              fontSize={14}
              textAnchor="middle"
              fontWeight="bold"
            >
              {formatMeasurement(realDistance)}
            </SvgText>
          </React.Fragment>
        );
      } else if (currentTool === "circle") {
        const radius = Math.sqrt(
          Math.pow(endPoint.x - startPoint.x, 2) +
            Math.pow(endPoint.y - startPoint.y, 2)
        );
        
        if (radius < 1) return null; // Éviter radius 0
        
        const realRadius = pixelsToCM(radius, pixelsPerCM);
        const realDiameter = realRadius * 2;

        return (
          <React.Fragment>
            <SvgCircle
              cx={startPoint.x}
              cy={startPoint.y}
              r={radius}
              stroke={COLORS.WHITE}
              strokeWidth={DIMENSIONS.STROKE_WIDTH}
              fill="none"
            />
            <SvgText
              x={startPoint.x}
              y={startPoint.y - radius - 15}
              fill={COLORS.YELLOW}
              fontSize={14}
              textAnchor="middle"
              fontWeight="bold"
            >
              {`⌀ ${formatMeasurement(realDiameter)}`}
            </SvgText>
          </React.Fragment>
        );
      }
    } catch (error) {
      console.error("Erreur renderCurrentDrawing:", error);
      return null;
    }
  };

  const renderSavedDrawings = () => {
    try {
      return drawings.map((drawing, index) => {
        const key = drawing.id || `drawing-${index}`;

        if (drawing.type === "line") {
          const midX = (drawing.startX + drawing.endX) / 2;
          const midY = (drawing.startY + drawing.endY) / 2;

          return (
            <React.Fragment key={key}>
              <Line
                x1={drawing.startX}
                y1={drawing.startY}
                x2={drawing.endX}
                y2={drawing.endY}
                stroke={COLORS.WHITE}
                strokeWidth={DIMENSIONS.STROKE_WIDTH}
              />
              <SvgText
                x={midX}
                y={midY - 10}
                fill={COLORS.GRAY_LIGHT}
                fontSize={12}
                textAnchor="middle"
              >
                {drawing.measurementText || ""}
              </SvgText>
            </React.Fragment>
          );
        } else if (drawing.type === "circle") {
          return (
            <React.Fragment key={key}>
              <SvgCircle
                cx={drawing.centerX}
                cy={drawing.centerY}
                r={drawing.radius}
                stroke={COLORS.WHITE}
                strokeWidth={DIMENSIONS.STROKE_WIDTH}
                fill="none"
              />
              <SvgText
                x={drawing.centerX}
                y={drawing.centerY - drawing.radius - 15}
                fill={COLORS.GRAY_LIGHT}
                fontSize={12}
                textAnchor="middle"
              >
                {drawing.measurementText || ""}
              </SvgText>
            </React.Fragment>
          );
        }

        return null;
      });
    } catch (error) {
      console.error("Erreur renderSavedDrawings:", error);
      return null;
    }
  };

  // Vérification de sécurité des dimensions
  const safeCanvasWidth = canvasWidth > 0 ? canvasWidth : 100;
  const safeCanvasHeight = canvasHeight > 0 ? canvasHeight : 100;

  return (
    <GestureHandlerRootView style={[styles.container, { width: safeCanvasWidth }]}>
      <GestureDetector gesture={panGesture}>
        <View style={styles.drawingArea}>
          <Svg 
            ref={svgRef}
            width={safeCanvasWidth} 
            height={safeCanvasHeight} 
            style={styles.svg}
          >
            {renderSavedDrawings()}
            {renderCurrentDrawing()}
          </Svg>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },

  drawingArea: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },

  svg: {
    backgroundColor: COLORS.BLACK,
  },
});

export default DrawingCanvas;
