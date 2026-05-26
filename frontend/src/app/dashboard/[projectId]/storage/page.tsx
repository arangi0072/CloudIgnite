import PageHeader from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";

export default function StoragePage() {
    return (
        <div>
            <PageHeader
                title="Storage"
                description="Manage your S3-compatible object storage buckets."
            />
            <div className="mt-8 flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-border">
                <div className="text-center">
                    <h3 className="text-lg font-medium text-foreground">Storage Explorer Coming Soon</h3>
                    <p className="mt-1 text-sm text-muted-foreground">This is where you'll manage all your project's files.</p>
                    <Button className="mt-4">Create Bucket</Button>
                </div>
            </div>
        </div>
    )
}
