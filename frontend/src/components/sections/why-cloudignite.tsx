import { User, Lock, Cpu, Package, Mail } from "lucide-react";
import { type ReactNode } from "react";

const flow: { icon: ReactNode; name: string }[] = [
  { icon: <User />, name: "User" },
  { icon: <Lock />, name: "Auth" },
  { icon: <Cpu />, name: "Function" },
  { icon: <Package />, name: "Storage" },
  { icon: <Mail />, name: "SMTP" },
  { icon: <User />, name: "User" },
];

export default function WhyCloudIgnite() {
  return (
    <section className="w-full py-20 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 text-center">
        <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Four Products. Infinite Possibilities.
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
          Most startups only need these four primitives to launch and scale.
          CloudIgnite provides the most critical building blocks so you can
          focus on what matters: your product.
        </p>

        <div className="mt-16 overflow-hidden">
          <div className="flex items-center justify-between">
            {flow.map((item, index) => (
              <>
                <div key={item.name + index} className="flex flex-col items-center gap-2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/50 bg-secondary text-primary">
                    {item.icon}
                  </div>
                  <span className="font-mono text-sm">{item.name}</span>
                </div>
                {index < flow.length - 1 && (
                  <svg
                    className="h-6 w-full flex-1 text-muted-foreground"
                    viewBox="0 0 100 6"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 3 L100 3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  </svg>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
