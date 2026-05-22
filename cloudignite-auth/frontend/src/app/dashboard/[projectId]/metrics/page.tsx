import PageHeader from "@/components/dashboard/page-header";

export default function MetricsPage() {
    return (
        <div>
            <PageHeader
                title="Metrics"
                description="Analyze performance metrics and infrastructure health."
            />
            <div className="mt-8 flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-border">
                <div className="text-center">
                    <h3 className="text-lg font-medium text-foreground">Metrics Dashboard Coming Soon</h3>
                    <p className="mt-1 text-sm text-muted-foreground">This is where you'll visualize your project's performance.</p>
                </div>
            </div>
        </div>
    )
}
