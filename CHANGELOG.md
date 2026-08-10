# Changelog

All notable changes to **Echo — GWA Calculator** are documented here.

---

## 2026-08-08
### Changed
- Full responsiveness pass across all screen sizes, ensuring the app is usable on mobile, tablet, and desktop

---

## 2026-08-07
### Docs
- Updated `README.md` and `DESIGN.md`

---

## 2026-08-06
### Added
- Integrated Sentry for error tracking, monitoring, and performance debugging

---

## 2026-08-04
### Added
- Modal component (for future use)
### Changed
- Minor style adjustments across the UI
- Reworked the Restriction Card UI
- Configured the Geist Mono font and removed unwanted top/bottom margin and padding
### Fixed
- Bug in Geist Mono font rendering

---

## 2026-08-03
### Added
- Customizable academic policy restrictions, allowing a flexible GWA calculator with configurable Latin honor limitations

---

## 2026-08-02
### Added
- Partial UI for the customizable academic policy (Latin honor eligibility settings)
### Docs
- Updated `README.md`

---

## 2026-07-31
### Added
- Completed Summary Report UI — downloadable as an image
- Lazy loading for images and pages
### Fixed
- Migrated Vercel Analytics and Speed Insights to their React-native package versions
### Changed
- General performance optimizations
### Chore
- Added a CI branch check to prevent errors from reaching `main`
### Docs
- Created and updated `README.md`

---

## 2026-07-30
### Added
- Summary Report can now be downloaded (initial version — UI still evolving)

---

## 2026-07-29
### Added
- Initial Footer component design
- 404 Not Found page with a catch-all route
- Error Boundary to prevent blank white screens on runtime errors
- Vercel Speed Insights and Analytics integration
- Partial design of the GWA Summary Report

---

## 2026-07-28
### Added
- Favicon icons and web app manifest
- New color palette and font choices
- Error notifications and red input borders for invalid fields (e.g. empty grade/units)
- GitHub Actions CI pipeline
- Core GWA calculation utilities
- Initial project design: Navbar, Dashboard, Footer, and base components (Button, Subject Card)
### Chore
- Added a pull request job to CI

---

## 2026-07-26
### Added
- Project scaffolding with Vite + TypeScript
- Initial folder structure and `README.md`