# Crop Recommendation App - Complete UI/UX Design Prompt (All Pages)

## Master Prompt for AI Design Tools (v0, Figma AI, Galileo AI, Magic Patterns, etc.)

---

### **Full Website Design Prompt**

> **Design a complete, production-ready crop recommendation web application for smallholder farmers in India. Agricultural/farm-tech aesthetic with forest green primary (#2E7D32), harvest amber accent (#F9A825), sky blue secondary (#1565C0). Clean, trustworthy, high-contrast design optimized for low-end mobile devices and variable connectivity.**
>
> **Pages to Design (12 screens):**
>
> **1. HOME / LANDING PAGE**
> - Hero: "Know What to Grow, Before You Sow" with animated crop growth illustration
> - Quick 3-input soil test: N-P-K sliders (color-coded tracks: red→amber→green→amber→red) + GPS location autocomplete
> - CTA: "Get My Top 3 Crops" → navigates to Results with pre-filled data
> - Trust strip: "10,000+ Farmers | ICAR Validated | Works Offline | 12 Languages"
> - Feature highlights: Soil Analysis, Seasonal Calendar, Market Prices, Disease ID, Multilingual
> - Footer: Links, app store badges, WhatsApp support button
>
> **2. SOIL ANALYSIS - MULTI-STEP FORM (4 Steps with Progress Stepper)**
> - Step 1/4 Location & Season: Map pin (MapLibre GL), season tabs (Kharif/Rabi/Zaid/Perennial), farm size input
> - Step 2/4 Nutrients (N-P-K): Three large sliders with real-time crop suitability overlay, lab report upload (OCR), QR scan for soil test kit
> - Step 3/4 pH & Texture: pH slider (3.5-9.5) with crop range bands, soil type % sliders (sandy/loamy/clay/silty), organic matter %
> - Step 4/4 Climate: Auto-filled from location, editable min/max temp, humidity, rainfall, irrigation type selector, previous crop dropdown
> - Sticky footer: Previous/Next, "Analyze My Soil" on final step, offline indicator
>
> **3. RESULTS DASHBOARD**
> - Header: Location, season, analysis date, "Re-analyze" button
> - Primary Recommendation Card (large): Crop image, name/variety, match score (94%), expected yield range, input cost vs net profit, sowing window, water/fertilizer needs, risk badges, CTAs (View Guide, Add to Calendar, Find Seeds, Download PDF, Share WhatsApp)
> - Alternative Crops Carousel (3 cards): Thumbnail, match score, key differentiator (shorter duration, nitrogen fixer, high price)
> - Soil Health Card: N-P-K-pH-OM radar chart current vs optimal with amendment recommendations (lime, gypsum, compost quantities)
> - Fertilizer Schedule: Week-by-week accordion with NPK + micronutrients, organic/chemical toggle
> - Pest/Disease Calendar: Monthly risk bars with preventive actions
> - Market Intelligence: Nearest mandi prices, 30-day trend sparkline, price forecast, storage advice
>
> **4. SEASONAL CALENDAR**
> - Top tabs: Monthly View / List View / My Tasks
> - Monthly: Horizontal month selector, week cards with task icons (sow, weed, fertilize, irrigate, scout, harvest), color-coded priority
> - List: Upcoming 14 days grouped by week, overdue section with red badges
> - Filter chips: My Crops / All Crops / Alerts Only
> - Weather alert banner (IMD integration): "Heavy rain next 48h - delay fertilizer application"
> - Empty state: "Add crops from Results to see your calendar"
>
> **5. MARKET INTELLIGENCE**
> - Header: Location selector, crop filter, time range (7D/30D/90D/1Y)
> - Price Trend Chart: Multi-line (nearest 5 mandis), MSP line, tooltip with date/price, legend toggle
> - Action Cards Grid (2x2): Best Mandi Today, Price Forecast (7-day ML), Storage Recommendation, Nearby Buyers
> - Transport Cost Calculator: Origin/destination, quantity, vehicle type → estimated cost
> - Price Alert Setup: Target price, notification channel (push/SMS/WhatsApp)
>
> **6. LEARN HUB - CROP GUIDES**
> - Sidebar: Crop categories (Cereals, Pulses, Oilseeds, Commercial, Vegetables, Fruits) with search
> - Crop Detail: Hero image, variety selector (region-specific), lifecycle timeline (sow→harvest with day counts), input calculator (seed/fertilizer/labor cost per acre), video library (YouTube embed, local language), PDF download, "Ask Expert" button
>
> **7. LEARN HUB - DISEASE IDENTIFICATION**
> - Photo upload zone (drag-drop, camera, gallery) with AI diagnosis results: disease name, confidence, severity, treatment options (organic/chemical/IPM), nearby agro-dealer map
> - Symptom Checker: Visual decision tree (leaf spots → yellowing → wilting) with images
> - Recent scans history with timestamps
>
> **8. FARMER PROFILE - MY FARMS**
> - Farm cards grid: Name, location badge, size, soil type chip, current crop with stage, last soil test date
> - Add Farm Modal: Name, map pin, size, soil test upload, crop history
> - Soil Health Timeline: Line charts for N-P-K-pH-OM over seasons with trend indicators
>
> **9. FARMER PROFILE - HISTORY & FEEDBACK**
> - Past recommendations table: Date, crop, predicted vs actual yield, profit, feedback button
> - Feedback Modal: Actual yield, issues faced, rating → improves ML model
> - Export Farm Report: PDF with all seasons, soil trends, yield comparison
>
> **10. FARMER PROFILE - ALERTS & SETTINGS**
> - Alert Preferences: Toggle groups (Weather, Pest/Disease, Market Price, Task Reminders) with channel selectors (Push/SMS/WhatsApp/IVR) per group
> - Language Selector: 12 Indian languages + English with flag icons
> - Units: Metric/Imperial, Currency, Area (acre/hectare/bigha)
> - Offline Mode: Cache status, manual sync button, storage used
> - Account: Profile edit, logout, delete account
>
> **11. ONBOARDING / FIRST-TIME USER FLOW (3 Screens)**
> - Screen 1: Value prop illustration + "Start Free Soil Test"
> - Screen 2: Permission requests (Location, Camera, Notifications) with benefit explanations
> - Screen 3: Quick soil test (N-P-K only) → instant result → "Save to Profile" prompt
>
> **12. OFFLINE / ERROR STATES**
> - Offline Banner: "You're offline. Changes will sync when connected." with retry button
> - Empty States: Illustration + helpful copy + primary action for each page
> - Error Modals: Friendly copy, retry, contact support, "Report Bug"
> - Loading Skeletons: Content-shaped placeholders for all data-heavy pages
>
> **Design System Requirements:**
> - Components: Button (5 variants), Input, Select, Slider, Card, Modal, Bottom Sheet, Toast, Tooltip, Accordion, Tabs, Stepper, Chip, Badge, Avatar, Table, Chart Containers
> - Spacing: 4px base unit, 8/16/24/32/48 scale
> - Radius: 4px (inputs), 8px (cards), 12px (modals), 16px (bottom sheets), full (pills)
> - Shadows: 3 elevations (card, modal, tooltip)
> - Typography: Inter Variable, scale: 12/14/16/18/20/24/32/40px, line-height 1.5
> - Icons: Lucide/Phosphor 20px/24px, stroke 2px
> - Motion: 150ms ease-out transitions, respect prefers-reduced-motion
>
> **Responsive Breakpoints:** 320px, 480px, 768px, 1024px, 1440px
> **PWA:** Install prompt, splash screen, offline manifest, background sync
> **Accessibility:** WCAG 2.1 AA, 12 languages RTL-ready, 48dp touch targets, voice input support, high contrast mode
>
> **Tech Stack Context:** Next.js 14 App Router, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form + Zod, Recharts, MapLibre GL, next-intl, next-pwa
>
> **Deliverables:** Figma-ready frames for all 12 screens + component library + design tokens JSON + responsive variants for mobile/tablet/desktop + interaction specs for key flows

---

### **Alternative: Single-Page Prompt for v0.dev**

> **Build a complete crop recommendation PWA for Indian farmers. 12 pages: Home (quick soil test), 4-step Soil Analysis Form, Results Dashboard (primary crop card + alternatives + soil health + fertilizer schedule + pest calendar + market info), Seasonal Calendar (monthly/list views), Market Intelligence (price charts + mandi comparison + forecasts), Learn Hub (Crop Guides + AI Disease ID), Farmer Profile (My Farms + History + Alerts/Settings), Onboarding (3 screens), Offline/Error states. Design system: Forest green (#2E7D32) primary, amber (#F9A825) accent, blue (#1565C0) secondary. Mobile-first, offline-first, 12 Indian languages, WCAG AA. Stack: Next.js 14, Tailwind, shadcn/ui, Recharts, MapLibre GL. Generate all pages with responsive layouts, component library, and working navigation.**

---

### **Page-by-Page Breakdown for Detailed Prompts**

| Page | Key Components | Unique Requirements |
|------|---------------|---------------------|
| **Home** | Hero, Quick Test Form, Trust Strip, Features | GPS autocomplete, slider color coding, WhatsApp share |
| **Soil Analysis** | Stepper, Map, Sliders, File Upload, OCR | Offline cache, voice input, QR scan, progress persistence |
| **Results** | Primary Card, Carousel, Radar Chart, Accordions, Sparklines | PDF export, WhatsApp share, calendar integration |
| **Calendar** | Month Grid, Week Cards, List View, Alert Banner | IMD weather integration, task completion tracking |
| **Market** | Multi-line Chart, Action Cards, Calculator | ML price forecast, transport cost API, price alerts |
| **Crop Guides** | Sidebar, Timeline, Calculator, Video Gallery | Region-specific varieties, input cost calculator |
| **Disease ID** | Photo Upload, AI Results, Decision Tree | Camera/gallery, confidence scores, dealer locator |
| **My Farms** | Farm Cards, Add Modal, Timeline Charts | Soil trend visualization, crop rotation logic |
| **History** | Comparison Table, Feedback Modal | Actual vs predicted, model improvement loop |
| **Settings** | Toggle Groups, Channel Selectors | 12 languages, RTL, units, offline sync status |
| **Onboarding** | 3 Screens, Permissions, Quick Test | Progressive disclosure, instant value |
| **Offline/Errors** | Banners, Skeletons, Empty States, Modals | Friendly copy, retry actions, bug reporting |

---

### **Component Library Checklist**

```
Buttons: Primary, Secondary, Outline, Ghost, Destructive, Link (each: sm/md/lg, loading, disabled)
Inputs: Text, Number, Select, Textarea, Slider, Range, File, OTP, Search
Form: Label, Error, Helper, Field Group, Form Section
Cards: Default, Interactive, Media, Stats, Chart, Farm, Crop, Mandi
Navigation: Stepper, Tabs, Breadcrumbs, Pagination, Bottom Nav, Drawer
Feedback: Toast, Alert, Modal, Bottom Sheet, Tooltip, Popover, Skeleton
Data: Table, Badge, Chip, Avatar, Progress, Divider, Accordion
Charts: Line, Bar, Radar, Sparkline, Gauge, Waterfall
Maps: Map Pin, Map View, Location Search, Radius Selector
```

---

### **Design Tokens (JSON)**

```json
{
  "colors": {
    "primary": { "50": "#E8F5E9", "100": "#C8E6C9", "200": "#A5D6A7", "300": "#81C784", "400": "#66BB6A", "500": "#4CAF50", "600": "#43A047", "700": "#388E3C", "800": "#2E7D32", "900": "#1B5E20", "950": "#0D3B17" },
    "accent": { "50": "#FFF8E1", "100": "#FFECB3", "200": "#FFE082", "300": "#FFD54F", "400": "#FFCA28", "500": "#FFC107", "600": "#FFB300", "700": "#FFA000", "800": "#FF8F00", "900": "#FF6F00" },
    "secondary": { "50": "#E3F2FD", "100": "#BBDEFB", "500": "#2196F3", "700": "#1976D2", "900": "#0D47A1" },
    "neutral": { "0": "#FFFFFF", "50": "#FAFAFA", "100": "#F5F5F5", "200": "#EEEEEE", "300": "#E0E0E0", "400": "#BDBDBD", "500": "#9E9E9E", "600": "#757575", "700": "#616161", "800": "#424242", "900": "#212121", "950": "#0A0A0A" },
    "semantic": { "success": "#2E7D32", "warning": "#F57F17", "error": "#C62828", "info": "#1565C0" }
  },
  "spacing": { "0": "0", "1": "4px", "2": "8px", "3": "12px", "4": "16px", "5": "20px", "6": "24px", "8": "32px", "10": "40px", "12": "48px", "16": "64px" },
  "radius": { "sm": "4px", "md": "8px", "lg": "12px", "xl": "16px", "full": "9999px" },
  "shadows": { "card": "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)", "modal": "0 10px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.1)", "tooltip": "0 4px 12px rgba(0,0,0,0.12)" },
  "typography": { "fontFamily": "Inter Variable, system-ui", "scale": { "xs": "12px", "sm": "14px", "base": "16px", "lg": "18px", "xl": "20px", "2xl": "24px", "3xl": "32px", "4xl": "40px" }, "lineHeight": { "tight": "1.25", "normal": "1.5", "relaxed": "1.75" } },
  "breakpoints": { "sm": "480px", "md": "768px", "lg": "1024px", "xl": "1440px" },
  "transitions": { "fast": "100ms ease-out", "normal": "150ms ease-out", "slow": "250ms ease-out" }
}
```

---

### **Usage Instructions**

1. **For v0.dev / Galileo AI / Magic Patterns**: Copy the "Single-Page Prompt" section
2. **For Figma AI / Manual Design**: Use the "Page-by-Page Breakdown" + "Design Tokens" + "Component Library Checklist"
3. **For Developer Handoff**: Share the full markdown + design tokens JSON + component checklist
4. **For Stakeholder Review**: Present the "12 Pages" overview with key user flows

---

### **Next Steps After Design Generation**

1. Review all 12 screens for consistency
2. Validate responsive behavior at 320px, 768px, 1440px
3. Check accessibility: contrast, touch targets, focus states, RTL
4. Verify offline states and error handling coverage
5. Confirm all 12 languages fit in UI (text expansion ~30-40%)
6. Hand off to dev with: Figma file, design tokens, component specs, interaction docs