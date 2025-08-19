import Image from "next/image";
import { notFound } from "next/navigation";
import { posts } from "@/data/mock-data";
import { ShareButton } from "@/components/share-button";
import { Breadcrumbs } from "@/components/breadcrumbs";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return notFound();
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <div className="mb-6">
        <Breadcrumbs 
          items={[
            { label: "Blog", href: "/blog" },
            { label: post.title }
          ]} 
        />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">{post.title}</h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Image src={post.author.avatar} alt={post.author.name} width={24} height={24} className="rounded-full" />
            <span>{post.author.name}</span>
          </div>
          <span>•</span>
          <span>{post.readTime} min read</span>
          <span>•</span>
          <span>{post.publishedAt.toDateString()}</span>
          <ShareButton title={post.title} />
        </div>
      </div>
      <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
        <Image src={post.image} alt={post.title} fill className="object-cover" />
      </div>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p>{post.excerpt}</p>
      </div>
    </article>
  );
}


