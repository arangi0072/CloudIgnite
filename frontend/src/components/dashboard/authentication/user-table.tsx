'use client'
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import GithubIcon from "@/components/icons/github";
import GoogleIcon from "@/components/icons/google";
import { Mail, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, users } from "@/app/dashboard/[projectId]/authentication/data";
import { formatDistanceToNow } from 'date-fns';
import UserDetailsDrawer from './user-details-drawer';
import { cn } from '@/lib/utils';

const providerIcons: { [key: string]: React.FC<any> } = {
    google: GoogleIcon,
    github: GithubIcon,
    email: Mail
};

const statusColors: { [key: string]: string } = {
    Active: 'bg-green-400/20 text-green-300',
    Invited: 'bg-yellow-400/20 text-yellow-300',
    Suspended: 'bg-red-400/20 text-red-300',
};

export default function UserTable() {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleRowClick = (user: User) => {
        setSelectedUser(user);
        setIsDrawerOpen(true);
    }
  return (
    <>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>User ID</TableHead>
          <TableHead>Providers</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Last Login</TableHead>
          <TableHead>Status</TableHead>
          <TableHead><span className="sr-only">Actions</span></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id} onClick={() => handleRowClick(user)} className="cursor-pointer">
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-foreground">{user.name}</div>
                  <div className="text-sm text-muted-foreground">{user.email}</div>
                </div>
              </div>
            </TableCell>
            <TableCell className="font-mono text-sm text-muted-foreground">{user.id}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {user.providers.map(p => {
                    const Icon = providerIcons[p];
                    return Icon ? <Icon key={p} className="h-4 w-4 text-muted-foreground" title={p} /> : <span key={p} className="text-xs font-mono">{p}</span>
                })}
              </div>
            </TableCell>
            <TableCell className="text-muted-foreground">{formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}</TableCell>
            <TableCell className="text-muted-foreground">{formatDistanceToNow(new Date(user.lastLogin), { addSuffix: true })}</TableCell>
            <TableCell>
                <Badge variant="outline" className={cn(statusColors[user.status], "border-none")}>
                    {user.status}
                </Badge>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleRowClick(user)}>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Suspend User</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete User</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <UserDetailsDrawer user={selectedUser} open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </>
  );
}
