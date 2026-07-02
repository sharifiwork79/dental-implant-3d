# کلینیک ایمپلنت دندان آرکا — Cinematic 3D Experience

یک وب‌سایت تمام‌صفحه و سینمایی برای کلینیک ایمپلنت دندان، ساخته‌شده با Next.js، React Three
Fiber، GSAP و Framer Motion. کاربر با اسکرول کردن، یک سفر ۳بعدی پنج‌مرحله‌ای را طی می‌کند:
دندان سالم → پوسیدگی → نیاز به ایمپلنت → فرآیند کاشت → لبخند نهایی.

## اجرای پروژه

```bash
npm install
npm run dev
```

سپس آدرس `http://localhost:3000` را باز کنید. برای build نهایی:

```bash
npm run build
npm run start
```

Deploy روی Vercel بدون تنظیمات اضافه کار می‌کند (`vercel deploy`).

---

## Architecture

```
app/
  layout.tsx        RTL <html dir="rtl">, loads Vazirmatn (Persian) via next/font
  page.tsx           assembles the fixed Canvas + the scrollable DOM sections
  globals.css        design tokens, glassmorphism utility classes

components/
  SmoothScroll.tsx   Lenis smooth-scroll wired into the GSAP ticker
  ScrollDirector.tsx one ScrollTrigger spanning the whole page -> writes
                     scrollProgress (0..1) into the zustand store
  PointerTracker.tsx window mousemove -> normalized pointer into the store

  canvas/
    Experience.tsx   the single fixed, full-viewport <Canvas> (pointer-events: none
                     so it never blocks the DOM content scrolling above it)
    CameraRig.tsx    interpolates the camera through 6 cinematic keyframes based on
                     scrollProgress, with mouse parallax + inertia (lerp, never snaps)
    SceneDirector.tsx derives the discrete story stage (healthy / decayed / missing /
                     implant) and the continuous implant-assembly value from scroll
    JawArch.tsx      the dental arch: gum ridge + 12 teeth positioned along a curve
    Tooth.tsx        procedural tooth (lathe geometry) with a "decayed" variant
    Implant.tsx      titanium screw + abutment + ceramic crown, animates assembly
                     imperatively via refs (no re-renders while scrolling)
    geometry.ts       all procedural geometry generators live here

  sections/          the 7 DOM sections (Hero, Problem, Need, Process, Result, Trust, CTA)
                     — plain scrolling content with Framer Motion reveal animations,
                     laid over the fixed 3D canvas

  ui/
    Nav.tsx          glassmorphism nav, active-state synced to the current stage
    Button3D.tsx      buttons that tilt in 3D on hover (Framer Motion springs)

lib/
  store.ts           zustand store: the single source of truth shared between the
                     DOM (GSAP/scroll) and the R3F scene (camera, model state)
  gsap.ts             registers ScrollTrigger once, client-side only
```

### Why one fixed Canvas instead of a Canvas per section?

Mounting/unmounting WebGL contexts per section causes visible pops and kills
performance. Here there is exactly one `<Canvas>`, fixed behind the DOM content;
`ScrollDirector` converts scroll position into a single `scrollProgress` float, and
everything 3D (camera, tooth model state, implant assembly) derives from that one
number every frame. The DOM sections above it are just glass panels that fade in/out
with Framer Motion as they enter the viewport — the "3D scene" and the "reading
content" are two independent layers kept in sync only by scroll position.

---

## Honest notes on assets (read this before presenting to a client)

- **The teeth, gum, and implant are procedural Three.js geometry** (see
  `components/canvas/geometry.ts`), not scanned dental models. This keeps the whole
  project dependency-free — no `.glb` downloads, no DRACO pipeline to configure, it
  just works the moment you `npm install`. It's intentionally stylised (a clean,
  editorial look) rather than photoreal.
- **To swap in real scans**: export DRACO-compressed `.glb` files (e.g. from an
  intraoral scanner export, or licensed stock dental models), drop them in `/public/models`,
  and load them with `useGLTF('/models/tooth.glb')` from `@react-three/drei` inside
  `Tooth.tsx` / `Implant.tsx` in place of the procedural geometry — the animation/state
  logic around them (`SceneDirector`, `Implant`'s assembly ref) doesn't need to change.
- **The Persian typeface is Vazirmatn** (open-source, loaded via `next/font/google`,
  no licensing step required). If the clinic has a licensed face like Peyda or
  IRANSansX, drop the `.woff2` files into `/public/fonts` and switch `app/layout.tsx`
  to `next/font/local` — the CSS variable names are already wired through
  `tailwind.config.ts`, so nothing else changes.
- **No AI-generated illustrations are bundled.** The brief asked for automatic
  AI-image generation as a fallback; since this codebase ships without a build-time
  image pipeline, that's left as an integration point rather than baked in — see
  the note in `components/sections/Trust.tsx` if you want to add a photography/illustration
  layer later (e.g. a licensed clinical photo set) instead of the current icon-based cards.

## Performance

- Single Canvas, `dpr` capped at `[1, 1.75]`, `powerPreference: "high-performance"`.
- All 3D animation is imperative (`useFrame` + refs), never triggers React re-renders.
- Geometry is generated once via `useMemo`, never rebuilt per frame.
- `prefers-reduced-motion` is respected globally (see `app/globals.css`).
- Postprocessing (`Bloom` + `Vignette`) is deliberately light — `multisampling={0}`,
  single bloom pass — to stay well within a 60fps budget on mid-range laptops.
