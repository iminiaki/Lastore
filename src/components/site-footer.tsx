import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t hidden md:block">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-muted-foreground">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p>© {new Date().getFullYear()} Lastore. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Link href="/terms" className="hover:text-foreground">Terms</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            <span>•</span>
            <span>Powered by Lastaar</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
