import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const metrics = [
  { value: "99.99%", label: "Uptime" },
  { value: "<40ms", label: "Edge Latency" },
  { value: "Global", label: "Deployment" },
  { value: "Auto", label: "Scaling" },
];

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 glow-bg"></div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 text-center">
        <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
          Infrastructure That Ships With You.
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
          Authentication, email, storage, and serverless compute — engineered
          for developers who move fast.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="#">
              Start Building <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
            <Link href="#">Read Docs</Link>
          </Button>
        </div>

        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 justify-center gap-y-8 gap-x-4 text-center md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <p className="font-headline text-2xl font-semibold sm:text-3xl">
                {metric.value}
              </p>
              <p className="text-sm text-muted-foreground sm:text-base">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
