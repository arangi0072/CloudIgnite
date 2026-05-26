import { posts, Post } from './posts';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

function FeaturedPost({ post }: { post: Post }) {
  return (
    <Card className="overflow-hidden border-0 bg-transparent shadow-none">
        <CardContent className="p-0">
            <Link href={`/blog/${post.slug}`} className="group grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
                <div className="overflow-hidden rounded-2xl">
                    <Image
                    src={post.image}
                    alt={post.title}
                    width={1200}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={post.imageHint}
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <Badge variant="outline" className="mb-4 w-fit border-primary/30 text-primary">
                    {post.category}
                    </Badge>
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {post.title}
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">{post.description}</p>
                    <div className="mt-6 flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src={post.authorImage} alt={post.author} />
                            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium text-foreground">{post.author}</p>
                            <p className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </CardContent>
    </Card>
  );
}

function PostCard({ post }: { post: Post }) {
    return (
        <Card className="h-full overflow-hidden border-border/50 bg-secondary/30 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
            <CardContent className="p-0">
                <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="overflow-hidden">
                        <Image
                        src={post.image}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={post.imageHint}
                        />
                    </div>
                    <div className="p-6">
                        <Badge variant="secondary" className="mb-3">{post.category}</Badge>
                        <h3 className="font-headline text-xl font-bold text-foreground">{post.title}</h3>
                        <p className="mt-3 text-muted-foreground line-clamp-2">{post.description}</p>
                        <div className="mt-4 flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={post.authorImage} alt={post.author} />
                                <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium text-foreground">{post.author}</p>
                                <p className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </CardContent>
        </Card>
    )
}

export default function BlogPage() {
  const featuredPost = posts.find(p => p.featured);
  const otherPosts = posts.filter(p => !p.featured);

  return (
    <div className="space-y-16">
      {featuredPost && <FeaturedPost post={featuredPost} />}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {otherPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
