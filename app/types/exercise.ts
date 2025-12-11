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
  | 'lats'
  // New specific muscle groups
  | 'Serratus Anterior'
  | 'Rhomboids'
  | 'Pectoralis Minor'
  | 'Middle Trapezius'
  | 'Lower Trapezius'
  | 'Pectoralis Major'
  | 'Anterior Deltoids'
  | 'Triceps'
  | 'Core'
  | 'Medial Deltoids'
  | 'Gluteus Maximus'
  | 'Gluteus Medius'
  | 'Erector Spinae'
  | 'Latissimus Dorsi'
  | 'Brachialis'
  | 'Trapezius'
  | 'Quadriceps'
  | 'Forearms'
  | 'Forearm'
  | 'Upper Trapezius'
  | 'Rear Deltoids'
  | 'Rotator Cuff'
  | 'Infraspinatus'
  | 'Teres Minor'
  | 'Posterior Deltoids'
  | 'Adductors'
  | 'Hip Flexors'
  | 'Patellar Tendon'
  | 'Gastrocnemius'
  | 'Soleus'
  | 'Tibialis Anterior';

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
