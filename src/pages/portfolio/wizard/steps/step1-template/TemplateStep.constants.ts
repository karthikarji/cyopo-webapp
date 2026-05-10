import type { WizardTemplate } from "./TemplateStep.model.d";

export const TEMPLATE_STEP_TITLE = "Choose your template";
export const TEMPLATE_STEP_SUBTITLE = "Pick a design that represents your style. You can change it later.";

export const TEMPLATE_FILTERS = [
  { label: "All", value: "all" },
  { label: "Free", value: "free" },
  { label: "Premium", value: "premium" },
];

// These will be replaced by API data once templates are created
export const FALLBACK_TEMPLATES: WizardTemplate[] = [
  {
    id: "minimal-light",
    name: "Minimal Light",
    description: "Clean and professional",
    isPremium: false,
    tags: ["minimal", "clean"],
    gradient: "linear-gradient(135deg, #f8f2fa 0%, #e9ddff 100%)",
    accent: "#4f378a",
    thumbnail: "",
  },
  {
    id: "dark-professional",
    name: "Dark Professional",
    description: "Bold and sophisticated",
    isPremium: true,
    tags: ["dark", "bold"],
    gradient: "linear-gradient(135deg, #1a1025 0%, #2d1f4e 100%)",
    accent: "#cfbcff",
    thumbnail: "",
  },
  {
    id: "bold-creative",
    name: "Bold Creative",
    description: "Expressive and vibrant",
    isPremium: false,
    tags: ["creative", "colorful"],
    gradient: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)",
    accent: "#ec4899",
    thumbnail: "",
  },
  {
    id: "terminal-dark",
    name: "Terminal Dark",
    description: "Developer focused",
    isPremium: true,
    tags: ["developer", "dark"],
    gradient: "linear-gradient(135deg, #0a0f0a 0%, #0d2010 100%)",
    accent: "#10b981",
    thumbnail: "",
  },
];
