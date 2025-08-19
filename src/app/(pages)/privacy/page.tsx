import { Breadcrumbs } from "@/components/breadcrumbs";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <div className="mb-6">
        <Breadcrumbs 
          items={[
            { label: "Privacy Policy" }
          ]} 
        />
      </div>
      <h1 className="text-3xl font-semibold">Privacy Policy</h1>
      <p className="text-muted-foreground">We respect your privacy and are committed to protecting your personal data.</p>
    </div>
  );
}


