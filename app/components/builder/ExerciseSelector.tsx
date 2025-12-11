"use client";

import { useState, useMemo } from "react";
import { Exercise, ExerciseCategory, MuscleGroup } from "@/app/types/exercise";
import exercisesData from "@/app/data/exercises-updated.json";
import { cn } from "@/lib/utils";
import { XIcon, SearchIcon, PlusIcon } from "lucide-react";

const exercises = exercisesData as Exercise[];
const categories: ExerciseCategory[] = Array.from(new Set(exercises.map(e => e.category))).sort();
const muscles: MuscleGroup[] = Array.from(new Set(exercises.flatMap(e => e.muscles.primary))).sort();

interface ExerciseSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (exercise: Exercise) => void;
}

export function ExerciseSelector({ isOpen, onClose, onSelect }: ExerciseSelectorProps) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-onyx w-full max-w-3xl max-h-[80vh] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-storm/20">
        <div className="p-4 border-b border-storm/10 flex items-center justify-between">
          <h2 className="text-xl font-bold text-aegean dark:text-marble">Select Exercise</h2>
          <button onClick={onClose} className="text-storm hover:text-aegean dark:hover:text-gold transition-colors">
            <XIcon className="size-6" />
          </button>
        </div>

        <div className="p-4 bg-marble/30 dark:bg-storm/5 border-b border-storm/10 space-y-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-storm/60" />
            <input
              type="text"
              placeholder="Search exercises..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-storm/20 bg-white dark:bg-storm/10 py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-aegean/20 focus:border-aegean transition-all"
            />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-1">
             <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ExerciseCategory | "all")}
                className="appearance-none rounded-lg border border-storm/20 bg-white dark:bg-storm/10 py-2 pl-3 pr-8 text-sm outline-none focus:ring-2 focus:ring-aegean/20 focus:border-aegean transition-all cursor-pointer capitalize text-onyx dark:text-marble"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={selectedMuscle}
                onChange={(e) => setSelectedMuscle(e.target.value as MuscleGroup | "all")}
                className="appearance-none rounded-lg border border-storm/20 bg-white dark:bg-storm/10 py-2 pl-3 pr-8 text-sm outline-none focus:ring-2 focus:ring-aegean/20 focus:border-aegean transition-all cursor-pointer capitalize text-onyx dark:text-marble"
              >
                <option value="all">All Muscles</option>
                {muscles.map(muscle => (
                  <option key={muscle} value={muscle}>{muscle}</option>
                ))}
              </select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredExercises.map(exercise => (
            <button
              key={exercise.id}
              onClick={() => {
                onSelect(exercise);
                onClose();
              }}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-storm/10 hover:border-aegean/50 hover:bg-aegean/5 dark:hover:bg-aegean/10 transition-all group text-left"
            >
              <div>
                <div className="font-medium text-onyx dark:text-marble group-hover:text-aegean dark:group-hover:text-gold transition-colors">
                  {exercise.name}
                </div>
                <div className="text-xs text-storm mt-1 capitalize">
                  {exercise.category} • {exercise.muscles.primary.join(", ")}
                </div>
              </div>
              <PlusIcon className="size-5 text-storm/50 group-hover:text-aegean dark:group-hover:text-gold" />
            </button>
          ))}
          {filteredExercises.length === 0 && (
            <div className="text-center py-12 text-storm">
              No exercises found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
