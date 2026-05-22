import Logo from '@/components/logo';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const trustIndicators = [
  'Enterprise-grade security',
  'Global infrastructure',
  '99.99% uptime',
];

export default function BrandPanel() {
  return (
    <aside className="relative hidden flex-col items-start justify-between bg-black/10 p-8 lg:flex">
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[-1] bg-gradient-to-b from-primary/10 to-transparent"
      />
      
      <Link href="/">
        <Logo />
      </Link>
      
      <div className="max-w-md space-y-4">
        <h1 className="font-headline text-5xl font-bold text-white">
          Build Without Limits.
        </h1>
        <p className="text-lg text-muted-foreground">
          Infrastructure designed for developers who ship fast.
        </p>
      </div>
      
      <ul className="space-y-3">
        {trustIndicators.map((text) => (
          <li key={text} className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-400" />
            <span className="text-sm text-muted-foreground">{text}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
