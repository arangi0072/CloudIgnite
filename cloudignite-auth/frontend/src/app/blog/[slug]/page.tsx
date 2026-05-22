import { posts, Post } from '../posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = posts.find((p) => p.slug === params.slug);

    if (!post) {
        return {
            title: 'Post Not Found'
        }
    }

    return {
        title: `${post.title} - CloudIgnite Blog`,
        description: post.description,
    };
}


export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="prose prose-lg mx-auto max-w-4xl">
        <Link href="/blog" className="flex items-center gap-2 text-primary no-underline hover:underline mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to all posts
        </Link>
      
      <Badge variant="outline" className="mb-4 text-primary">
        {post.category}
      </Badge>
      <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        {post.title}
      </h1>
      
      <div className="my-8 flex items-center gap-4">
        <Avatar>
            <AvatarImage src={post.authorImage} alt={post.author} />
            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
            <p className="font-medium text-foreground not-prose">{post.author}</p>
            <p className="text-sm text-muted-foreground not-prose">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>
      
      <div className="relative my-12 aspect-video overflow-hidden rounded-2xl">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          data-ai-hint={post.imageHint}
        />
      </div>

      <p className="lead">{post.description}</p>
      
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.</p>
      <h2>A Deeper Dive into the Architecture</h2>
      <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.</p>
      <blockquote>
        "The key to scalability is not just about handling more users, but about maintaining performance and reliability as you grow. It's a continuous process of refinement."
      </blockquote>
      <p>Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices.</p>
      <h2>Lessons Learned and Future Plans</h2>
      <p>Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim.</p>
    </article>
  );
}

export async function generateStaticParams() {
    return posts.map((post) => ({
      slug: post.slug,
    }));
}
