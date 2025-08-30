import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { HomeHero } from "@/components/home-hero";
import { ProductCard } from "@/components/product-card";
import { products, posts } from "@/data/mock-data";

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

export default function Home() {
  return (
    <div className="space-y-20">
      <HomeHero />

      <section className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Categories</h2>
          <Link href="/shop" className="text-sm text-muted-foreground hover:text-foreground">View all</Link>
        </div>
        <div className="flex overflow-x-scroll md:overflow-x-hidden md:grid md:grid-cols-2 gap-4 lg:grid-cols-4 pb-4">
          {[
            { name: "Men", slug: "men", image: "/product images/man.jpg" },
            { name: "Women", slug: "women", image: "/product images/woman.jpg" },
            { name: "Kids", slug: "kids", image: "/product images/kids.jpg" },
            { name: "Accessories", slug: "accessories", image: "/product images/accessories.jpg" }
          ].map((c) => (
            <Link href={`/category/${c.slug}`} key={c.name}>
              <Card className="overflow-hidden min-w-[200px] group cursor-pointer hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <Image src={c.image} alt={c.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <h3 className="text-white font-bold text-3xl drop-shadow-lg mb-2">
                          {c.name}
                        </h3>
                        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                          <span className="text-gray-800 font-medium text-sm">
                            Shop Now
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">New arrivals</h2>
          <Link href="/shop?sort=newest" className="text-sm text-muted-foreground hover:text-foreground">View all</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.filter(p => p.newArrival).slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: "Men's Collection", subtitle: "Discover timeless style", image: "/product images/man banner.jpg" },
            { title: "Women's Collection", subtitle: "Embrace your elegance", image: "/product images/woman banner.jpg" }
          ].map((item, i) => (
            <Link href={`/category/${item.title.toLowerCase().split("'")[0]}`} key={i}>
              <div className="group relative overflow-hidden rounded-2xl bg-muted cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
                <div className="relative aspect-[4/3]">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="space-y-2">
                    <h3 className="text-white text-2xl font-bold drop-shadow-lg transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-white/90 text-sm font-medium drop-shadow-md  transition-colors duration-300">
                      {item.subtitle}
                    </p>
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-white/80 text-sm font-medium  transition-colors duration-300">
                        Shop Now
                      </span>
                      <svg 
                        className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-all duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-xs font-medium">New Arrivals</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Clearance</h2>
          <Link href="/shop?clearance=1" className="text-sm text-muted-foreground hover:text-foreground">View all</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.filter(p => p.clearance).slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Latest posts</h2>
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">View all</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
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
      </section>
    </div>
  );
}
