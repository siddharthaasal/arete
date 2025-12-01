"use client";

import { useState, useMemo } from "react";
import { Exercise, ExerciseCategory, MuscleGroup } from "./types/exercise";
import exercisesData from "./data/exercises.json";
import { ExerciseModal } from "./components/ExerciseModal";

const exercises = exercisesData as Exercise[];

// Extract unique values for filters
const categories: ExerciseCategory[] = Array.from(new Set(exercises.map(e => e.category))).sort();
const muscles: MuscleGroup[] = Array.from(new Set(exercises.flatMap(e => e.muscles.primary))).sort();

export default function Home() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | "all">("all");
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | "all">("all");

  const filteredExercises = useMemo(() => {
    return exercises.filter(exercise => {
      const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || exercise.category === selectedCategory;
      const matchesMuscle = selectedMuscle === "all" || exercise.muscles.primary.includes(selectedMuscle);
      
      return matchesSearch && matchesCategory && matchesMuscle;
    });
  }, [searchQuery, selectedCategory, selectedMuscle]);

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedExercise(null), 200); // Clear after animation
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-4 md:p-8 font-sans">
      <main className="max-w-7xl mx-auto w-full">
        <header className="mb-8 flex flex-col gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                Exercise Library
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                {filteredExercises.length} {filteredExercises.length === 1 ? 'exercise' : 'exercises'} found
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search exercises..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-zinc-400"
              />
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-1 sm:pb-0">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as ExerciseCategory | "all")}
                  className="appearance-none rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 py-2 pl-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer capitalize"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <select
                  value={selectedMuscle}
                  onChange={(e) => setSelectedMuscle(e.target.value as MuscleGroup | "all")}
                  className="appearance-none rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 py-2 pl-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer capitalize"
                >
                  <option value="all">All Muscles</option>
                  {muscles.map(muscle => (
                    <option key={muscle} value={muscle}>{muscle}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="w-full overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 font-medium border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="py-3 pl-4 pr-3 font-medium">Name</th>
                  <th className="py-3 px-3 font-medium">Category</th>
                  <th className="py-3 px-3 font-medium">Muscles</th>
                  <th className="py-3 px-3 font-medium">Equipment</th>
                  <th className="py-3 pl-3 pr-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50 bg-white dark:bg-zinc-950">
                {filteredExercises.length > 0 ? (
                  filteredExercises.map((exercise) => (
                    <tr
                      key={exercise.id}
                      onClick={() => handleExerciseClick(exercise)}
                      className="group hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer"
                    >
                      <td className="py-3 pl-4 pr-3 font-medium text-zinc-900 dark:text-zinc-200">
                        {exercise.name}
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center rounded-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 capitalize">
                          {exercise.category}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-zinc-600 dark:text-zinc-400 capitalize max-w-[200px] truncate">
                        {exercise.muscles.primary.join(", ")}
                      </td>
                      <td className="py-3 px-3 text-zinc-600 dark:text-zinc-400 capitalize">
                        {exercise.equipment}
                      </td>
                      <td className="py-3 pl-3 pr-4 text-right">
                        <span className="text-indigo-600 dark:text-indigo-400 text-xs font-medium">
                          View Details
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-zinc-500 dark:text-zinc-400">
                      No exercises found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <ExerciseModal 
        exercise={selectedExercise} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
}
