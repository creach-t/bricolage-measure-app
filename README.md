# 📐 Bricolage Helper - Application de Mesure

Application mobile React Native (Expo SDK 53) d'aide au bricolage avec mesures réelles en centimètres.

## 🎯 Fonctionnalités MVP

### Interface
- **Écran noir** : Fond entièrement noir pour un contraste optimal
- **Dessins blancs** : Toutes les formes sont tracées en blanc
- **Barre d'outils** : 60px de largeur fixe à gauche de l'écran
- **Mesures réelles** : Affichage en temps réel des dimensions en centimètres

### Outils de Dessin
1. **🔴 Ligne droite** 
   - Tracez en touchant deux points
   - Affichage de la longueur réelle pendant le tracé
   
2. **⭕ Cercle**
   - Tracez du centre vers le bord
   - Affichage du diamètre réel

### Système de Mesures
- **Calcul DPI automatique** : Détection des pixels par centimètre
- **Précision millimétrique** : Mesures affichées au 0.1 cm près
- **Validation automatique** : Ignore les traces trop petites
- **Format intelligent** : mm pour < 1cm, cm pour le reste

## 🚀 Installation

### Prérequis
- Node.js 18+
- Expo CLI
- Smartphone avec Expo Go (recommandé pour les tests DPI)

### Installation
```bash
# Cloner le repository
git clone https://github.com/creach-t/bricolage-measure-app.git
cd bricolage-measure-app

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start
```

### Test sur mobile
1. Installer **Expo Go** sur votre smartphone
2. Scanner le QR code généré par `npm start`
3. **Important** : Tester sur appareil réel (les émulateurs faussent les DPI)

## 📱 Utilisation

### Premier lancement
1. L'app calcule automatiquement les DPI de votre écran
2. Les informations DPI s'affichent dans la console

### Tracer une ligne
1. Appuyer sur l'icône **━** (ligne)
2. Toucher l'écran et faire glisser
3. La longueur s'affiche en temps réel en jaune
4. Relâcher pour finaliser

### Tracer un cercle  
1. Appuyer sur l'icône **○** (cercle)
2. Toucher le centre puis glisser vers le bord
3. Le diamètre s'affiche en temps réel
4. Relâcher pour finaliser

### Effacer
- Appuyer sur l'icône **🗑** pour tout effacer
- Confirmation demandée avant suppression

## ⚙️ Technique

### Architecture
```
src/
├── components/
│   ├── DrawingCanvas.js    # Zone de dessin SVG + gestes
│   └── ToolBar.js          # Barre d'outils à gauche
├── utils/
│   └── MeasurementUtils.js # Calculs DPI et conversions
└── styles/
    └── globalStyles.js     # Styles et constantes
```

### Calcul DPI
```javascript
// Formule de base
const pixelsPerCM = (PixelRatio.get() * 160) / 2.54;

// Validation automatique (30-200 pixels/cm)
const isValid = pixelsPerCM >= 30 && pixelsPerCM <= 200;
```

### Dépendances Minimales
- `react-native-svg` : Dessin vectoriel
- `react-native-gesture-handler` : Gestes tactiles
- `expo-screen-orientation` : Gestion orientation

## 🎨 Design

### Couleurs
- **Fond** : `#000000` (noir pur)
- **Dessins** : `#FFFFFF` (blanc pur)  
- **Mesures temps réel** : `#FFFF00` (jaune)
- **Mesures finalisées** : `#CCCCCC` (gris clair)
- **Outil actif** : `#333333` (gris foncé)

### Dimensions
- **Barre outils** : 60px largeur
- **Boutons** : 50x50px
- **Trait** : 2px épaisseur
- **Zone dessin** : Écran - 60px

## 🔧 Développement

### Scripts disponibles
```bash
npm start          # Serveur Expo
npm run android    # Build Android
npm run ios        # Build iOS
```

### Debug DPI
Les informations DPI s'affichent dans la console :
```javascript
console.log('DPI Info:', {
  screenWidth,
  screenHeight, 
  pixelRatio: PixelRatio.get(),
  pixelsPerCM: calculatedPixelsPerCM
});
```

### Tests de précision
1. **Règle physique** : Comparer avec une vraie règle
2. **Différents appareils** : Tester sur 3+ smartphones  
3. **Orientations** : Portrait et paysage
4. **Performance** : Fluidité à 60 FPS

## ⚠️ Limitations connues

### DPI et Précision
- Certains constructeurs Android mentent sur les DPI
- Les émulateurs ne reflètent pas les DPI réels
- Calibrage manuel recommandé pour une précision absolue

### Performance
- Limite recommandée : 100 formes simultanées
- Nettoyage automatique des petites traces
- Optimisation SVG pour 60 FPS

## 🔮 Évolutions futures

### Phase 2
- **Calibrage manuel** : Correction DPI par l'utilisateur
- **Sauvegarde** : Export des mesures
- **Formes supplémentaires** : Rectangle, polygone
- **Annotations** : Texte libre sur les mesures

### Phase 3
- **Mode AR** : Mesures avec caméra
- **Historique** : Projets sauvegardés
- **Partage** : Export PDF des plans
- **Multi-échelles** : Zoom et pan

## 🐛 Problèmes connus

### Si les mesures semblent incorrectes
1. Vérifier que vous testez sur un appareil réel
2. Redémarrer l'application
3. Comparer avec une règle physique
4. Signaler l'appareil et les dimensions obtenues

### Performance
- Éviter de tracer des centaines de formes
- Utiliser le bouton "Vider" régulièrement
- Fermer et relancer si l'app ralentit

## 📄 Licence

MIT License - Voir [LICENSE](LICENSE) pour plus de détails.

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

**🎯 MVP Objectif** : Application fonctionnelle permettant de dessiner et mesurer en centimètres réels avec une interface simple et intuitive.