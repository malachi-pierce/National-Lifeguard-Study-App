# Lifeguard Study App

A comprehensive study tool for National Lifeguard certification, combining spaced repetition, scenario-based learning, and gamification.

## Features

- **Learn Mode**: Study lifeguarding material with text, images, and PDFs
- **Quiz Mode**: Multiple question types with confidence tracking
- **Spaced Repetition**: Smart scheduling to move knowledge into long-term memory
- **Progress Tracking**: Visual stats, streaks, and mastery levels
- **Cross-Device Sync**: Real-time sync via Firebase
- **Offline Support**: Study anywhere, even without internet

## Tech Stack

- React + TypeScript
- Vite (build tool)
- Firebase (Auth, Firestore, Storage)
- Tailwind CSS
- React Query (TanStack Query)
- Zustand (state management)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment

This app is deployed to GitHub Pages with Firebase backend.

## Project Structure

```
src/
  components/     # Reusable UI components
  hooks/           # Custom React hooks
  pages/           # Route pages
  services/        # Firebase and API services
  stores/          # Zustand state stores
  types/           # TypeScript interfaces
  utils/           # Helper functions
```

## License

Built for personal study use.
