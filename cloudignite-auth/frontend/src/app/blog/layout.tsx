import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - CloudIgnite',
  description: 'Engineering, product, and scaling stories from the CloudIgnite team.',
};


const categories = [
    "Engineering",
    "Infrastructure",
    "Security",
    "Product Updates",
    "Scaling Stories",
  ];

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="py-12 text-center">
            <h1 className="font-headline text-5xl font-bold tracking-tighter">Engineering at CloudIgnite</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Deep dives into our technology, culture, and product.
            </p>
          </div>
          <div className="border-b border-border">
            <nav className="no-scrollbar -mb-px flex space-x-6 overflow-x-auto">
              <Button variant="ghost" asChild className="shrink-0 rounded-none border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-muted-foreground hover:border-gray-300 hover:text-foreground">
                <Link href="/blog">All Posts</Link>
              </Button>
              {categories.map((category) => (
                <Button key={category} variant="ghost" asChild className="shrink-0 rounded-none border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-muted-foreground hover:border-gray-300 hover:text-foreground">
                    <Link href="#">{category}</Link>
                </Button>
              ))}
            </nav>
          </div>
          <div className="py-16">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
