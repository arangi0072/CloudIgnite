import PageHeader from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
    return (
        <div className="space-y-8">
            <PageHeader
                title="Project Settings"
                description="Manage your project's configuration and settings."
            />
            
            <Card className="border-destructive/50">
                <CardHeader>
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    <CardDescription>
                        These actions are irreversible. Please be certain before proceeding.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="transfer" className="font-bold">Transfer Ownership</Label>
                            <p className="text-sm text-muted-foreground">Transfer this project to another user or organization.</p>
                            <div className="flex gap-2 mt-2">
                                <Input id="transfer" placeholder="user@example.com" className="max-w-xs" />
                                <Button variant="outline">Transfer</Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center bg-destructive/10 border-t border-destructive/20 p-4 rounded-b-lg">
                    <div>
                        <p className="font-semibold text-destructive">Delete Project</p>
                        <p className="text-sm text-muted-foreground">This will permanently delete the project and all its data.</p>
                    </div>
                    <Button variant="destructive">Delete Project</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
