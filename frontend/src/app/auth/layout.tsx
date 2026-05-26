import BrandPanel from '@/components/auth/brand-panel';
import MobileBrandHeader from '@/components/auth/mobile-brand-header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CloudIgnite - Authentication',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full">
      <div className="auth-layout-bg" />
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <BrandPanel />
        <main className="flex flex-col items-center justify-center p-4 lg:p-8">
          <MobileBrandHeader />
          {children}
        </main>
      </div>
    </div>
  );
}
