"use client";

import { WorkoutExercise, ExerciseRole, SetType, ExerciseAttribute } from "@/app/types/program";
import { Exercise } from "@/app/types/exercise";
import { Trash2Icon, Settings2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExerciseCardProps {
  workoutExercise: WorkoutExercise;
  exercise: Exercise;
  onUpdate: (updates: Partial<WorkoutExercise>) => void;
  onRemove: () => void;
}

export function ExerciseCard({ workoutExercise, exercise, onUpdate, onRemove }: ExerciseCardProps) {
  return (
    <div className="bg-white dark:bg-onyx rounded-lg border border-storm/20 p-4 shadow-sm space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold text-onyx dark:text-marble">{exercise.name}</h4>
          <p className="text-xs text-storm capitalize">{exercise.equipment} • {exercise.muscles.primary.join(", ")}</p>
        </div>
        <button 
          onClick={onRemove}
          className="text-storm/60 hover:text-red-500 transition-colors p-1"
          title="Remove exercise"
        >
          <Trash2Icon className="size-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
        <div className="space-y-1">
          <label className="text-xs font-medium text-storm">Role</label>
          <select
            value={workoutExercise.role}
            onChange={(e) => onUpdate({ role: e.target.value as ExerciseRole })}
            className="w-full rounded border border-storm/20 bg-marble/50 dark:bg-storm/10 px-2 py-1.5 outline-none focus:border-aegean"
          >
            <option value="warmup">Warm Up</option>
            <option value="main">Main</option>
            <option value="accessory">Accessory</option>
            <option value="cooldown">Cooldown</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-storm">Sets</label>
          <input
            type="number"
            min={1}
            value={workoutExercise.sets}
            onChange={(e) => onUpdate({ sets: parseInt(e.target.value) || 1 })}
            className="w-full rounded border border-storm/20 bg-marble/50 dark:bg-storm/10 px-2 py-1.5 outline-none focus:border-aegean"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-storm">Type</label>
          <select
            value={workoutExercise.type}
            onChange={(e) => onUpdate({ type: e.target.value as SetType })}
            className="w-full rounded border border-storm/20 bg-marble/50 dark:bg-storm/10 px-2 py-1.5 outline-none focus:border-aegean"
          >
            <option value="reps">Reps</option>
            <option value="duration">Duration</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-storm">
            {workoutExercise.type === 'reps' ? 'Rep Range' : 'Seconds'}
          </label>
          {workoutExercise.type === 'reps' ? (
             <div className="flex items-center gap-1">
               <input
                 type="number"
                 placeholder="Min"
                 className="w-full rounded border border-storm/20 bg-marble/50 dark:bg-storm/10 px-2 py-1.5 outline-none focus:border-aegean"
                 value={(typeof workoutExercise.reps === 'object' ? workoutExercise.reps.min : workoutExercise.reps) || ''}
                 onChange={(e) => {
                    const val = parseInt(e.target.value);
                    const currentMax = typeof workoutExercise.reps === 'object' ? workoutExercise.reps.max : val;
                    onUpdate({ reps: { min: val, max: currentMax } });
                 }}
               />
               <span className="text-storm">-</span>
               <input
                 type="number"
                 placeholder="Max"
                 className="w-full rounded border border-storm/20 bg-marble/50 dark:bg-storm/10 px-2 py-1.5 outline-none focus:border-aegean"
                 value={(typeof workoutExercise.reps === 'object' ? workoutExercise.reps.max : workoutExercise.reps) || ''}
                 onChange={(e) => {
                    const val = parseInt(e.target.value);
                    const currentMin = typeof workoutExercise.reps === 'object' ? workoutExercise.reps.min : val;
                    onUpdate({ reps: { min: currentMin, max: val } });
                 }}
               />
             </div>
          ) : (
            <input
              type="number"
              min={1}
              value={workoutExercise.durationSeconds || ''}
              onChange={(e) => onUpdate({ durationSeconds: parseInt(e.target.value) || 0 })}
              className="w-full rounded border border-storm/20 bg-marble/50 dark:bg-storm/10 px-2 py-1.5 outline-none focus:border-aegean"
            />
          )}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-storm">Comments</label>
        <input
          type="text"
          placeholder="Add notes..."
          value={workoutExercise.comments || ''}
          onChange={(e) => onUpdate({ comments: e.target.value })}
          className="w-full rounded border border-storm/20 bg-marble/50 dark:bg-storm/10 px-2 py-1.5 outline-none focus:border-aegean text-sm"
        />
      </div>
    </div>
  );
}
