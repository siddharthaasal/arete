"use client";

import { useState } from "react";
import { Workout, WorkoutExercise } from "@/app/types/program";
import { Exercise } from "@/app/types/exercise";
import { ExerciseSelector } from "./ExerciseSelector";
import { ExerciseCard } from "./ExerciseCard";
import { PlusIcon, Trash2Icon } from "lucide-react";
import exercisesData from "@/app/data/exercises.json";

const allExercises = exercisesData as Exercise[];

interface WorkoutEditorProps {
  workout: Workout;
  onUpdate: (workout: Workout) => void;
  onRemove: () => void;
}

export function WorkoutEditor({ workout, onUpdate, onRemove }: WorkoutEditorProps) {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  const handleAddExercise = (exercise: Exercise) => {
    const newExercise: WorkoutExercise = {
      id: crypto.randomUUID(),
      exerciseId: exercise.id,
      role: 'main',
      sets: 3,
      type: 'reps',
      reps: { min: 8, max: 12 },
      exercise: exercise // Store full object for display
    };

    onUpdate({
      ...workout,
      exercises: [...workout.exercises, newExercise]
    });
  };

  const handleUpdateExercise = (exerciseId: string, updates: Partial<WorkoutExercise>) => {
    onUpdate({
      ...workout,
      exercises: workout.exercises.map(ex => 
        ex.id === exerciseId ? { ...ex, ...updates } : ex
      )
    });
  };

  const handleRemoveExercise = (exerciseId: string) => {
    onUpdate({
      ...workout,
      exercises: workout.exercises.filter(ex => ex.id !== exerciseId)
    });
  };

  return (
    <div className="bg-marble/30 dark:bg-storm/5 rounded-xl border border-storm/10 p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-storm/10 pb-4">
        <input
          type="text"
          value={workout.name}
          onChange={(e) => onUpdate({ ...workout, name: e.target.value })}
          className="text-xl font-bold bg-transparent outline-none placeholder:text-storm/50 text-aegean dark:text-marble w-full"
          placeholder="Workout Name (e.g. Push Day)"
        />
        <button 
          onClick={onRemove}
          className="text-storm hover:text-red-500 transition-colors"
          title="Remove Workout"
        >
          <Trash2Icon className="size-5" />
        </button>
      </div>

      <div className="space-y-4">
        {workout.exercises.map(workoutExercise => {
          // Hydrate exercise data if missing (should be there from add, but good for safety)
          const exerciseData = workoutExercise.exercise || allExercises.find(e => e.id === workoutExercise.exerciseId);
          
          if (!exerciseData) return null;

          return (
            <ExerciseCard
              key={workoutExercise.id}
              workoutExercise={workoutExercise}
              exercise={exerciseData}
              onUpdate={(updates) => handleUpdateExercise(workoutExercise.id, updates)}
              onRemove={() => handleRemoveExercise(workoutExercise.id)}
            />
          );
        })}

        {workout.exercises.length === 0 && (
          <div className="text-center py-8 border-2 border-dashed border-storm/20 rounded-lg text-storm">
            No exercises added yet.
          </div>
        )}

        <button
          onClick={() => setIsSelectorOpen(true)}
          className="w-full py-3 rounded-lg border-2 border-dashed border-storm/20 text-storm hover:border-aegean hover:text-aegean hover:bg-aegean/5 transition-all flex items-center justify-center gap-2 font-medium"
        >
          <PlusIcon className="size-5" />
          Add Exercise
        </button>
      </div>

      <ExerciseSelector
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        onSelect={handleAddExercise}
      />
    </div>
  );
}
