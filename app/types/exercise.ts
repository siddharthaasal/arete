export type MuscleGroup = 
  | 'chest' 
  | 'back' 
  | 'shoulders' 
  | 'biceps' 
  | 'triceps' 
  | 'quads' 
  | 'hamstrings' 
  | 'glutes' 
  | 'calves' 
  | 'abs' 
  | 'forearms'
  | 'traps'
  | 'lats';

export type Equipment = 
  | 'barbell' 
  | 'dumbbell' 
  | 'machine' 
  | 'cables' 
  | 'bodyweight' 
  | 'kettlebell' 
  | 'bands' 
  | 'other';

export type ExerciseCategory = 'push' | 'pull' | 'legs' | 'core' | 'cardio' | 'other';

export interface Exercise {
  id: string;
  name: string;
  equipment: Equipment;
  videoUrl?: string;
  muscles: {
    primary: MuscleGroup[];
    secondary: MuscleGroup[];
  };
  precautions?: string[];
  cues?: string[];
  category: ExerciseCategory;
}
