'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart } from "recharts";
import { cn } from "@/lib/utils";

type AuthStatCardProps = {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  data: any[];
  dataKey: string;
  color: string;
};

export default function AuthStatCard({ title, value, trend, icon, data, dataKey, color }: AuthStatCardProps) {

  const chartConfig = {
    [dataKey]: {
      color: color,
    },
  } satisfies ChartConfig;

  const trendColor = trend.startsWith('+') ? 'text-green-400' : 'text-muted-foreground';

  return (
    <Card className="flex flex-col border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-end pt-0">
        <div>
          <div className="text-2xl font-bold text-foreground">{value}</div>
          <p className={cn("text-xs", trendColor)}>{trend}</p>
        </div>
        <div className="h-16 w-full pt-4">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id={`fill-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={color} stopOpacity={0}/>
                    </linearGradient>
                </defs>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideIndicator hideLabel />}
              />
              <Area
                dataKey={dataKey}
                type="natural"
                fill={`url(#fill-${dataKey})`}
                stroke={color}
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
