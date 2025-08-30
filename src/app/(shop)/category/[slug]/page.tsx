import Link from "next/link";
import { categories, products as allProducts, brands, materials, colors, sizes } from "@/data/mock-data";
import { notFound } from "next/navigation";
import { Filters } from "@/components/filters";
import { FilterModal } from "@/components/filter-modal";
import { ProductGrid } from "@/components/product-grid";
import { Breadcrumbs } from "@/components/breadcrumbs";
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
    { key: "brand", title: "Brand", options: brands },
    { key: "material", title: "Material", options: materials },
    { key: "color", title: "Color", options: colors },
    { key: "size", title: "Size", options: sizes },
  ];
  const subOptionsByCategory = { [category.slug]: category.subCategories.map(s => ({ label: s.name, value: s.slug })) } as Record<string, { label: string; value: string }[]>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6">
        <Breadcrumbs 
          items={[
            { label: "Shop", href: "/shop" },
            { label: category.name }
          ]} 
        />
      </div>
      <div className="grid gap-10 md:grid-cols-[260px_1fr]">
        <aside className="hidden md:block md:sticky md:top-20 h-max">
          <Filters groups={groups} priceMax={priceMax} subOptionsByCategory={subOptionsByCategory} />
        </aside>
        <section className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold capitalize">{category.name}</h1>
                <p className="text-muted-foreground">Browse {category.name.toLowerCase()} collection</p>
              </div>
              
              {/* Sub-category Links */}
              <div className="flex flex-wrap gap-2">
                {category.subCategories.map((subCategory) => (
                  <Link
                    key={subCategory.id}
                    href={`/category/${category.slug}/${subCategory.slug}`}
                    className="px-3 py-1 text-sm border rounded-md hover:bg-accent transition-colors capitalize"
                  >
                    {subCategory.name}
                  </Link>
                ))}
              </div>
            </div>
            <FilterModal groups={groups} priceMax={priceMax} subOptionsByCategory={subOptionsByCategory} />
          </div>
          <ProductGrid products={products} />
        </section>
      </div>
    </div>
  );
}


