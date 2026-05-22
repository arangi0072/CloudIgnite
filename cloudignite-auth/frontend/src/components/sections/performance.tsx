import AnimatedCounter from "@/components/animated-counter";

const stats = [
  { value: 99.99, suffix: "%", decimals: 2, label: "Uptime" },
  { value: 50, prefix: "<", suffix: "ms", label: "Latency" },
  { value: 100, suffix: "+", label: "Global Infrastructure" },
  { value: 1, suffix: "ms", label: "Instant Scaling" },
];

export default function Performance() {
  return (
    <section className="w-full py-20 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10"
              >
                <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,hsl(var(--primary)/0.1)_0%,transparent_100%)]"></div>
              </div>
              <h3 className="font-headline text-5xl font-bold tracking-tighter text-primary sm:text-6xl">
                <AnimatedCounter
                  endValue={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </h3>
              <p className="mt-2 text-lg text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
