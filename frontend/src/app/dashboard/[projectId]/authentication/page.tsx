import PageHeader from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Settings, User, BarChart, Shield, Lock, ExternalLink, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import AuthStatCard from "@/components/dashboard/authentication/auth-stat-card";
import UserTable from "@/components/dashboard/authentication/user-table";
import ProvidersTab from "@/components/dashboard/authentication/providers-tab";
import PoliciesTab from "@/components/dashboard/authentication/policies-tab";
import SessionsTab from "@/components/dashboard/authentication/sessions-tab";
import WebhooksTab from "@/components/dashboard/authentication/webhooks-tab";

// Static mock data for charts to avoid hydration errors
const loginData = [{"day":0,"value":10},{"day":1,"value":15},{"day":2,"value":22},{"day":3,"value":28},{"day":4,"value":35},{"day":5,"value":40},{"day":6,"value":42},{"day":7,"value":50},{"day":8,"value":55},{"day":9,"value":60},{"day":10,"value":68},{"day":11,"value":75},{"day":12,"value":80},{"day":13,"value":82},{"day":14,"value":90},{"day":15,"value":95},{"day":16,"value":100},{"day":17,"value":102},{"day":18,"value":110},{"day":19,"value":115},{"day":20,"value":120},{"day":21,"value":122},{"day":22,"value":130},{"day":23,"value":135},{"day":24,"value":140},{"day":25,"value":148},{"day":26,"value":155},{"day":27,"value":160},{"day":28,"value":162},{"day":29,"value":170}];
const sessionData = [{"day":0,"value":12},{"day":1,"value":18},{"day":2,"value":25},{"day":3,"value":30},{"day":4,"value":32},{"day":5,"value":38},{"day":6,"value":45},{"day":7,"value":52},{"day":8,"value":58},{"day":9,"value":65},{"day":10,"value":70},{"day":11,"value":72},{"day":12,"value":78},{"day":13,"value":85},{"day":14,"value":92},{"day":15,"value":98},{"day":16,"value":105},{"day":17,"value":110},{"day":18,"value":112},{"day":19,"value":118},{"day":20,"value":125},{"day":21,"value":130},{"day":22,"value":132},{"day":23,"value":138},{"day":24,"value":145},{"day":25,"value":150},{"day":26,"value":152},{"day":27,"value":158},{"day":28,"value":165},{"day":29,"value":172}];
const successRateData = [{"day":0,"value":99.1},{"day":1,"value":98.5},{"day":2,"value":99.8},{"day":3,"value":99.2},{"day":4,"value":98.8},{"day":5,"value":99.5},{"day":6,"value":99.0},{"day":7,"value":98.2},{"day":8,"value":99.3},{"day":9,"value":98.7},{"day":10,"value":99.6},{"day":11,"value":98.4},{"day":12,"value":99.9},{"day":13,"value":98.1},{"day":14,"value":99.4},{"day":15,"value":98.9},{"day":16,"value":99.7},{"day":17,"value":98.6},{"day":18,"value":99.0},{"day":19,"value":98.3},{"day":20,"value":99.2},{"day":21,"value":98.8},{"day":22,"value":99.5},{"day":23,"value":98.0},{"day":24,"value":99.1},{"day":25,"value":98.7},{"day":26,"value":99.4},{"day":27,"value":98.5},{"day":28,"value":99.3},{"day":29,"value":98.6}];
const failedAttemptsData = [{"day":0,"value":2},{"day":1,"value":1},{"day":2,"value":3},{"day":3,"value":0},{"day":4,"value":2},{"day":5,"value":1},{"day":6,"value":4},{"day":7,"value":2},{"day":8,"value":1},{"day":9,"value":0},{"day":10,"value":3},{"day":11,"value":2},{"day":12,"value":1},{"day":13,"value":5},{"day":14,"value":2},{"day":15,"value":1},{"day":16,"value":0},{"day":17,"value":2},{"day":18,"value":3},{"day":19,"value":1},{"day":20,"value":2},{"day":21,"value":4},{"day":22,"value":1},{"day":23,"value":0},{"day":24,"value":2},{"day":25,"value":3},{"day":26,"value":1},{"day":27,"value":2},{"day":28,"value":0},{"day":29,"value":1}];


export default function AuthenticationPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-start justify-between">
                <PageHeader
                    title="Authentication"
                    description="Securely manage users, sessions, and access."
                />
                <div className="flex items-center gap-2">
                     <Button variant="outline">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Docs
                    </Button>
                    <Button>
                        Create User
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <AuthStatCard title="Total Users" value="1,258" trend="+20.1% from last month" icon={<User className="h-5 w-5" />} data={loginData} dataKey="value" color="hsl(var(--primary))" />
                <AuthStatCard title="Active Sessions" value="892" trend="+150 today" icon={<BarChart className="h-5 w-5" />} data={sessionData} dataKey="value" color="hsl(var(--accent))" />
                <AuthStatCard title="Login Success Rate" value="99.8%" trend="Last 24 hours" icon={<Shield className="h-5 w-5" />} data={successRateData} dataKey="value" color="hsl(var(--primary))" />
                <AuthStatCard title="Failed Attempts" value="12" trend="Last 24 hours" icon={<Lock className="h-5 w-5" />} data={failedAttemptsData} dataKey="value" color="hsl(var(--destructive))" />
            </div>

            <Tabs defaultValue="users" className="w-full">
                <div className="flex items-center justify-between border-b border-border">
                    <TabsList>
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="providers">Providers</TabsTrigger>
                        <TabsTrigger value="policies">Policies</TabsTrigger>
                        <TabsTrigger value="sessions">Sessions</TabsTrigger>
                        <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
                    </TabsList>
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search users by email or ID..." className="bg-background pl-8" />
                    </div>
                </div>
                <TabsContent value="users" className="mt-6">
                    <UserTable />
                </TabsContent>
                <TabsContent value="providers" className="mt-6">
                    <ProvidersTab />
                </TabsContent>
                <TabsContent value="policies" className="mt-6">
                    <PoliciesTab />
                </TabsContent>
                <TabsContent value="sessions" className="mt-6">
                    <SessionsTab />
                </TabsContent>
                <TabsContent value="webhooks" className="mt-6">
                    <WebhooksTab />
                </TabsContent>
            </Tabs>
        </div>
    )
}
