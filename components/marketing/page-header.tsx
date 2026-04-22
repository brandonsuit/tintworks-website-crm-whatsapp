import Link from "next/link";

/**
 * Interior-page header: eyebrow, h1, optional lead paragraph. Sits above
 * the page content on every page except the landing (which uses a richer
 * hero). Also renders breadcrumbs for SEO and orientation.
 */

export type Crumb = { href: string; label: string };

export function PageHeader({
  eyebrow,
  title,
  lead,
  crumbs = [],
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="container pt-12 pb-8 md:pt-16 md:pb-10">
      {crumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <span aria-hidden className="mx-2">
                /
              </span>
            </li>
            {crumbs.map((c, i) => {
              const last = i === crumbs.length - 1;
              return (
                <li key={c.href}>
                  {last ? (
                    <span className="text-foreground" aria-current="page">
                      {c.label}
                    </span>
                  ) : (
                    <>
                      <Link href={c.href} className="hover:text-foreground">
                        {c.label}
                      </Link>
                      <span aria-hidden className="mx-2">
                        /
                      </span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}
      {eyebrow && (
        <p className="font-display text-sm uppercase tracking-[0.35em] text-accent">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-3 max-w-4xl font-display text-5xl uppercase leading-[0.95] tracking-tight text-balance md:text-7xl">
        {title}
      </h1>
      {lead && (
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
          {lead}
        </p>
      )}
    </section>
  );
}
