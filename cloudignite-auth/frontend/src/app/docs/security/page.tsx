import PageHeader from "@/components/docs/page-header";
import {
  ShieldCheck,
  Lock,
  UserCheck,
  Ban,
  Activity,
  FileBadge,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const securityFeatures = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Infrastructure Security",
    description:
      "Our platform is built on world-class infrastructure, with multiple layers of defense to protect against network-level threats.",
  },
  {
    icon: <Lock className="h-8 w-8 text-primary" />,
    title: "Data Encryption",
    description:
      "All data is encrypted in transit using TLS 1.2+ and at rest with AES-256, ensuring your information remains confidential.",
  },
  {
    icon: <UserCheck className="h-8 w-8 text-primary" />,
    title: "Access Controls",
    description:
      "Fine-grained access control, audit logs, and multi-factor authentication are standard to prevent unauthorized account access.",
  },
  {
    icon: <Ban className="h-8 w-8 text-primary" />,
    title: "Abuse Prevention",
    description:
      "We employ automated systems to monitor for and mitigate abuse, protecting platform integrity and your application's reputation.",
  },
  {
    icon: <Activity className="h-8 w-8 text-primary" />,
    title: "Continuous Monitoring",
    description:
      "Our systems are monitored 24/7 for suspicious activity and potential threats, with an on-call engineering team ready to respond.",
  },
  {
    icon: <FileBadge className="h-8 w-8 text-primary" />,
    title: "Compliance-Ready",
    description:
      "Designed to help you meet your compliance obligations, with an architecture that supports standards like SOC 2 and GDPR.",
  },
];

export default function SecurityDocsPage() {
  return (
    <div>
      <PageHeader
        title="Security at CloudIgnite"
        description="Security isn't an afterthought—it's built into the foundation of our platform. Here is an overview of our commitment to protecting your data."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {securityFeatures.map((feature) => (
          <Card
            key={feature.title}
            className="border-border/50 bg-secondary/30"
          >
            <CardHeader>
              <div className="mb-4">{feature.icon}</div>
              <CardTitle className="text-lg text-foreground">
                {feature.title}
              </CardTitle>
              <CardDescription className="pt-1">
                {feature.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <article className="prose mt-16 max-w-none">
        <h2 id="vulnerability-reporting">Report a Vulnerability</h2>
        <p>
          We take security very seriously. If you believe you have discovered a
          security vulnerability on the CloudIgnite platform, we encourage you
          to report it to us responsibly. Please email the details to{" "}
          <a href="mailto:security@cloudignite.dev">security@cloudignite.dev</a>.
          We appreciate your efforts in helping us keep our platform secure.
        </p>
      </article>
    </div>
  );
}
