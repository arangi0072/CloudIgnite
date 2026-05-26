import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

/* ✅ Match backend type */
export type Project = {
    ID: string;
    Name: string;
    OwnerID: string;
    Region: string;
    CreatedAt: string;
};

export default function ProjectCard({ project }: { project: Project }) {

    const createdDate = new Date(project.CreatedAt).toLocaleDateString();
    console.log(project);
    console.log(project.ID);
    console.log(project.Name);
    console.log(project.OwnerID);
    console.log(project.Region);
    console.log(project.CreatedAt);

    return (
        <Link href={`/dashboard/${project.ID}`}>
            <Card className="group h-full overflow-hidden border-border/50 bg-card transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">

                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                    <div className="space-y-1">
                        <CardTitle className="font-medium text-foreground">
                            {project.Name}
                        </CardTitle>

                        <div className="flex items-center gap-2">
                            {/* Default environment until backend provides one */}
                            <span className="inline-block rounded-full bg-green-400/20 px-2 py-0.5 text-xs text-green-300">
                                production
                            </span>

                            <span className="text-xs text-muted-foreground">
                                {project.Region}
                            </span>
                        </div>
                    </div>

                    <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </CardHeader>

                <CardContent className="flex items-end justify-between pt-2">

                    {/* Keep layout spacing intact */}
                    <div className="flex items-center gap-2 text-muted-foreground" />

                    <div className="text-xs text-muted-foreground">
                        Created {createdDate}
                    </div>

                </CardContent>
            </Card>
        </Link>
    );
}
