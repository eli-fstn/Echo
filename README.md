# Echo

[![Status](https://img.shields.io/badge/Status-Deployed-00C853)](https://example.com)
[![Audience](https://img.shields.io/badge/Audience-Section--Based-purple)](https://example.com)
[![Platform](https://img.shields.io/badge/Type-Web%20Application-blue)](https://example.com)

Echo is a client-side web application for calculating a student's General Weighted Average (GWA) from subject grades and units. It provides a lightweight workflow for entering academic data, reviewing weighted totals, and exporting a summary report as a PNG image.

## Overview

Echo is built as a single-page React application with TypeScript and Vite. The app runs entirely in the browser and does not require a backend service for calculation or report generation.

## Key Features

- Add and remove subjects dynamically in the calculator form
- Enter subject names, grades, and units with input validation
- Calculate GWA and weighted grade totals from the entered data
- Display Latin honor eligibility ranges based on the computed GWA
- Generate a downloadable summary report as a PNG image
- Show inline validation errors when required fields are left empty
- Provide a simple routing structure with a dedicated not-found page

## Screenshots

Screenshots will be added to the repository once visual assets are available. The current interface is designed around the calculator form and generated summary report.

## Technology Stack

- React 19
- TypeScript
- Vite 8
- React Router DOM
- Tailwind CSS
- html-to-image for report export
- @iconify/react for icons
- Vercel Analytics and Speed Insights
- ESLint with TypeScript ESLint

## Folder Structure

```text
.
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   └── ui/
│   ├── pages/
│   │   └── errors/
│   └── utils/
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

Start the development server:

```bash
npm run dev
```

The app will be served locally through Vite with the browser opening automatically.

## Build and Deployment

Create a production build:

```bash
npm run build
```

The build output is generated in the dist directory. Because the application is a static frontend, it can be deployed to any static hosting provider such as Vercel, Netlify, or GitHub Pages.


## License

This project is intended for academic and personal use only.
All rights reserved.
