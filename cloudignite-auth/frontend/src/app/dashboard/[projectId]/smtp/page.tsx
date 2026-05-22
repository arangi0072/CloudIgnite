import PageHeader from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";

export default function SmtpPage() {
    return (
        <div>
            <PageHeader
                title="SMTP"
                description="Manage sending domains, reputation, and email templates."
            />
            <div className="mt-8 flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-border">
                <div className="text-center">
                    <h3 className="text-lg font-medium text-foreground">SMTP Dashboard Coming Soon</h3>
                    <p className="mt-1 text-sm text-muted-foreground">This is where you'll manage your email infrastructure.</p>
                    <Button className="mt-4">Add Sending Domain</Button>
                </div>
            </div>
        </div>
    )
}
