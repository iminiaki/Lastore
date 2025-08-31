import Image from "next/image";
import Link from "next/link";
import { posts } from "@/data/mock-data";
import { Breadcrumbs } from "@/components/breadcrumbs";

function formatDate(date: Date): string {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 14) return "1 week ago";
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 60) return "1 month ago";
  return `${Math.floor(diffDays / 30)} months ago`;
}

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 space-y-6">
      <div className="mb-6">
        <Breadcrumbs 
          items={[
            { label: "Blog" }
          ]} 
        />
      </div>
      <h1 className="text-2xl font-semibold">Blog</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.id} className="group">
            <div className="space-y-4">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>By {post.author.name}</span>
                  <div className="flex items-center gap-2">
                    <span>{post.readTime} min read</span>
                    <span>•</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


