import { cn, pageContainerClass, pageGutterClass } from "@/lib/utils";

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  /** Identifies this region in DevTools, e.g. "navbar" or "featured-listings". */
  dataComponent?: string;
}

/**
 * Shared horizontal layout: viewport gutters outside, full-width column inside.
 * Use for navbar, page sections, and footer so edges align everywhere.
 */
export default function PageShell({
  children,
  className,
  innerClassName,
  dataComponent,
}: PageShellProps) {
  return (
    <div
      className={cn(pageGutterClass, className)}
      data-layout="page-gutter"
      {...(dataComponent ? { "data-component": dataComponent } : {})}
    >
      <div
        className={cn(pageContainerClass, innerClassName)}
        data-layout="page-content"
        {...(dataComponent ? { "data-component": `${dataComponent}-content` } : {})}
      >
        {children}
      </div>
    </div>
  );
}
