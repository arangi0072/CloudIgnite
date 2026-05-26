import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { policies } from "@/app/dashboard/[projectId]/authentication/data";

export default function PoliciesTab() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {policies.map(policy => (
                <Card key={policy.title} className="border-border/50 bg-secondary/30 flex flex-col">
                    <CardHeader className="flex-grow">
                        <CardTitle className="text-lg">{policy.title}</CardTitle>
                        <CardDescription>{policy.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between items-center">
                        <Badge variant={policy.configured ? "outline" : "secondary"} className={policy.configured ? 'border-primary/50 text-primary' : ''}>
                            {policy.configured ? 'Configured' : 'Not Configured'}
                        </Badge>
                        <Button variant="secondary">Manage Policy</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
