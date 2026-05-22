import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function EmptyStateIllustration() {
    return (
        <svg width="240" height="160" viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-8">
            <rect x="20" y="30" width="200" height="100" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2"/>
            <path d="M20 50H220" stroke="hsl(var(--border))" strokeWidth="1.5" strokeDasharray="4 4"/>
            <rect x="35" y="65" width="60" height="10" rx="2" fill="hsl(var(--secondary))"/>
            <circle cx="110" cy="70" r="5" fill="hsl(var(--primary) / 0.5)"/>
            <circle cx="130" cy="70" r="5" fill="hsl(var(--primary) / 0.5)"/>
            <rect x="35" y="85" width="170" height="30" rx="4" fill="hsl(var(--secondary))"/>
            <path d="M45 95H105" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeLinecap="round"/>
            <path d="M45 105H85" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    )
}


export default function ProjectsEmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/20 py-24">
      <div className="text-center">
        <EmptyStateIllustration />
        <h2 className="font-headline text-2xl font-bold text-foreground">Launch Your First Project</h2>
        <p className="mt-2 text-muted-foreground">
            Authentication, email, storage, and compute — ready in seconds.
        </p>
        <Button className="mt-6" onClick={onCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Create Project
        </Button>
      </div>
    </div>
  );
}
