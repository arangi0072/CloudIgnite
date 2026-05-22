import Logo from '@/components/logo';
import Link from 'next/link';

export default function MobileBrandHeader() {
  return (
    <div className="text-center lg:hidden mb-8">
      <Link href="/" className="inline-block">
        <Logo />
      </Link>
      <h1 className="font-headline text-3xl font-bold mt-4">
        Build Without Limits.
      </h1>
      <p className="mt-2 text-muted-foreground">
        Infrastructure designed for developers who ship fast.
      </p>
    </div>
  );
}
