import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type StatCardProps = {
    title: string;
    value: string;
    trend: string;
    icon: React.ReactNode;
}

export default function StatCard({ title, value, trend, icon }: StatCardProps) {
    return (
        <Card className="relative overflow-hidden border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <div className="text-muted-foreground">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-foreground">{value}</div>
                <p className="flex items-center text-xs text-green-400">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    {trend}
                </p>
            </CardContent>
        </Card>
    )
}
