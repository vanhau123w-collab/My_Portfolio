export const SECTION_ITEMS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contributions", label: "Contributions" },
  { id: "preferences", label: "Preferences" },
  { id: "education", label: "Education" },
] as const;

export type SectionId = (typeof SECTION_ITEMS)[number]["id"];
