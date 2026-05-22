import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, Circle, Clock, FileText } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'System Status - CloudIgnite',
  description: 'Real-time status of CloudIgnite services.',
};

type ServiceStatus = "Operational" | "Degraded" | "Outage";

const services: { name: string; status: ServiceStatus; uptime: number }[] = [
  { name: "Authentication", status: "Operational", uptime: 99.998 },
  { name: "SMTP", status: "Operational", uptime: 99.999 },
  { name: "Storage", status: "Operational", uptime: 99.997 },
  { name: "Serverless", status: "Operational", uptime: 99.999 },
];

const incidents = [
  {
    date: "June 10, 2024",
    title: "Minor API Latency",
    status: "Resolved",
    updates: [
      {
        time: "14:30 UTC",
        description:
          "The issue has been fully resolved. All systems are back to normal performance. We apologize for any inconvenience caused.",
      },
      {
        time: "14:15 UTC",
        description:
          "A fix has been implemented and we are observing the results. API response times are returning to normal.",
      },
      {
        time: "14:00 UTC",
        description:
          "We are investigating reports of minor latency affecting our primary API endpoints. Root cause is being determined.",
      },
    ],
  },
  {
    date: "May 28, 2024",
    title: "Scheduled Maintenance: Database Upgrade",
    status: "Completed",
    updates: [
        {
          time: "04:00 UTC",
          description: "Scheduled maintenance is now complete. All systems are operating normally.",
        },
        {
          time: "02:00 UTC",
          description: "Maintenance is underway. Some services may experience brief interruptions.",
        },
      ],
  },
];

const StatusIndicator = ({ status }: { status: ServiceStatus }) => {
  const statusConfig = {
    Operational: {
      color: "text-green-400",
      text: "Operational",
    },
    Degraded: {
      color: "text-yellow-400",
      text: "Degraded Performance",
    },
    Outage: {
      color: "text-red-400",
      text: "Major Outage",
    },
  };

  return (
    <span className={`flex items-center gap-2 ${statusConfig[status].color}`}>
      <Circle className="h-3 w-3 fill-current" />
      <span className="text-sm font-medium">{statusConfig[status].text}</span>
    </span>
  );
};


export default function StatusPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto max-w-4xl px-4 py-16 sm:py-24">
        <div className="space-y-12">
          <Card className="overflow-hidden border-green-400/20 bg-transparent shadow-[0_0_50px_-10px_hsl(var(--primary)/0.1)]">
            <CardContent className="flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:text-left">
                <CheckCircle2 className="h-12 w-12 text-green-400" />
                <div>
                    <h1 className="font-headline text-2xl font-bold text-foreground">
                        All Systems Operational
                    </h1>
                    <p className="text-muted-foreground">
                        All CloudIgnite services are currently operating normally.
                    </p>
                </div>
            </CardContent>
          </Card>

          <section>
            <h2 className="mb-4 font-headline text-xl font-bold">
              Current Uptime
            </h2>
            <Card>
              <CardContent className="divide-y divide-border p-0">
                {services.map((service) => (
                  <div
                    key={service.name}
                    className="flex items-center justify-between p-4"
                  >
                    <span className="font-medium text-foreground">{service.name}</span>
                    <div className="flex items-center gap-6">
                        <span className="text-sm text-muted-foreground">{service.uptime.toFixed(3)}%</span>
                        <StatusIndicator status={service.status} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="mb-4 font-headline text-xl font-bold">
                Incident History
            </h2>
            <Card>
                <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                        {incidents.map((incident) => (
                            <AccordionItem value={incident.title} key={incident.title}>
                                <AccordionTrigger>
                                    <div className="flex w-full items-center justify-between pr-4">
                                        <div>
                                            <p className="font-medium text-foreground">{incident.title}</p>
                                            <p className="text-sm text-muted-foreground">{incident.date}</p>
                                        </div>
                                        <Badge variant={incident.status === 'Resolved' || incident.status === 'Completed' ? 'secondary' : 'destructive'}
                                            className={incident.status === 'Resolved' || incident.status === 'Completed' ? "bg-green-400/10 text-green-300 border-green-400/20" : ""}
                                        >
                                            {incident.status}
                                        </Badge>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="prose prose-sm max-w-none space-y-4 pt-2">
                                        {incident.updates.map(update => (
                                            <div key={update.time} className="relative pl-6">
                                                <div className="absolute left-0 top-1.5 h-full w-px bg-border"></div>
                                                <Circle className="absolute left-[-4.5px] top-1.5 h-2 w-2 fill-muted stroke-muted" />
                                                <p className="font-mono text-xs text-muted-foreground">{update.time}</p>
                                                <p className="text-muted-foreground">{update.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
          </section>

          <section>
            <Card className="bg-secondary/30">
                <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <FileText className="h-6 w-6 text-primary" />
                    <div>
                        <CardTitle className="text-lg">Subscribe to Updates</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Get email notifications whenever CloudIgnite creates or updates an incident.
                        </p>
                    </div>
                </CardHeader>
              <CardContent>
                <form className="flex gap-2">
                  <Input type="email" placeholder="you@example.com" className="bg-input" />
                  <Button type="submit">Subscribe</Button>
                </form>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
