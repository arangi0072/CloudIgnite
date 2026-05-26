
import ActivityFeed from '@/components/dashboard/activity-feed';
import PageHeader from '@/components/dashboard/page-header';
import StatCard from '@/components/dashboard/stat-card';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ShieldCheck, Mail, Package, Cpu, UserPlus, Globe, Database, Code } from 'lucide-react';

const quickActions = [
  { label: "Create User", icon: <UserPlus className="mr-2 h-4 w-4" /> },
  { label: "Verify Domain", icon: <Globe className="mr-2 h-4 w-4" /> },
  { label: "Create Bucket", icon: <Database className="mr-2 h-4 w-4" /> },
  { label: "Deploy Function", icon: <Code className="mr-2 h-4 w-4" /> },
]

export default function ProjectOverviewPage({ params }: { params: { projectId: string } }) {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Overview"
        description={`Mission control for your '${params.projectId}' project.`}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Users" value="1,204" trend="+20.1% from last month" icon={<ShieldCheck className="h-5 w-5" />} />
        <StatCard title="Emails Sent Today" value="8,432" trend="+12.5% today" icon={<Mail className="h-5 w-5" />} />
        <StatCard title="Storage" value="24.8 GB" trend="75% of quota" icon={<Package className="h-5 w-5" />} />
        <StatCard title="Function Invocations" value="1.2M" trend="~2k per minute" icon={<Cpu className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className='border-border/50 bg-card'>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {quickActions.map(action => (
                <Button key={action.label} variant="secondary">
                  {action.icon}
                  {action.label}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1 row-start-1 lg:row-start-auto">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
