import PageHeader from "@/components/dashboard/page-header";

export default function UsagePage() {
    return (
        <div>
            <PageHeader
                title="Usage"
                description="Monitor your resource consumption and billing."
            />
            <div className="mt-8 flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-border">
                <div className="text-center">
                    <h3 className="text-lg font-medium text-foreground">Usage Dashboard Coming Soon</h3>
                    <p className="mt-1 text-sm text-muted-foreground">This is where you'll track your project's usage and costs.</p>
                </div>
            </div>
        </div>
    )
}
