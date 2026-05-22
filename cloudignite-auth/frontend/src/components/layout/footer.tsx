import Link from "next/link";
import Logo from "@/components/logo";

const footerLinks = [
  { name: "Docs", href: "/docs" },
  { name: "API Reference", href: "/docs/api" },
  { name: "Status", href: "/status" },
  { name: "Security", href: "/docs/security" },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blog" },
  { name: "Careers", href: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/50">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-12 sm:flex-row">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <Logo />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CloudIgnite, Inc.
          </p>
        </div>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground sm:justify-end">
          {footerLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="transition-colors hover:text-foreground">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
