---
name: AgriTech
colors:
  surface: '#f3faff'
  surface-dim: '#c7dde9'
  surface-bright: '#f3faff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e6f6ff'
  surface-container: '#dbf1fe'
  surface-container-high: '#d5ecf8'
  surface-container-highest: '#cfe6f2'
  on-surface: '#071e27'
  on-surface-variant: '#40493d'
  inverse-surface: '#1e333c'
  inverse-on-surface: '#dff4ff'
  outline: '#707a6c'
  outline-variant: '#bfcaba'
  surface-tint: '#1b6d24'
  primary: '#0d631b'
  on-primary: '#ffffff'
  primary-container: '#2e7d32'
  on-primary-container: '#cbffc2'
  inverse-primary: '#88d982'
  secondary: '#005db7'
  on-secondary: '#ffffff'
  secondary-container: '#64a1ff'
  on-secondary-container: '#003670'
  tertiary: '#774c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#986200'
  on-tertiary-container: '#ffeede'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a3f69c'
  primary-fixed-dim: '#88d982'
  on-primary-fixed: '#002204'
  on-primary-fixed-variant: '#005312'
  secondary-fixed: '#d6e3ff'
  secondary-fixed-dim: '#a9c7ff'
  on-secondary-fixed: '#001b3d'
  on-secondary-fixed-variant: '#00468c'
  tertiary-fixed: '#ffddb5'
  tertiary-fixed-dim: '#ffb957'
  on-tertiary-fixed: '#2a1800'
  on-tertiary-fixed-variant: '#643f00'
  background: '#f3faff'
  on-background: '#071e27'
  surface-variant: '#cfe6f2'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px
  huge: 48px
  giant: 64px
---

## Brand & Style
The design system is engineered for the modern agricultural sector, balancing rugged utility with high-tech precision. It serves a diverse user base, from field operators requiring high-glare readability to agronomists analyzing complex data sets.

The style is **Corporate Modern** with a lean towards **Data-Driven Functionalism**. It prioritizes clarity, systematic organization, and a sense of reliability. The visual language conveys environmental stewardship through its color palette, while the structural rigidity reflects the precision of modern farming technology. Every interface element is designed to evoke confidence, stability, and technological sophistication.

## Colors
The palette is rooted in the natural world but refined for digital clarity.
- **Primary (Forest Green):** Used for primary actions, branding, and representing "growth" or "active" states.
- **Secondary (Blue):** Employed for informational elements, technical data points, and water-related metrics.
- **Accent (Amber):** Reserved for warnings, critical alerts, and highlighting specific soil/nutrient data (P-K levels).
- **Neutral:** A slate-leaning grey scale ensures readability and reduces eye strain during prolonged use.

The system is WCAG 2.1 AA compliant by default, ensuring a minimum contrast ratio of 4.5:1 for all text elements against their backgrounds.

## Typography
This design system utilizes **Inter Variable** to maximize legibility across varying pixel densities. The typographic scale is highly structured to manage complex information hierarchies typical in data-intensive dashboards. 

Headlines use tighter tracking and heavier weights to provide clear section anchors. Body text maintains a generous line height to ensure readability of technical reports. Labels are often treated with a slight letter-spacing increase and uppercase styling to differentiate metadata from primary content.

## Layout & Spacing
The layout employs a **Fluid Grid System** based on a 4px baseline.
- **Mobile (<768px):** 4-column grid with 16px margins and 16px gutters.
- **Tablet (768px - 1024px):** 8-column grid with 24px margins and 16px gutters.
- **Desktop (>1024px):** 12-column grid with 32px (or auto) margins and 24px gutters.

Spacing follows a strict mathematical progression to maintain visual rhythm. Touch targets are strictly enforced at a minimum of 48x48dp to accommodate gloved or outdoor use-cases where precision may be lower.

## Elevation & Depth
Depth is conveyed through **Tonal Layers** and **Subtle Ambient Shadows**. 
- **Level 0 (Base):** Background (#F8F9FA).
- **Level 1 (Cards/Surface):** White (#FFFFFF) with a 1px border (#E0E0E0) and a soft shadow (0px 2px 4px rgba(0,0,0,0.05)).
- **Level 2 (Modals/Dropdowns):** White (#FFFFFF) with a more pronounced shadow (0px 8px 16px rgba(0,0,0,0.1)) to indicate focus.

We avoid heavy skeuomorphism, preferring "flat-plus" aesthetics where elevation only serves to define functional interaction layers.

## Shapes
The shape language is approachable yet organized.
- **Standard (8px):** Applied to buttons, input fields, and checkboxes.
- **Containers (16px):** Applied to farm cards, dashboard widgets, and modals to create a distinct soft-tech feel.
- **Pills (9999px):** Reserved for status chips, tags, and navigation toggles.

This mix of radii ensures that individual interactive elements feel precise, while larger content blocks feel integrated and modern.

## Components

### Inputs & Sliders (N-P-K)
- **N-P-K Sliders:** Use a triple-track layout. Nitrogen (Green), Phosphorus (Amber), Potassium (Blue). Handles are 24px circles for high touchability.
- **Input Fields:** 48px height, 1px neutral border, transitioning to 2px Primary Green on focus. Labels always persist above the field.

### Data Visualization (Recharts Style)
- **Charts:** Use a clean, sans-serif labeling system. Grid lines should be light grey (#F0F0F0). 
- **Color Logic:** Use the Primary Green for yield/growth, Secondary Blue for moisture/irrigation, and Amber for stress/deficiency.

### Interactive Maps (MapLibre Style)
- **Base Layer:** Use a "Light" or "Satellite Hybrid" tile set.
- **Overlays:** Vector polygons should have a 2px stroke. Active fields are highlighted with a Primary Green fill at 20% opacity.
- **Controls:** Floating pill-shaped zoom and layer controls in the bottom-right.

### Farm Cards
- **Structure:** 16px corner radius. Features a top image or map-thumbnail (120px height), followed by a title (Headline-MD), and a 2-column grid of vital stats (e.g., Soil Moisture, Last Activity).

### Navigation & Localization
- **Multi-language Nav:** Top-bar contains a globe icon with a dropdown for locale selection.
- **Bottom Nav (Mobile):** 56px height, using 24px icons and 10px labels for quick thumb access.