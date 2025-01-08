# Changelog

This file tracks released versions with the changes made to this project.

## Version 1.0.11

### Fixed

- Made `index.css` more declarative for styles that might be overriden by apps using it.
  - First noticed this when using Vite for the test app.
- Removed `.` from `README.md` after `![Foodie React Main](./assets/list.png)` and `![Foodie React List](./assets/restaurant.png)`,

## Version 1.0.9

### Fixed

- Added keywords, author, repository, to package.json and added assets to list of files for NPM.

## Version 1.0.7

### Added

- Added python script to publish code to NPM.
- Added git pre-commit hook to update version in package.json, CHANGELOG.md and README.md.

- first iteration of `foodie-react` as an NPM package.
