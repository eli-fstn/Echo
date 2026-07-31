# Echo

**Echo** is a client-side web application for calculating a student's General Weighted Average (GWA) from subject grades and units. It provides a lightweight workflow for entering academic data, reviewing weighted totals, and exporting a summary report as a PNG image.

[![Status](https://img.shields.io/badge/Status-Deployed-00C853)](https://example.com)
[![Audience](https://img.shields.io/badge/Audience-Section--Based-purple)](https://example.com)
[![Platform](https://img.shields.io/badge/Type-Web%20Application-blue)](https://example.com)


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

## Technology Stack

| Layer | Technology | Version |
|-------|------------|:-------:|
| Frontend | React | ^19.2.7 |
| Frontend | React DOM | ^19.2.7 |
| Routing | React Router DOM | ^7.18.2 |
| Language | TypeScript | ~6.0.2 |
| Build Tool | Vite | ^8.1.1 |
| Styling | Tailwind CSS | ^4.3.3 |
| Styling | Tailwind Vite Plugin | ^4.3.3 |
| Image Export | html-to-image | ^1.11.13 |
| Icons | @iconify/react | ^6.0.2 |
| Analytics | Vercel Analytics | ^2.0.1 |
| Performance | Vercel Speed Insights | ^2.0.0 |
| Linting | ESLint | ^10.6.0 |
| Linting | TypeScript ESLint | ^8.62.0 |

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
