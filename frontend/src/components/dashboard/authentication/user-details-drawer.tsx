'use client';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User } from "@/app/dashboard/[projectId]/authentication/data";
import { format } from 'date-fns';
import { cn } from "@/lib/utils";

const statusColors: { [key: string]: string } = {
    Active: 'bg-green-400/20 text-green-300',
    Invited: 'bg-yellow-400/20 text-yellow-300',
    Suspended: 'bg-red-400/20 text-red-300',
};


export default function UserDetailsDrawer({ user, open, onOpenChange }: { user: User | null, open: boolean, onOpenChange: (open: boolean) => void }) {
  if (!user) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[440px] sm:max-w-[540px]">
        <SheetHeader>
          <SheetTitle className="font-headline text-xl">User Details</SheetTitle>
          <SheetDescription>Manage user information and security settings.</SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-6">
            <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="text-lg font-bold text-foreground">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
            </div>
            <Separator />
            <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">User ID</span>
                    <span className="font-mono text-foreground">{user.id}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span><Badge variant="outline" className={cn("border-none", statusColors[user.status])}>{user.status}</Badge></span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Created</span>
                    <span className="text-foreground">{format(new Date(user.createdAt), "MMM d, yyyy 'at' h:mm a")}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Login</span>
                    <span className="text-foreground">{format(new Date(user.lastLogin), "MMM d, yyyy 'at' h:mm a")}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-muted-foreground">MFA Status</span>
                    <Badge variant="secondary">Disabled</Badge>
                </div>
            </div>
            <Separator />
             <div>
                <h4 className="font-medium text-foreground mb-2">Actions</h4>
                 <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">Reset Password</Button>
                    <Button variant="outline" className="w-full justify-start">Suspend User</Button>
                 </div>
             </div>
        </div>
        <SheetFooter>
            <Button variant="destructive" className="w-full">Delete User</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
