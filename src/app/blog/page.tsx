import { posts } from "@/data/mock-data";
import { BlogCard } from "@/components/blog-card";
import { Breadcrumbs } from "@/components/breadcrumbs";

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
      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((p) => (
          <BlogCard key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}


