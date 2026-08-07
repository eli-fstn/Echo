# Echo

![Status](https://img.shields.io/badge/Status-Deployed-00C853)
![Audience](https://img.shields.io/badge/Audience-Students-purple)
![Platform](https://img.shields.io/badge/Type-Web%20Application-blue)

Echo is a client-side web application for calculating a student's General Weighted Average (GWA) and predicting Latin honors. It provides a compact workflow for entering subjects (name, grade, units), reviewing weighted totals, configuring academic policy, and exporting a printable summary report as a PNG image.

## Project overview

- Purpose: lightweight, student-focused GWA calculator and Latin honors predictor.
- Runtime: single-page React + TypeScript app built with Vite; client-only UI, no backend required.

## Features (implemented)

- Dynamic subject cards: add and remove subjects at will (`src/components/ui/SubjectCard.tsx`).
- GWA calculation: computes Σ(Grade × Units) ÷ Σ(Units) (`src/utils/calculateGwa.ts`).
- Latin honors prediction: evaluates eligibility using configurable thresholds (`LatinHonor` in `src/utils/calculateGwa.ts`).
- Custom academic policy configuration: configure maximum GWA thresholds and lowest allowable subject grades (`src/components/ui/RestrictionCard.tsx`).
- Editable maximum GWA requirements: Summa, Magna, and Cum Laude thresholds are editable in the UI.
- Editable lowest allowable grade requirements: per-honor lowest allowed subject grade (optional).
- Detection of failing grades: optional "No Failing Grades" checkbox disqualifies honors when enabled.
- PNG report generation/export: generates a summary report image using `html-to-image` and downloads a PNG (`src/pages/Dashboard.tsx`).
- Responsive interface: UI uses Tailwind utility classes and is arranged to accommodate typical viewport sizes.
- Reusable UI components: `Button`, `SubjectCard`, `RestrictionCard`, `TypingText`, `Navbar`, `Footer` and other small components.

Note: the project exports the report as PNG (via `html-to-image`), not a PDF.


## Technology stack

| Layer | Technology | Version |
|-------|------------|---------|
| Frontend framework | React | 19.2.7 |
| Runtime DOM | React DOM | 19.2.7 |
| Routing | react-router-dom | 7.18.2 |
| Language | TypeScript | 6.0.2 |
| Build tool | Vite | 8.1.1 |
| Styling | Tailwind CSS | 4.3.3 |
| Image export | html-to-image | 1.11.13 |
| Icons | @iconify/react | 6.0.2 |
| Error tracking | @sentry/react | 10.69.0 |
| Analytics | @vercel/analytics | 2.0.1 |

Versions are taken from `package.json`.

## Folder structure

```
.
├── public/                 # static assets and manifest
├── src/
│   ├── assets/            # images, icons, logo
│   ├── components/        # reusable UI components
│   │   ├── common/        # shared utilities & boundaries
│   │   ├── layout/        # Navbar, Footer
│   │   └── ui/            # smaller UI controls (Button, SubjectCard, etc.)
│   ├── pages/             # top-level pages (Dashboard, error pages)
│   ├── style/             # global styles and tailwind imports
│   └── utils/             # calculation and helper functions
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Installation

Install dependencies with npm:

```bash
npm install
```

## Development

Start the development server locally:

```bash
npm run dev
```

Open http://localhost:5173 (or the port Vite reports) to view the app.

## Build

Create a production build:

```bash
npm run build
```

## Usage

- Add subjects using the "Add Subject" button.
- Enter grade and unit values for each subject (grades support 0.25 steps).
- Click "Calculate GWA" to compute the GWA and view the summary report.
- Configure academic policy in the Restrictions section and click "Confirm" to apply thresholds used by the honors evaluator.
- Use "Download Report" to export the summary as a PNG image.

## Project architecture

- Presentation: components under `src/components/*` compose the UI (layout, cards, controls).
- Pages: `src/pages/Dashboard.tsx` contains the main calculator flow and report generation.
- Business logic: `src/utils/calculateGwa.ts` contains calculation and Latin honor logic.
- Styling: Tailwind CSS styles are assembled via `src/style/style.css` and `tailwind.config.js`.

## License

This repository does not include a formal open-source license file. If you want a permissive license, add a `LICENSE` file (for example, MIT).

