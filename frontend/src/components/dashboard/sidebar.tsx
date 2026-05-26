
'use client';
import {
  LayoutDashboard,
  ShieldCheck,
  Mail,
  Database,
  Cpu,
  ScrollText,
  LineChart,
  PieChart,
  KeyRound,
  Users,
  Settings,
  ChevronDown,
  PlusCircle,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { projects } from '@/app/dashboard/projects-data';

const coreInfrastructure = [
  { name: 'Authentication', href: '/authentication', icon: ShieldCheck },
  { name: 'SMTP', href: '/smtp', icon: Mail },
  { name: 'Storage', href: '/storage', icon: Database },
  { name: 'Serverless Functions', href: '/functions', icon: Cpu },
];

const observability = [
  { name: 'Logs', href: '/logs', icon: ScrollText },
  { name: 'Metrics', href: '/metrics', icon: LineChart },
  { name: 'Usage', href: '/usage', icon: PieChart },
];

const access = [
  { name: 'API Keys', href: '/keys', icon: KeyRound },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function DashboardSidebar({ projectId }: { projectId?: string }) {
  const pathname = usePathname();
  const baseProjectUrl = projectId ? `/dashboard/${projectId}` : '';

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r bg-secondary/30 lg:flex">
      <div className="flex h-16 items-center border-b px-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between hover:bg-card/50"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
                  {projectId ? projectId.charAt(0).toUpperCase() : 'P'}
                </div>
                <span className="truncate font-medium">
                  {projectId ? projectId.slice(0, 8) : 'Project'}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Projects</DropdownMenuLabel>
              {projects.map((p) => (
                <Link href={`/dashboard/${p.name}`} key={p.name}>
                  <DropdownMenuItem>
                    <span>{p.name}</span>
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>Create Project</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav className="flex-1 space-y-4 overflow-auto p-4">
        <Link
          href="/dashboard"
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-primary',
            pathname === '/dashboard' && 'bg-primary/10 text-primary'
          )}
        >
          <LayoutDashboard className="h-4 w-4" />
          Projects
        </Link>
        {projectId && (
          <>
            <Link
              href={baseProjectUrl}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-primary',
                pathname === baseProjectUrl && 'bg-primary/10 text-primary'
              )}
            >
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </Link>

            <Collapsible defaultOpen>
              <CollapsibleTrigger className="w-full text-left">
                <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                  Core Infrastructure
                </h2>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1">
                {coreInfrastructure.map((item) => (
                  <Link
                    key={item.name}
                    href={`${baseProjectUrl}${item.href}`}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-primary',
                      pathname.startsWith(`${baseProjectUrl}${item.href}`) &&
                      'bg-primary/10 text-primary'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>

            <Collapsible defaultOpen>
              <CollapsibleTrigger className="w-full text-left">
                <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                  Observability
                </h2>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1">
                {observability.map((item) => (
                  <Link
                    key={item.name}
                    href={`${baseProjectUrl}${item.href}`}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-primary',
                      pathname.startsWith(`${baseProjectUrl}${item.href}`) &&
                      'bg-primary/10 text-primary'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>

            <Collapsible defaultOpen>
              <CollapsibleTrigger className="w-full text-left">
                <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                  Access
                </h2>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1">
                {access.map((item) => (
                  <Link
                    key={item.name}
                    href={`${baseProjectUrl}${item.href}`}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-primary',
                      pathname.startsWith(`${baseProjectUrl}${item.href}`) &&
                      'bg-primary/10 text-primary'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </>
        )}
      </nav>
    </aside>
  );
}
