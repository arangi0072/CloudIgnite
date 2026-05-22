type PageHeaderProps = {
    title: string;
    description: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
    return (
        <div className="mb-12">
            <h1 className="font-headline text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">
                {title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        </div>
    );
}
