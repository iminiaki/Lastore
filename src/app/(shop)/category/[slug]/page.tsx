import { categories, products as allProducts, brands, materials, colors, sizes } from "@/data/mock-data";
import { notFound } from "next/navigation";
import { Filters } from "@/components/filters";
import { ProductGrid } from "@/components/product-grid";
import { filterProducts, parseQuery } from "@/lib/shop";

export default async function CategoryPage({ params, searchParams }: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return notFound();

  const query = parseQuery({ ...sp, category: category.slug });
  const products = filterProducts(allProducts, query);
  const priceMax = Math.max(...allProducts.map((p) => p.price));

  const groups = [
    { key: "subCategory", title: "Sub-category", options: category.subCategories.map((s) => s.slug) },
    { key: "brand", title: "Brand", options: brands },
    { key: "material", title: "Material", options: materials },
    { key: "color", title: "Color", options: colors },
    { key: "size", title: "Size", options: sizes },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 grid gap-10 md:grid-cols-[260px_1fr]">
      <aside className="md:sticky md:top-20 h-max">
        <Filters groups={groups} priceMax={priceMax} />
      </aside>
      <section className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold capitalize">{category.name}</h1>
          <p className="text-muted-foreground">Browse {category.name.toLowerCase()} collection</p>
        </div>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}


