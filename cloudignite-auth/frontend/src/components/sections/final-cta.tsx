import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FinalCta() {
  return (
    <section className="relative w-full overflow-hidden py-24 sm:py-32 lg:py-40">
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[-1] "
      >
        <div className="absolute inset-0 bg-background"></div>
        <div className="absolute inset-0 bg-[radial-gradient(40%_100%_at_50%_0%,hsl(var(--accent)/0.1)_0%,transparent_100%)]"></div>
      </div>
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Stop Assembling Infrastructure.
          <br />
          <span className="gradient-text bg-gradient-to-r from-primary via-accent to-primary">
            Start Building Products.
          </span>
        </h2>
        <Button size="lg" className="mt-10" asChild>
          <Link href="#">Create Your Project</Link>
        </Button>
      </div>
    </section>
  );
}
