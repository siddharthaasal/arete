import { ProgramEditor } from "@/app/components/builder/ProgramEditor";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function BuilderPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-onyx text-onyx dark:text-marble font-sans pb-24">
      <header className="border-b border-storm/20 bg-white/80 dark:bg-onyx/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link 
            href="/" 
            className="p-2 -ml-2 text-storm hover:text-aegean dark:hover:text-gold transition-colors rounded-full hover:bg-marble dark:hover:bg-storm/10"
          >
            <ArrowLeftIcon className="size-5" />
          </Link>
          <h1 className="text-lg font-bold text-aegean dark:text-marble">
            Program Builder
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-8">
        <ProgramEditor />
      </main>
    </div>
  );
}
