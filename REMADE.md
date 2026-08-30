# Portfolio — Paniti Jahem (SolightzZ)

[![Live Site](https://img.shields.io/badge/Live-solightzz.github.io-0ea5e9?style=for-the-badge&logo=github-pages&logoColor=white)](https://solightzz.github.io/Portfolio/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=for-the-badge&logo=three.js)](https://threejs.org)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue?style=for-the-badge)](LICENSE)

> เว็บพอร์ตโฟลิโอส่วนตัวของ **Paniti Jahem (ปณิธิ จะแร่ม / SolightzZ)** — Full-Stack Developer
> สร้างด้วย React 19 + TypeScript + Three.js โฟกัสที่ประสิทธิภาพ, 3D Interactive Hero และการเข้าถึง (Accessibility)

---

## Overview

เว็บไซต์นี้คือพอร์ตโฟลิโออย่างเป็นทางการ นำเสนอตัวตน ผลงาน ประสบการณ์ ทักษะ และช่องทางการติดต่อของผู้พัฒนา ออกแบบมาให้:

- **โหลดเร็ว** — Vite 6 + code-splitting + lazy modal
- **สวยงาม** — บรรยากาศ Ice-Blue / Glassmorphism พร้อม 3D Hero Scene
- **เข้าถึงได้** — semantic HTML, ARIA, keyboard navigation, prefers-reduced-motion
- **SEO พร้อม** — Open Graph, Twitter Card, JSON-LD Person + WebSite
- **CI/CD อัตโนมัติ** — GitHub Actions -> Build -> Deploy ไปยัง GitHub Pages

## Features

### 1. Interactive 3D Hero
- **Three.js scene** ทำงานบน `<canvas>` แยกจาก DOM layer
- ตัวละคร 3D: Developer Character, Robot Assistant, Mini Planet, Floating Code Panels, Bookshelf, Developer Workspace
- รองรับ **WebGL fallback** (SceneFallback) เมื่ออุปกรณ์ไม่รองรับ
- ระบบ **disposal pipeline** ป้องกัน memory leak (`sceneDisposal.ts`)

### 2. Section ครบทุกหน้า
| Section | ไฟล์หลัก | คำอธิบาย |
|---|---|---|
| **Hero** | `features/hero/*` | Eyebrow + Rolling/Rotating text + CTAs + Socials + 3D Scene |
| **Selected Work** | `sections/SelectedWorkPreview` | การ์ดโปรเจคเด่น + filter + ProjectDetailModal (lazy) |
| **Experience** | `sections/ExperiencePreview` | ไทม์ไลน์ประสบการณ์ทำงาน |
| **Stack** | `sections/StackPreview` | Tech stack แบ่งหมวด + skill level |
| **About** | `sections/AboutPreview` | ประวัติส่วนตัว + 3D illustration |
| **Contact** | `sections/ContactSection` | ปุ่ม email + socials + ContactModal (lazy) |
| **Navbar / Footer** | `layout/*` | Anchor nav, scroll-spy ผ่าน `useActiveSection` |

### 3. UX / Motion
- **Framer Motion** (`motion`) สำหรับ micro-interactions
- **Scramble-on-hover** text effect
- **Scroll-reveal** headings
- **Rotating / Rolling text** animations
- **Copy-to-clipboard** email button

### 4. Modal System
- `ContactModal` และ `ProjectDetailModal` ใช้ **MUI Dialog**
- โหลดด้วย `React.lazy` + `Suspense` ลด initial bundle
- เปิดจากหลาย entrypoint (Hero / Navbar / Footer / Section)

### 5. Data-Driven
- ข้อมูลทั้งหมดอยู่ใน `src/data/portfolioData.ts` (single source of truth)
- มี `utils/projectFilters.ts` สำหรับ filter/sort โปรเจค
- Type-safe ด้วย `types/portfolio.ts`

## Testing & Quality

```
src/
├─ test/
│  ├─ setup.ts
│  ├─ acceptance/        <- visitor journey (E2E-style)
│  ├─ performance/       <- 3D scene perf budget
│  ├─ system/            <- system-level app tests
│  └─ mocks/three.ts     <- Three.js mocks
```

- **Unit / Integration**: Vitest + Testing Library + jsdom
- **Acceptance**: user-journey tests
- **Performance**: source-level assertions เพื่อกัน Three.js scene หนักเกิน
- **Mocks**: `three` ถูก mock เพื่อให้ test เร็วและเสถียร
- `npm run lint` = `tsc --noEmit` (type-check)
- `npm run security:audit` = `npm audit --audit-level=high`

## Architecture

```
src/
├─ App.tsx                    <- root composition
├─ main.tsx                   <- entry
├─ components/
│  ├─ common/                 <- shared (Modal, Scramble, Rotating, ScrollReveal)
│  ├─ features/hero/          <- hero-specific
│  ├─ layout/                 <- Navbar, Footer
│  ├─ sections/               <- page sections
│  └─ three/                  <- 3D scene (characters, environment, setup)
├─ data/portfolioData.ts      <- single source of truth
├─ hooks/                     <- useActiveSection, useScrambleText
├─ types/portfolio.ts         <- domain types
├─ utils/                     <- canvas, motion, scroll, projectFilters
└─ test/                      <- test infra
```

**Patterns**
- **Composition over inheritance** — `App.tsx` ประกอบ section ต่าง ๆ
- **Container / Presentational** — Hero แยก Container + Content + Actions + Socials
- **Lazy boundaries** — Modal โหลด on-demand
- **Three.js isolation** — scene, camera, lighting, disposal แยกไฟล์
- **Hook-based state** — scroll-spy ผ่าน `useActiveSection`

## Tech Stack

| Layer | Tools |
|---|---|
| **UI** | React 19, TypeScript 5.8 |
| **Styling** | Tailwind CSS 4, Emotion (MUI), custom CSS variables |
| **3D** | Three.js, @react-three (raw) |
| **Animation** | Motion (Framer Motion successor) |
| **Icons** | lucide-react |
| **Build** | Vite 6, @vitejs/plugin-react |
| **Test** | Vitest 4, Testing Library, jsdom, @vitest/ui |
| **Deploy** | GitHub Pages via GitHub Actions |

## Getting Started

```bash
# install
npm install

# dev server (http://localhost:3000)
npm run dev

# type-check
npm run lint

# unit / integration / acceptance tests
npm test

# build -> dist/
npm run build
```

## Deployment

CI/CD pipeline ทำงานผ่าน `.github/workflows/deploy.yml`:

```
push to main
   |
   v
[Build]  -->  npm ci
         -->  npm run lint        (tsc --noEmit)
         -->  npm test            (vitest)
         -->  npm run build       (vite build)
         -->  cp dist/index.html -> dist/404.html (SPA fallback)
         -->  upload Pages artifact
   |
   v
[Deploy] -->  actions/deploy-pages@v4 -> GitHub Pages
```

- Trigger: `push` on `main` (ยกเว้น `.github/**`, `*.md`) และ `workflow_dispatch`
- Concurrency: `cancel-in-progress` ต่อ ref
- Permissions: `contents:read`, `pages:write`, `id-token:write`
- ใช้ `404.html` mirror `index.html` เพื่อรองรับ client-side route refresh

## Security

- **CSP** ใน `<meta http-equiv>` — `default-src 'self'`, `object-src 'none'`, `upgrade-insecure-requests`
- **No inline scripts** ยกเว้น JSON-LD (จำเป็นสำหรับ SEO)
- **No secrets** ใน repo
- **Audit gate** ผ่าน `npm run security:audit`
- ใช้ `external_libraries` จาก whitelist เท่านั้น (Google Fonts)

## Author

**Paniti Jahem (ปณิธิ จะแร่ม) — SolightzZ**

- นักศึกษาสาขาเทคโนโลยีสารสนเทศ มหาวิทยาลัยราชภัฏอุดรธานี (UDRU)
- Frontend Developer & Backend Developer
- อ.เมือง, จ.อุดรธานี, ประเทศไทย
- [github.com/SolightzZ](https://github.com/SolightzZ)
- paniti.jahem.work@gmail.com

## License

Apache License 2.0
