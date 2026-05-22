import { Button } from "../ui/button";

type PageHeaderProps = {
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
        icon?: React.ReactNode;
    }
};

export default function PageHeader({ title, description, action }: PageHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground">
                    {title}
                </h1>
                <p className="mt-1 text-muted-foreground">{description}</p>
            </div>
            {action && (
                <Button onClick={action.onClick}>
                    {action.icon}
                    {action.label}
                </Button>
            )}
        </div>
    );
}
