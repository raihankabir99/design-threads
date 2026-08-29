import { Link } from "react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";

export default function NotFound() {
  return (
    <SiteLayout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-6xl lg:text-8xl font-light text-border mb-4">404</p>
          <h1 className="text-display text-xl lg:text-2xl mb-3">Page Not Found</h1>
          <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 h-11 px-6 bg-foreground text-background text-sm font-medium tracking-wide rounded-sm hover:bg-foreground/90 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}
