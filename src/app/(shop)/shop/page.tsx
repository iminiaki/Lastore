import { products as allProducts, brands, materials, colors, sizes } from "@/data/mock-data";
import { Filters } from "@/components/filters";
import { FilterModal } from "@/components/filter-modal";
import { ProductGrid } from "@/components/product-grid";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { filterProducts, parseQuery } from "@/lib/shop";

export default async function ShopPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const query = parseQuery(sp);
  const products = filterProducts(allProducts, query);
  const priceMax = Math.max(...allProducts.map((p) => p.price));
  const groups = [
    { key: "brand", title: "Brand", options: brands },
    { key: "material", title: "Material", options: materials },
    { key: "color", title: "Color", options: colors },
    { key: "size", title: "Size", options: sizes },
  ];
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6">
        <Breadcrumbs 
          items={[
            { label: "Shop" }
          ]} 
        />
      </div>
      <div className="grid gap-10 md:grid-cols-[260px_1fr]">
        <aside className="hidden md:block md:sticky md:top-20 h-max">
          <Filters groups={groups} priceMax={priceMax} />
        </aside>
        <section className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold">
                {query.search ? `Search results for "${query.search}"` : "Shop"}
              </h1>
              {query.search && (
                <p className="text-sm text-muted-foreground mt-1">
                  {products.length} product{products.length !== 1 ? 's' : ''} found
                </p>
              )}
            </div>
            <FilterModal groups={groups} priceMax={priceMax} />
          </div>
          <ProductGrid products={products} />
        </section>
      </div>
    </div>
  );
}


