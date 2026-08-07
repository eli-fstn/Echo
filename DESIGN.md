# Echo - Design System

This document describes the visual and interaction system used by Echo, derived from the project source and styles.

## Design philosophy

- Minimalist: reduce visual noise, prioritize numeric data and clarity.
- Monochrome: primarily uses dark gray/black for text and white or off-white backgrounds.
- Academic & professional: type and spacing favor clarity and readability for students and educators.
- Student-friendly: compact components, clear labels, and a distraction-free interaction flow.

## Branding

- Project name: Echo
- Logo: Orca motif used across the app (`src/assets/Echo-Logo.png`).
- Meaning: Echo suggests reflection and summarization — the app reflects a student's academic performance back to them in a concise report.
- Visual identity: monochrome orca silhouette, monospaced numerics, and a neutral background to make grades and numeric output prominent.

## Typography

The project imports fonts and configures a monospaced font as the primary numeric/utility font.

- Primary font: `Geist Mono` (declared in `index.html` and used via Tailwind config and `--font-mono`).
- Monospace fallback: system monospace stack (ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas).
- Font usage:
	- Headings: system sans / bold with monospace accent for the logo and numeric headings (`font-mono` used for many headings in code).
	- Body: neutral sans/monospace combination; numeric values intentionally use the monospaced font for tabular alignment.
	- Labels & Buttons: small-caps or small-sized monospace for a technical, academic feel.

## Color palette

Colors are taken from components and global styles.

| Purpose | Color | Hex |
|---------|-------|-----|
| Primary text / UI accents | Dark charcoal | #232323 |
| Background (app) | Warm off-white | #FBF8F3 |
| Card / surface | White | #FFFFFF |
| Muted text | Medium gray | #6B7280 (Tailwind gray-500) |
| Error / invalid | Red | #EF4444 (Tailwind red-500) |

## Components

Listed are the main reusable UI components implemented in the repository with their purpose.

- `Button` (`src/components/ui/Button.tsx`): lightweight clickable wrapper used throughout the app; applies subtle active/scale interactions.
- `SubjectCard` (`src/components/ui/SubjectCard.tsx`): input row for subject name, grade, and units; shows inline validation and delete action.
- `RestrictionCard` (`src/components/ui/RestrictionCard.tsx`): grouped form for editing academic policy (GWA thresholds and minimum allowed grades) and additional requirements like "No Failing Grades".
- `TypingText` (`src/components/ui/TypingText.tsx`): small animated intro text using a blinking caret.
- `Navbar` (`src/components/layout/Navbar.tsx`): top bar with logo and title.
- `Footer` (`src/components/layout/Footer.tsx`): bottom content with logo and short description.
- `Modal` (`src/components/ui/Modal.tsx`): present but not heavily used in the current codebase; provides content overlay behavior.

## Layout

- The application centers the primary content in a narrow column (`w-fit` classes) to keep focus on input forms and the generated report.
- Spacing is driven by Tailwind utility spacing (px, py, gap) with modest elevation using `shadow` and subtle hover transitions.

## Forms

- Input styles: small, mono-typed inputs (`text-xs`, `font-mono`) with single-line numerical inputs for grades and units.
- Validation: client-side basic validation — empty fields prevent calculation and mark the inputs; failing/invalid values are indicated by border color changes (`border-red-500`).
- Interactions: inline, immediate — changes update internal component state; calculation is performed via an explicit button.

## Motion

- Hover and transition: cards and controls have short transitions (`duration-100` / `duration-200`) and subtle translate or shadow changes on hover.
- Buttons: active press applies `scale-95` for tactile feedback.
- TypingText: a blinking caret animation (`@keyframes blink`) drives the intro text effect.

## Icons

- Icon library: Iconify via `@iconify/react` (used in `SubjectCard` for the delete/trash icon).

## Responsive design

- Tailwind utility classes provide basic responsiveness. The layout centers content and scales to available width; however, some fixed width utilities (e.g., `w-198.5`) may require refinement for very small screens.

## Accessibility

- Current considerations: semantic HTML inputs and buttons are used. There is no explicit aria or keyboard focus management across complex interactions; further accessibility improvements are recommended.

## Notable design decisions

- Dynamic subject cards: supports ad-hoc lists of subjects rather than a fixed-length form.
- User-controlled academic policies: users can enter their own GWA thresholds instead of hardcoded university rules.
- Manual calculation flow: the app requires an explicit "Calculate GWA" action to avoid unexpected recalculations while editing.
- Report export: generates a PNG snapshot of the report area for offline sharing and printing.

## Future design improvements

- Replace fixed width utilities with a responsive grid and container constraints for smaller screens.
- Improve keyboard and screen reader support (aria labels, role attributes, focus outlines).
- Add visual test fixtures and storybook for components.
- Provide a compact print stylesheet and an optional PDF export layout.
