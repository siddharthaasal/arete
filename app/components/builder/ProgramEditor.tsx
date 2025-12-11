"use client";

import { useState } from "react";
import { Program, Workout } from "@/app/types/program";
import { WorkoutEditor } from "./WorkoutEditor";
import { PlusIcon, SaveIcon } from "lucide-react";

export function ProgramEditor() {
  const [program, setProgram] = useState<Program>({
    id: crypto.randomUUID(),
    name: "New Program",
    description: "",
    workouts: []
  });

  const handleAddWorkout = () => {
    const newWorkout: Workout = {
      id: crypto.randomUUID(),
      name: `Day ${program.workouts.length + 1}`,
      exercises: []
    };

    setProgram({
      ...program,
      workouts: [...program.workouts, newWorkout]
    });
  };

  const handleUpdateWorkout = (workoutId: string, updatedWorkout: Workout) => {
    setProgram({
      ...program,
      workouts: program.workouts.map(w => w.id === workoutId ? updatedWorkout : w)
    });
  };

  const handleRemoveWorkout = (workoutId: string) => {
    setProgram({
      ...program,
      workouts: program.workouts.filter(w => w.id !== workoutId)
    });
  };

  const handleSave = () => {
    console.log("Saving Program:", program);
    alert("Program saved to console (ephemeral mode)");
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-onyx rounded-xl p-6 border border-storm/20 shadow-sm space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-storm">Program Name</label>
          <input
            type="text"
            value={program.name}
            onChange={(e) => setProgram({ ...program, name: e.target.value })}
            className="w-full text-3xl font-bold bg-transparent outline-none placeholder:text-storm/50 text-aegean dark:text-marble border-b border-transparent focus:border-aegean/20 transition-colors pb-1"
            placeholder="My Awesome Program"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-storm">Description</label>
          <textarea
            value={program.description || ''}
            onChange={(e) => setProgram({ ...program, description: e.target.value })}
            className="w-full min-h-[80px] rounded-lg border border-storm/20 bg-marble/50 dark:bg-storm/10 p-3 text-sm outline-none focus:ring-2 focus:ring-aegean/20 focus:border-aegean transition-all resize-y"
            placeholder="Describe the goal of this program..."
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-onyx dark:text-marble">Workouts</h2>
          <button
            onClick={handleAddWorkout}
            className="flex items-center gap-2 px-4 py-2 bg-aegean text-white rounded-lg hover:bg-aegean/90 transition-colors font-medium shadow-lg shadow-aegean/20"
          >
            <PlusIcon className="size-5" />
            Add Workout Day
          </button>
        </div>

        <div className="grid gap-8">
          {program.workouts.map((workout, index) => (
            <div key={workout.id} className="relative">
              <div className="absolute -left-4 top-6 bottom-6 w-0.5 bg-storm/10 hidden md:block" />
              <div className="absolute -left-[22px] top-8 size-4 rounded-full bg-aegean/20 border-2 border-aegean hidden md:block" />
              
              <WorkoutEditor
                workout={workout}
                onUpdate={(updated) => handleUpdateWorkout(workout.id, updated)}
                onRemove={() => handleRemoveWorkout(workout.id)}
              />
            </div>
          ))}

          {program.workouts.length === 0 && (
            <div className="text-center py-16 bg-marble/30 dark:bg-storm/5 rounded-xl border-2 border-dashed border-storm/10">
              <p className="text-storm text-lg">No workouts added yet.</p>
              <button
                onClick={handleAddWorkout}
                className="mt-4 text-aegean font-medium hover:underline"
              >
                Create your first workout day
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-8 right-8">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-gold text-onyx rounded-full font-bold shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          <SaveIcon className="size-5" />
          Save Program
        </button>
      </div>
    </div>
  );
}
