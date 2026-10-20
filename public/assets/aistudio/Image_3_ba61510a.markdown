---
name: El Torito Transportes
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#444653'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#757684'
  outline-variant: '#c4c5d5'
  surface-tint: '#3755c3'
  primary: '#00288e'
  on-primary: '#ffffff'
  primary-container: '#1e40af'
  on-primary-container: '#a8b8ff'
  inverse-primary: '#b8c4ff'
  secondary: '#495f82'
  on-secondary: '#ffffff'
  secondary-container: '#bfd5fe'
  on-secondary-container: '#465c7f'
  tertiary: '#611e00'
  on-tertiary: '#ffffff'
  tertiary-container: '#872d00'
  on-tertiary-container: '#ffa582'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c4ff'
  on-primary-fixed: '#001453'
  on-primary-fixed-variant: '#173bab'
  secondary-fixed: '#d5e3ff'
  secondary-fixed-dim: '#b1c7f0'
  on-secondary-fixed: '#001c3b'
  on-secondary-fixed-variant: '#314769'
  tertiary-fixed: '#ffdbce'
  tertiary-fixed-dim: '#ffb599'
  on-tertiary-fixed: '#370e00'
  on-tertiary-fixed-variant: '#7f2b00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
  data-mono:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

### Brand Personality & Mission
The design system embodies the operational precision, punctuality, and institutional security required for national passenger transit. It conveys the authority of a legacy transport operator combined with modern transactional clarity. Visual noise is actively reduced in favor of high-contrast tabular data, immediate legibility under outdoor ambient glare, and absolute certainty throughout checkout.

### Target Audience & Operational Context
The platform serves diverse users booking interurban travel across Argentina, often on variable mobile connectivity:
- Passengers requiring fast route comparisons, transparent pricing in Argentine Pesos (ARS), and accessible digital boarding passes (QR tickets).
- Vulnerable transit groups and beneficiaries requiring legal validation flows (CUD disability certification, CNRT minor transit permits).
- Commercial counter agents who rely on dense layout modes, instant keyboard navigation, and reliable seat inventory mapping.

### Design Style: Institutional Modernism & Functional Density
The aesthetic mixes corporate precision with transactional clarity:
- **Zero Ambiguity:** Strict structural division using crisp hairline dividers (`#E2E8F0`), disciplined white canvases, and high-contrast typography.
- **Utilitarian Density:** Space is optimized for structured schedules, dynamic fare breakdowns, multi-deck bus schematics, and strict state feedback.
- **Physical Affordance:** Subtle micro-elevations ensure interactive seat targets and primary action anchors are unmistakably clickable.

## Colors

### Palette Architecture
The palette is calibrated strictly for the Light theme, prioritizing regulatory compliance, outdoor mobile legibility, and high visual contrast.

- **Primary (`#1E40AF` - Azul Medio):** The operational core. Used for active navigation tabs, interactive primary buttons, verified passenger credentials, and selected seat states.
- **Secondary (`#0B2545` - Azul Marino Profundo):** The foundational anchor. Used for primary headlines, card titles, table headers, sticky ticket summaries, and top-level institutional headers.
- **Accent / Tertiary (`#EA580C` - Naranja Enérgico):** High-visibility action trigger. Dedicated exclusively to checkout progression CTAs, promotion tags, step-completion alerts, and the real-time seat lock countdown timer.
- **Critical & Regulatory Alerts (`#DC2626` - Rojo Alerta):** Used for unavailable/blocked seats, cancellation alerts, missed payment windows, invalid DNI/CUD validation states, and mandatory minor authorization requirements.
- **Success & Clearance (`#16A34A` - Verde Operativo):** Used for confirmed digital tickets, valid QR codes, confirmed reservations, and validated regulatory documentation.
- **Neutrals & Surfaces:**
  - Base Background: `#F8FAFC` (Slate 50) prevents ocular fatigue while keeping maximum contrast against white cards.
  - Surface Background: `#FFFFFF` (Pure White) for cards, modal dialogs, and bus cabin backgrounds.
  - Borders & Hairlines: `#E2E8F0` (Slate 200) for structural isolation without visual weight.
  - Body Text: `#1E293B` (Slate 800) for maximum text legibility.
  - Muted/Support Text: `#64748B` (Slate 500) for intermediate travel times, metadata, and regulatory notes.

### Seat Schematic Color Codification
- **Available Seat (Semicama / Cama):** Fill `#FFFFFF`, Border `#94A3B8`, Label `#1E293B`.
- **Selected Seat (Current User):** Fill `#1E40AF`, Text `#FFFFFF`, Border `#1E40AF`.
- **Temporary Hold (5-min lock):** Fill `#FEF3C7` (Amber 100), Border `#F59E0B` (Amber 500), Label `#92400E`.
- **Occupied / Sold:** Fill `#E2E8F0`, Border `#CBD5E1`, Icon/Label `#94A3B8` (disabled).
- **Accessible (CUD / Lower Deck Priority):** Border `#0284C7` (Sky 600), Icon `#0284C7`, Fill `#F0F9FF`.

## Typography

### Structural Decisions
- **Inter** is deployed universally across headlines, body copy, and operational UI components. Its geometric neutrality, tall x-height, and open counters guarantee that platform numbers, seat coordinates, departure times, and monetary figures remain legible across varying screen densities.
- **Tabular Figures (`tnum`):** All departure schedules, seat indicators, ARS currency amounts, countdown timers, and ticket reference codes must enforce OpenType tabular figures (`font-feature-settings: "tnum" 1`) to preserve vertical numerical alignment across tables and search cards.
- **Hierarchy:** High contrast between operational headers (`headline-lg` in `#0B2545`) and supporting details (`body-sm` in `#64748B`) allows users to scan origin, destination, platform number, and terminal data instantly.

## Layout & Spacing

### Grid Architecture
- **Desktop (>= 1024px):** 12-column responsive layout with `gutter-desktop` (24px) and max-width container capped at 1280px. Typical distribution: 8 columns for search results or bus seating maps, 4 columns for the sticky trip breakdown and checkout summary.
- **Tablet (768px - 1023px):** 8-column layout with `gutter` (16px) and `margin-tablet` (32px).
- **Mobile (< 768px):** 4-column layout with `gutter` (16px) and `margin` (16px). Seating schematics scale horizontally with horizontal pan controls or fixed multi-deck tabs.

### Density and Ergonomics
- Dense data displays (trip segments, passenger verification lists, seat deck matrices) use the compact `space-sm` (8px) and `space-xs` (4px) scale to prevent excessive page scrolling.
- Generous touch targets: All seat selections and interactive controls must retain a minimum interactive bounding box of 44x44px, even when the visible seat graphic is compact.

## Elevation & Depth

### Principles: Low-Elevation Institutional Precision
Depth is created primarily through surface segmentation and hairline structural borders (`#E2E8F0`), reserving shadow elevations for floating contextual elements and modal screens.

- **Level 0 (Flat Base):** Main viewport backdrop `#F8FAFC`. All primary content panels sit flat on this surface.
- **Level 1 (Card Rest):** Background `#FFFFFF`, border `1px solid #E2E8F0`, shadow `0 1px 3px 0 rgba(11, 37, 69, 0.05)`. Used for search itinerary cards, passenger legal forms, and pricing panels.
- **Level 2 (Interactive Hover & Seat Focus):** Background `#FFFFFF`, border `1px solid #CBD5E1`, shadow `0 4px 6px -1px rgba(11, 37, 69, 0.1), 0 2px 4px -2px rgba(11, 37, 69, 0.05)`. Used for hover states on trip options and active seat configurations.
- **Level 3 (Sticky Summaries & Dropdown Overlays):** Shadow `0 10px 15px -3px rgba(11, 37, 69, 0.12), 0 4px 6px -4px rgba(11, 37, 69, 0.08)`. Applied to mobile bottom sticky bars, service class selectors, and seat-deck toggle switches.
- **Level 4 (Modals & Validation Overlays):** Backdrop blur `4px` with background `rgba(11, 37, 69, 0.6)`. Modal surface sits at `shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.25)`. Used for legal authorization documentation (CUD upload, minor travel validation) and QR ticket expanded views.

## Shapes

### Shape Policy: Soft Angularity (Level 1)
To project structural reliability, civic authority, and operational firmness, the design system utilizes controlled, low-radius curvature (`0.25rem` / `4px` base):
- **Base Components (Inputs, Buttons, Badges, Seats):** `rounded` (4px). Provides a clean, modern aesthetic without the playfulness of heavily rounded interfaces.
- **Containers & Cards:** `rounded-lg` (8px). Maintains structure across itinerary cards and multi-passenger legal containers.
- **Floating Modals & QR Passports:** `rounded-xl` (12px). Softens larger viewport overlays.
- **Seat Glyph Geometry:** Seats feature squared armrests and a 4px softened backrest curvature, simulating physical bus architecture.
- **Pill Exception:** Service indicators (`CAMA`, `SEMICAMA`) and MoSCoW regulatory badges maintain full circular caps (`rounded-full`) to immediately distinguish categorical statuses from clickable interface blocks.

## Components

### 1. Itinerary Travel Cards (`TripCard`)
- **Structure:** 3-column desktop layout. 
  - *Col 1:* Departure time (large, bold, `#0B2545`), departure terminal, duration line with direct/stops pill, arrival time, and arrival terminal.
  - *Col 2:* Service level badge (`CAMA` in `#1E40AF` soft tint, `SEMICAMA` in `#64748B` soft tint), bus amenities icons (Wi-Fi, USB, Climate control).
  - *Col 3:* Price in ARS (`$ XX.XXX`, tabular figures, bold `#0B2545`), available seat counter (`X asientos disponibles`), and CTA button ("Elegir Asientos").
- **States:** Hover activates Level 2 elevation and `#1E40AF` 1px border.

### 2. Bus Seating Schematic (`SeatMapInteractive`)
- **Layout:** Two-deck switch tabs ("Planta Baja", "Planta Alta").
- **Grid Layout:** 2x2 seat rows for Semicama, 2x1 for Cama Executive, separated by a central aisle aisle path (`#F1F5F9`).
- **Interactive Seat Node:**
  - Sizing: Minimum 40x40px box with 4px border-radius.
  - Numbering: Crisp `11px` bold text centered inside the glyph.
  - Accessible Seats: Highlighted with an international wheelchair accessibility symbol and subtle blue outline.
  - Countdown Banner: When a seat is clicked, a sticky top banner triggers: `"Reserva temporal asegurada: 04:59"`, accented in `#EA580C`.

### 3. Regulatory Legal Validation Form (`ComplianceValidator`)
- **Validation Blocks:** Structured field groups for Argentina passenger identity verification:
  - Document Type selector (DNI, Pasaporte, Cédula Mercosur).
  - CUD Checkbox & Input: Integrated field for *Certificado Único de Discapacidad* with automatic real-time format validation badge.
  - Minor Authorization Selector (*Menores de 18 años*): Explicit selection modes (Viaja solo con autorización CNRT / Acompañado por progenitor / Acompañado por tutor legal) triggering mandatory document upload indicators.
- **Status Signals:** Verified fields display a green check (`#16A34A`), pending fields display slate hairlines, and regulatory errors show `#DC2626` alerts with explanatory decree legal text.

### 4. Digital Boarding Ticket (`TicketQRPass`)
- **Anatomy:** Header in `#0B2545` containing company branding and booking reference. Perforated hairline divider separating ticket body from the QR validation gate.
- **Data Matrix:** Tabular trip data (Passenger, DNI, Origin, Destination, Seat Number, Service Class, Departure Date/Time, Platform/Dársena).
- **QR Unit:** Centered 160x160px vector QR code framed by `#FFFFFF` padding with high error correction, accompanied by a dynamic green badge: `"Pasaje Válido para Abordar"`.

### 5. Buttons & Operational Controls
- **Primary Action (CTA):** `#EA580C` background, `#FFFFFF` text, 4px border radius. Used strictly for "Continuar al Pago" and final transactional commits.
- **Operational Secondary:** `#1E40AF` background, `#FFFFFF` text. Used for "Elegir Asiento", "Buscar Pasajes", and document submission.
- **Outlined / Tertiary:** `#FFFFFF` background, 1px solid `#CBD5E1`, text `#0B2545`. Used for deck toggles, filter resets, and invoice downloads.

### 6. MoSCoW Regulatory Badges
- **Must Have (Obligatorio CNRT):** Background `#FEE2E2`, Text `#991B1B`, Border `#F87171`.
- **Should Have (Recomendado):** Background `#FEF3C7`, Text `#92400E`, Border `#FBBF24`.
- **Could Have (Opcional):** Background `#E0F2FE`, Text `#075985`, Border `#7DD3FC`.
- **Won't Have (No Disponible):** Background `#F1F5F9`, Text `#64748B`, Border `#CBD5E1`.