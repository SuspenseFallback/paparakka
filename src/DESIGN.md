# Papaya Design System

This document outlines the design system for the Papaya website, ensuring a consistent and professional user experience.

## Color Palette

The color palette is defined in `src/theme.css` using CSS variables.

### Primary Colors
- `var(--app-theme-color)`: The main theme color, used for primary buttons and accents. (Orange)
- `var(--app-theme-hover-color)`: The hover state for the primary theme color.
- `var(--app-theme-secondary-color)`: The secondary theme color, used for secondary buttons and accents. (Green)
- `var(--app-theme-secondary-hover-color)`: The hover state for the secondary theme color.

### Neutral Colors
- `var(--app-background-color)`: The main background color of the app.
- `var(--app-primary-color)`: The background color for primary elements like cards and modals.
- `var(--app-primary-hover-color)`: The hover state for primary elements.
- `var(--app-secondary-color)`: The background color for secondary elements.
- `var(--app-primary-text-color)`: The primary text color.
- `var(--app-secondary-text-color)`: The secondary text color, used on colored backgrounds.
- `var(--app-grey)`: A standard grey color.
- `var(--app-light-grey)`: A lighter grey color.
- `var(--app-border-color)`: The color for borders on buttons and other elements.

## Typography

- **Font:** Sora (from Google Fonts)
- **Weights:** 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)

### Headings
- **h1:** 2.5rem (40px), 700 weight
- **h2:** 2rem (32px), 700 weight
- **h3:** 1.75rem (28px), 600 weight
- **h4:** 1.5rem (24px), 600 weight
- **h5:** 1.25rem (20px), 500 weight
- **h6:** 1rem (16px), 500 weight

### Body Text
- **p:** 1rem (16px), 400 weight

## Components

### Buttons
- **`border-radius`**: 8px
- **`border`**: 1px solid `var(--app-border-color)`
- **`padding`**: 16px
- **`font-size`**: 14px

### Cards
- **`border-radius`**: 8px
- **`box-shadow`**: `var(--app-shadow)`

### Modals
- **`border-radius`**: 8px
- **`box-shadow`**: `var(--app-shadow)`
