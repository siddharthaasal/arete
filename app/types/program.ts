import { Exercise } from "./exercise";

export type ExerciseRole = 'warmup' | 'main' | 'accessory' | 'cooldown';
export type SetType = 'reps' | 'duration';
export type ExerciseAttribute = 'hypertrophy' | 'strength' | 'power' | 'endurance';

export interface WorkoutExercise {
  id: string; // unique instance id
  exerciseId: string;
  role: ExerciseRole;
  sets: number;
  type: SetType;
  reps?: { min: number; max: number } | number;
  durationSeconds?: number;
  attribute?: ExerciseAttribute;
  comments?: string;
  // Helper to store the full exercise data for display purposes
  exercise?: Exercise;
}

export interface Workout {
  id: string;
  name: string; // e.g., "Push Day"
  exercises: WorkoutExercise[];
}

export interface Program {
  id: string;
  name: string;
  description?: string;
  workouts: Workout[];
}
