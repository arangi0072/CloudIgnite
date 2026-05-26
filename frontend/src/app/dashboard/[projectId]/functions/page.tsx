import PageHeader from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";

export default function FunctionsPage() {
    return (
        <div>
            <PageHeader
                title="Serverless Functions"
                description="Deploy and manage your backend logic without servers."
            />
            <div className="mt-8 flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-border">
                <div className="text-center">
                    <h3 className="text-lg font-medium text-foreground">Functions Dashboard Coming Soon</h3>
                    <p className="mt-1 text-sm text-muted-foreground">This is where you'll manage your serverless functions.</p>
                    <Button className="mt-4">Deploy Function</Button>
                </div>
            </div>
        </div>
    )
}
