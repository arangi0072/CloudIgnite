import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { providers } from "@/app/dashboard/[projectId]/authentication/data";
import GithubIcon from "@/components/icons/github";
import GoogleIcon from "@/components/icons/google";
import { Mail, Zap } from "lucide-react";

const providerIcons: { [key: string]: React.ComponentType<any> } = {
    email: Mail,
    google: GoogleIcon,
    github: GithubIcon,
    magic_link: Zap,
};

export default function ProvidersTab() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {providers.map(provider => {
                const Icon = providerIcons[provider.id];
                return (
                    <Card key={provider.id} className="border-border/50 bg-secondary/30">
                        <CardHeader className="flex flex-row items-center justify-between pb-4">
                            <div className="flex items-center gap-3">
                                {Icon && <Icon className="h-6 w-6 text-muted-foreground"/>}
                                <CardTitle className="text-lg">{provider.name}</CardTitle>
                            </div>
                            <Switch defaultChecked={provider.enabled} />
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Enable {provider.name} login for your users in seconds.
                            </CardDescription>
                            <Button variant="secondary" className="mt-4">Configure</Button>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}
