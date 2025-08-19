import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { BlogPost } from "@/types";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="relative aspect-video">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          </div>
        </Link>
        <div className="p-4 space-y-1">
          <Link href={`/blog/${post.slug}`} className="font-medium line-clamp-1">
            {post.title}
          </Link>
          <p className="text-sm text-muted-foreground">{post.readTime} min read</p>
        </div>
      </CardContent>
    </Card>
  );
}