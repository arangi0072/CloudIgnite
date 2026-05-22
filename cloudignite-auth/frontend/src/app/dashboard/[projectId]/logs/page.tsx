import PageHeader from "@/components/dashboard/page-header";

export default function LogsPage() {
    return (
        <div>
            <PageHeader
                title="Logs"
                description="Explore real-time logs from all your project's services."
            />
            <div className="mt-8 flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-border">
                <div className="text-center">
                    <h3 className="text-lg font-medium text-foreground">Log Explorer Coming Soon</h3>
                    <p className="mt-1 text-sm text-muted-foreground">This is where you'll stream and search logs.</p>
                </div>
            </div>
        </div>
    )
}
