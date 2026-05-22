
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Arpit Rangi | Cloud Infrastructure & SaaS Founder',
  description: 'Portfolio of Arpit Rangi, a visionary SaaS founder and cloud infrastructure engineer. Founder of CloudIgnite.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}
