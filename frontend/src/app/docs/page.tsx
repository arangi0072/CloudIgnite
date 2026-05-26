import { Search, KeyRound, Mail, Package, Cpu, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PageHeader from "@/components/docs/page-header";

const quickstartCards = [
  {
    icon: <KeyRound className="h-6 w-6 text-primary" />,
    title: "Authentication",
    description: "Add secure login in minutes.",
    href: "/docs/authentication",
  },
  {
    icon: <Mail className="h-6 w-6 text-primary" />,
    title: "SMTP",
    description: "Send reliable email from your domain.",
    href: "/docs/smtp",
  },
  {
    icon: <Package className="h-6 w-6 text-primary" />,
    title: "Storage",
    description: "Store and serve files globally.",
    href: "/docs/storage",
  },
  {
    icon: <Cpu className="h-6 w-6 text-primary" />,
    title: "Serverless",
    description: "Deploy backend logic instantly.",
    href: "/docs/serverless",
  },
];

export default function DocsHomePage() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Documentation"
        description="Everything you need to build on CloudIgnite."
      />

      <div className="relative mb-12">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search all documentation..."
          className="h-12 w-full rounded-xl border-2 border-transparent bg-secondary/50 pl-10 text-base focus:border-primary"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {quickstartCards.map((card) => (
          <Link href={card.href} key={card.title} className="group">
            <Card className="h-full transition-all duration-200 group-hover:border-primary/60 group-hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.2)]">
              <CardHeader className="flex-row items-center gap-4">
                {card.icon}
                <div>
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </div>
                <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
