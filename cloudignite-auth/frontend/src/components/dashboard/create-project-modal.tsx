'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ShieldCheck, Mail, Database, Cpu } from "lucide-react";
import { useState } from "react";

const regions = [
  { value: 'us-west-2', label: 'US West (Oregon)' },
  { value: 'us-east-1', label: 'US East (N. Virginia)' },
  { value: 'eu-central-1', label: 'EU (Frankfurt)' },
  { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)' },
];

const services = [
  { id: 'auth', label: 'Authentication', icon: <ShieldCheck className="h-5 w-5 text-primary" /> },
  { id: 'smtp', label: 'SMTP', icon: <Mail className="h-5 w-5 text-primary" /> },
  { id: 'storage', label: 'Storage', icon: <Database className="h-5 w-5 text-primary" /> },
  { id: 'serverless', label: 'Serverless', icon: <Cpu className="h-5 w-5 text-primary" /> },
];

export default function CreateProjectModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const [projectName, setProjectName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectName.trim()) return;

    try {
      setIsLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(`https://api.cloudignite.in/v1/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: projectName,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create project");
      }

      const data = await res.json();

      console.log("Project created:", data);

      onOpenChange(false);
      setProjectName("");

    } catch (err: any) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-xl">Create New Project</DialogTitle>
          <DialogDescription>
            Your project will be provisioned instantly. You can change these settings later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input id="project-name" placeholder="e.g., my-awesome-app" className="bg-input" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
            </div>
            {/* <div className="grid gap-2">
                <Label htmlFor="region">Region</Label>
                <Select defaultValue="us-west-2">
                    <SelectTrigger id="region" className="bg-input">
                        <SelectValue placeholder="Select a region" />
                    </SelectTrigger>
                    <SelectContent>
                        {regions.map(region => (
                            <SelectItem key={region.value} value={region.value}>{region.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label>Enable Services</Label>
                <p className="text-sm text-muted-foreground">You can enable additional services anytime.</p>
                <div className="mt-2 grid grid-cols-2 gap-4">
                    {services.map(service => (
                        <div key={service.id} className="flex items-center space-x-3 rounded-md border border-input bg-background p-3">
                            <Checkbox id={service.id} defaultChecked/>
                            <Label htmlFor={service.id} className="flex items-center gap-2 font-normal">
                                {service.icon} {service.label}
                            </Label>
                        </div>
                    ))}
                </div>
            </div> */}
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Launching..." : "Launch Project"}
            </Button>
          </DialogFooter>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Project will be ready in under 10 seconds.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
