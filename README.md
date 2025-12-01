# Arete

Arete is a comprehensive workout tracking application designed to help users create, track, and analyze their workouts. It currently features a curated, high-quality exercise library with detailed cues, precautions, and muscle group targeting.

## Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Storage**: JSON (Local file-based for now, migrating to DB later)

## Getting Started

Follow these steps to replicate the environment and run the app locally.

### Prerequisites

- **Node.js**: Version 18 or higher.
- **Package Manager**: `pnpm` is recommended (but `npm` or `yarn` work too).

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/siddharthaasal/arete.git
   cd arete
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **View the app**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

The project follows a standard Next.js App Router structure with a few custom directories for data management:

- **`app/data/exercises.json`**:
  Contains the seed data for the exercise library. This is currently the source of truth for the application's content.
- **`app/types/exercise.ts`**:
  Contains TypeScript interfaces defining the data model (e.g., `Exercise`, `MuscleGroup`, `Equipment`).

- **`app/page.tsx`**:
  The main entry point that fetches data from the JSON file and renders the exercise grid.

## How to Add Exercises

To add or modify exercises without a database connection:

1. Open `app/data/exercises.json`.
2. Add a new exercise object to the array. Ensure it matches the `Exercise` type:
   ```json
   {
     "id": "unique-id",
     "name": "Exercise Name",
     "equipment": "barbell",
     "category": "push",
     "muscles": {
       "primary": ["chest"],
       "secondary": ["triceps"]
     },
     "precautions": ["Safety tip 1"],
     "cues": ["Form cue 1"]
   }
   ```
3. Save the file. The application will hot-reload with the new data.

## Contributing

We welcome contributions to the exercise library! To add new exercises or improve existing ones, please follow these steps:

1. **Fork the Repository**: Click the "Fork" button at the top right of this page to create your own copy of the repository.
2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/siddharthaasal/arete.git
   cd arete
   ```
3. **Create a Branch**:
   ```bash
   git checkout -b feat/add-new-exercise
   ```
4. **Make Changes**: Add your exercise to `app/data/exercises.json`.
5. **Commit and Push**:
   ```bash
   git add .
   git commit -m "feat: add [Exercise Name]"
   git push origin feat/add-new-exercise
   ```
6. **Open a Pull Request**: Go to the original `arete` repository and click "New Pull Request". Select your branch to submit your changes for review.
