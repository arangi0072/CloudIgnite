import { ShieldCheck, Mail, Cpu, Package } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

const activities = [
    { icon: <ShieldCheck className="h-4 w-4" />, text: "User signed up: user@example.com", time: "2m ago" },
    { icon: <Mail className="h-4 w-4" />, text: "Email delivered to 'welcome' audience", time: "5m ago" },
    { icon: <Cpu className="h-4 w-4" />, text: "Function 'api/hello' executed successfully", time: "10m ago" },
    { icon: <Package className="h-4 w-4" />, text: "File 'avatar.png' uploaded to 'public' bucket", time: "12m ago" },
    { icon: <ShieldCheck className="h-4 w-4" />, text: "User logged in: admin@cloudignite.com", time: "15m ago" },
];

export default function ActivityFeed() {
    return (
        <Card className="border-border/50 bg-card">
            <CardHeader>
                <CardTitle>Live Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {activities.map((activity, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                                {activity.icon}
                            </div>
                            <div className='flex-1'>
                                <p className="text-sm text-foreground">{activity.text}</p>
                                <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
