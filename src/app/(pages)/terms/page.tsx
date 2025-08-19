import { Breadcrumbs } from "@/components/breadcrumbs";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <div className="mb-6">
        <Breadcrumbs 
          items={[
            { label: "Terms & Conditions" }
          ]} 
        />
      </div>
      <h1 className="text-3xl font-semibold">Terms & Conditions</h1>
      <p className="text-muted-foreground">These terms govern your use of our website and services.</p>
    </div>
  );
}


