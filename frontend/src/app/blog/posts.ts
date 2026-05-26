import { PlaceHolderImages } from '@/lib/placeholder-images';

export interface Post {
  slug: string;
  title: string;
  description: string;
  author: string;
  authorImage: string;
  date: string;
  category: 'Engineering' | 'Infrastructure' | 'Security' | 'Product Updates' | 'Scaling Stories';
  featured?: boolean;
  image: string;
  imageHint: string;
}

const getImage = (id: string) => {
    const img = PlaceHolderImages.find(p => p.id === id);
    if (!img) return { url: '', hint: '' };
    return { url: img.imageUrl, hint: img.imageHint };
}

export const posts: Post[] = [
  {
    slug: 'scaling-databases-horizontally',
    title: 'Scaling Our Databases Horizontally for a 10x Load Increase',
    description: 'A deep dive into the architectural changes we made to handle a massive surge in traffic, from choosing a sharding strategy to implementing zero-downtime migrations.',
    author: 'Elena Rodriguez',
    authorImage: getImage('author-1').url,
    date: '2024-06-15',
    category: 'Scaling Stories',
    featured: true,
    image: getImage('blog-featured').url,
    imageHint: getImage('blog-featured').hint,
  },
  {
    slug: 'zero-trust-security-model',
    title: 'Implementing a Zero-Trust Security Model for Our Internal APIs',
    description: 'Moving beyond the traditional perimeter model, we adopted a zero-trust architecture. This is how we did it, including service mesh, mTLS, and policy-as-code.',
    author: 'David Chen',
    authorImage: getImage('author-2').url,
    date: '2024-06-10',
    category: 'Security',
    image: getImage('blog-1').url,
    imageHint: getImage('blog-1').hint,
  },
  {
    slug: 'building-resilient-infrastructure',
    title: 'Building Resilient Infrastructure with Chaos Engineering',
    description: 'We intentionally inject failure into our systems to find weaknesses before they become outages. Learn about our chaos engineering framework and the lessons we\'ve learned.',
    author: 'Elena Rodriguez',
    authorImage: getImage('author-1').url,
    date: '2024-06-02',
    category: 'Infrastructure',
    image: getImage('blog-2').url,
    imageHint: getImage('blog-2').hint,
  },
  {
    slug: 'product-update-q2-2024',
    title: 'Product Update: Faster Builds, New Storage Regions, and More',
    description: 'This quarter, we shipped major improvements to our build pipeline performance, added three new regions for object storage, and released a brand new CLI.',
    author: 'David Chen',
    authorImage: getImage('author-2').url,
    date: '2024-05-28',
    category: 'Product Updates',
    image: getImage('blog-3').url,
    imageHint: getImage('blog-3').hint,
  },
  {
    slug: 'optimizing-rust-for-serverless',
    title: 'Optimizing Rust for performant Serverless Functions',
    description: 'A technical exploration of how we tune our Rust binaries for minimal cold start times and memory footprint in a serverless environment, including compilation flags and async runtimes.',
    author: 'Elena Rodriguez',
    authorImage: getImage('author-1').url,
    date: '2024-05-19',
    category: 'Engineering',
    image: getImage('blog-4').url,
    imageHint: getImage('blog-4').hint,
  },
];
