import PageHeader from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";

export default function TeamPage() {
    return (
        <div>
            <PageHeader
                title="Team"
                description="Manage team members and their roles."
            />
            <div className="mt-8 flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-border">
                <div className="text-center">
                    <h3 className="text-lg font-medium text-foreground">Team Management Coming Soon</h3>
                    <p className="mt-1 text-sm text-muted-foreground">This is where you'll invite and manage team members.</p>
                    <Button className="mt-4">Invite Member</Button>
                </div>
            </div>
        </div>
    )
}
