import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { webhooks } from "@/app/dashboard/[projectId]/authentication/data";
import { MoreHorizontal, Globe } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import CodeBlock from "@/components/code-block";

const examplePayload = `{
  "event": "user.created",
  "data": {
    "id": "usr_1a2b3c4d5e6f",
    "email": "elena@example.com",
    "created_at": "2024-07-10T10:00:00Z"
  }
}`;

export default function WebhooksTab() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                 <div className="flex justify-end mb-4">
                    <Button>Add Webhook</Button>
                 </div>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Endpoint</TableHead>
                            <TableHead>Events</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {webhooks.map(webhook => (
                            <TableRow key={webhook.id}>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Globe className="h-4 w-4 text-muted-foreground"/>
                                        <span className="font-mono text-sm text-foreground">{webhook.url}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {webhook.events.map(event => (
                                            <Badge key={event} variant="secondary" className="font-mono text-xs">{event}</Badge>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={webhook.status === 'Active' ? 'text-green-300 border-green-400/20 bg-green-400/10' : 'text-red-400 border-red-400/20 bg-red-400/10'}>
                                        {webhook.status}
                                    </Badge>
                                </TableCell>
                                 <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>View Deliveries</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div>
                <h3 className="font-semibold text-foreground mb-2">Example Payload</h3>
                <p className="text-sm text-muted-foreground mb-4">This is an example of the payload your endpoint will receive.</p>
                <CodeBlock code={examplePayload} language="json" />
            </div>
        </div>
    )
}
