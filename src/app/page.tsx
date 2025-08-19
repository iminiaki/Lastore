import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { HomeHero } from "@/components/home-hero";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/mock-data";

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
            { name: "Men", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop" },
            { name: "Women", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop" },
            { name: "Kids", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop" },
            { name: "Accessories", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop" }
          ].map((c) => (
            <Card key={c.name} className="overflow-hidden min-w-[200px]">
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <Image src={c.image} alt={c.name} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <p className="font-medium">{c.name}</p>
                </div>
              </CardContent>
            </Card>
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
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: "Most Rated: Men", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop" },
            { title: "Most Rated: Women", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=400&fit=crop" }
          ].map((item, i) => (
            <div key={i} className="relative overflow-hidden rounded-xl bg-muted">
              <div className="relative aspect-[16/7]">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="absolute inset-0 flex items-end p-6">
                <div className="rounded-md bg-background/75 px-4 py-2 backdrop-blur">
                  <p className="font-medium">{item.title}</p>
                </div>
              </div>
            </div>
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
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <Image src={`https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop&ix=${i}`} alt="Post" fill className="object-cover" />
                </div>
                <div className="p-4">
                  <p className="font-medium">Effortless Wardrobe Essentials</p>
                  <p className="text-sm text-muted-foreground">5 min read</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
