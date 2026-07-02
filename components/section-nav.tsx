import { SECTION_ITEMS } from "@/components/section-nav-config";

function SectionNav() {
  return (
    <nav
      aria-label="Page sections"
      className="fixed top-32 left-[max(1rem,calc(50%-40rem-10rem))] hidden w-36 xl:block z-20"
    >
      <ul className="nav-list flex flex-col gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
        {SECTION_ITEMS.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="nav-link transition-colors hover:text-foreground"
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export { SectionNav };
