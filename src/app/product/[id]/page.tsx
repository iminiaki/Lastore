import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/data/mock-data";
import { AddToCartButton } from "@/components/add-to-cart-button";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 grid gap-10 md:grid-cols-2">
      <div className="grid gap-3">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
          <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
        </div>
        <div className="grid grid-cols-4 gap-3">
          {product.images.map((src, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-md bg-muted">
              <Image src={src} alt={product.name} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-muted-foreground">{product.brand} • {product.material}</p>
        </div>
        <div className="text-2xl font-semibold">${product.price}</div>
        <div className="space-y-2 text-sm">
          <div>Colors: {product.colors.join(", ")}</div>
          <div>Sizes: {product.sizes.join(", ")}</div>
        </div>
        <AddToCartButton productId={product.id} />
        <div>
          <h2 className="text-lg font-medium">Description</h2>
          <p className="text-muted-foreground">{product.description}</p>
        </div>
      </div>
    </div>
  );
}


