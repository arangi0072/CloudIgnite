import PageHeader from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";

export default function ApiKeysPage() {
    return (
        <div>
            <PageHeader
                title="API Keys"
                description="Manage API keys for programmatic access to your project."
            />
            <div className="mt-8 flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-border">
                <div className="text-center">
                    <h3 className="text-lg font-medium text-foreground">API Key Management Coming Soon</h3>
                    <p className="mt-1 text-sm text-muted-foreground">This is where you'll create and manage your API keys.</p>
                    <Button className="mt-4">Create Key</Button>
                </div>
            </div>
        </div>
    )
}
