import { Exercise } from "./types/exercise";
import exercisesData from "./data/exercises.json";

const exercises = exercisesData as Exercise[];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-8 font-sans">
      <main className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Exercise Library
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            A comprehensive list of exercises for your workouts.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
            >
              <div className="p-6 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 capitalize">
                    {exercise.category}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 capitalize">
                    {exercise.equipment}
                  </span>
                </div>

                <h2 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {exercise.name}
                </h2>

                <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <div>
                    <span className="font-medium text-zinc-900 dark:text-zinc-200">Primary: </span>
                    <span className="capitalize">{exercise.muscles.primary.join(", ")}</span>
                  </div>
                  {exercise.muscles.secondary.length > 0 && (
                    <div>
                      <span className="font-medium text-zinc-900 dark:text-zinc-200">Secondary: </span>
                      <span className="capitalize">{exercise.muscles.secondary.join(", ")}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-800/50 px-6 py-4 border-t border-zinc-100 dark:border-zinc-800">
                {exercise.videoUrl ? (
                  <a
                    href={exercise.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-2"
                  >
                    Watch Tutorial <span>→</span>
                  </a>
                ) : (
                  <span className="text-sm text-zinc-400 italic">No video available</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
