import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BeVirtual | Premium Virtual Office Infrastructure',
  description: 'Luxury virtual office rentals for GST registration and multi-state business expansion in India.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Inter+Tight:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-white">
        <div className="noise" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}