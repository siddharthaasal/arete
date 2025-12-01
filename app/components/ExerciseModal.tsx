import { Exercise } from "../types/exercise";
import { useEffect } from "react";

interface ExerciseModalProps {
  exercise: Exercise | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ExerciseModal({ exercise, isOpen, onClose }: ExerciseModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !exercise) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl overflow-hidden rounded-xl bg-white dark:bg-zinc-900 shadow-2xl ring-1 ring-zinc-200 dark:ring-zinc-800 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {exercise.name}
            </h2>
            <div className="mt-1 flex items-center gap-2">
              <span className="inline-flex items-center rounded-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 capitalize">
                {exercise.category}
              </span>
              <span className="text-xs text-zinc-400">•</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 capitalize">
                {exercise.equipment}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-500 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-8">
            {/* Muscles */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-200 mb-2">Primary Muscles</h3>
                <div className="flex flex-wrap gap-2">
                  {exercise.muscles.primary.map((muscle) => (
                    <span key={muscle} className="inline-flex items-center rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:text-indigo-300 capitalize">
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
              {exercise.muscles.secondary.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-200 mb-2">Secondary Muscles</h3>
                  <div className="flex flex-wrap gap-2">
                    {exercise.muscles.secondary.map((muscle) => (
                      <span key={muscle} className="inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 capitalize">
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Cues */}
            {exercise.cues && exercise.cues.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-200 mb-3 flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Performance Cues
                </h3>
                <ul className="space-y-2">
                  {exercise.cues.map((cue, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                      {cue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Precautions */}
            {exercise.precautions && exercise.precautions.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-200 mb-3 flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </span>
                  Precautions
                </h3>
                <ul className="space-y-2">
                  {exercise.precautions.map((precaution, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                      {precaution}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        {exercise.videoUrl && (
          <div className="border-t border-zinc-100 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-900/50">
            <a
              href={exercise.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 px-4 py-2.5 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Video Tutorial
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
