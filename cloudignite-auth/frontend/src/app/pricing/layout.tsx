import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - CloudIgnite',
  description: 'Simple, predictable pricing that scales with your application.',
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
