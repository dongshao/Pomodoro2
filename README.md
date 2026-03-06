<h1 align="center">🍅 Pomodoro Focus</h1>

<p align="center">
  <strong>A minimalist, zero-backend Pomodoro web application built with Vue 3, Vite, and Pinia.</strong>
</p>

<p align="center">
  <a href="https://dongshao.github.io/Pomodoro2/">
    🚀 View Live Demo
  </a>
</p>

## ✨ Features

- **Pure Frontend, Zero Backend:** Everything runs locally in your browser. No servers, no sign-ups.
- **Smart Timers:** 25-minute Pomodoro, 5-minute Short Break, and 15-minute Long Break modes.
- **Task Focus List:** Add your tasks, mark them complete, and "Focus" on what matters most right now.
- **Local Persistence:** Your tasks and custom settings are automatically saved to `localStorage`.
- **Dynamic Theming:** Smooth CSS-variable driven color palettes (Deep Red for focus, Teal for rest).
- **Tab Integrations:** The active task and remaining time sync straight to your browser's tab title.

## 🛠️ Technology Stack

- **Framework:** Vue 3 (Composition API)
- **State Management:** Pinia
- **Build Tool:** Vite
- **Styling:** Vanilla CSS & CSS Variables
- **Deployment:** GitHub Actions -> GitHub Pages

## 🚀 Getting Started

If you want to run this application locally for development:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dongshao/Pomodoro2.git
   cd Pomodoro2
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local dev server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173/`.

## 📦 Deployment

This project uses **GitHub Actions** for CI/CD. Any push to the `main` or `master` branch will automatically trigger a build, and the static assets will be published out to the `gh-pages` branch for hosting.