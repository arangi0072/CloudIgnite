'use client';

import { useState, useEffect } from 'react';
import PageHeader from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Plus, LayoutGrid, List } from 'lucide-react';
import ProjectCard from '@/components/dashboard/project-card';
import CreateProjectModal from '@/components/dashboard/create-project-modal';
import ProjectsEmptyState from '@/components/dashboard/projects-empty-state';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from 'next/link';

/* ✅ Strong typing (VERY recommended) */
type Project = {
    ID: string;
    Name: string;
    OwnerID: string;
    Region: string;
    CreatedAt: string;
};

export default function DashboardProjectsPage() {

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /* ✅ Fetch Projects */
    useEffect(() => {

        const fetchProjects = async () => {
            try {

                const token = localStorage.getItem("token");

                if (!token) {
                    setError("Authentication token not found.");
                    setLoading(false);
                    return;
                }

                const res = await fetch("https://api.cloudignite.in/v1/projects", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch projects");
                }

                const data = await res.json();

                // Supports both {projects: []} OR []
                setProjects(data.projects || data);

            } catch (err: any) {
                console.error("Projects fetch error:", err);
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();

    }, []);

    const hasProjects = projects.length > 0;

    /* ✅ Loading State */
    if (loading) {
        return (
            <div className="flex justify-center py-20 text-muted-foreground">
                Loading projects...
            </div>
        );
    }

    /* ✅ Error State */
    if (error) {
        return (
            <div className="flex justify-center py-20 text-red-400">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <PageHeader
                title="Projects"
                description="Manage infrastructure across all your applications."
                action={{
                    label: "Create Project",
                    onClick: () => setIsModalOpen(true),
                    icon: <Plus className="mr-2 h-4 w-4" />
                }}
            />

            {hasProjects ? (
                <>
                    <div className="flex items-center justify-end gap-2">
                        <Button
                            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                            size="icon"
                            onClick={() => setViewMode('grid')}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </Button>

                        <Button
                            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                            size="icon"
                            onClick={() => setViewMode('list')}
                        >
                            <List className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* ✅ GRID VIEW */}
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {projects.map((p) => (
                                <ProjectCard key={p.ID} project={p} />
                            ))}
                        </div>
                    ) : (

                        /* ✅ LIST VIEW */
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Project</TableHead>
                                    <TableHead>Region</TableHead>
                                    <TableHead>Environment</TableHead>
                                    <TableHead>Services</TableHead>
                                    <TableHead>Created</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {projects.map((p) => (
                                    <TableRow key={p.ID}>
                                        <TableCell>
                                            <Link
                                                href={`/dashboard/${p.ID}`}
                                                className="font-medium text-primary hover:underline"
                                            >
                                                {p.Name}
                                            </Link>
                                        </TableCell>

                                        <TableCell>{p.Region}</TableCell>

                                        <TableCell>
                                            <span className="inline-block rounded-full bg-green-400/20 px-2 py-0.5 text-xs text-green-300">
                                                production
                                            </span>
                                        </TableCell>

                                        <TableCell>-</TableCell>

                                        <TableCell>
                                            {new Date(p.CreatedAt).toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </>
            ) : (
                <ProjectsEmptyState onCreate={() => setIsModalOpen(true)} />
            )}

            <CreateProjectModal open={isModalOpen} onOpenChange={setIsModalOpen} />
        </div>
    );
}
