import type { TemplateShowcaseItem } from "./TemplateShowcase.model.d";

export const SHOWCASE_TITLE = "Pick your canvas";
export const SHOWCASE_SUBTITLE = "Designed for creators of every kind.";
export const SHOWCASE_CTA = "Explore all templates";

export const SHOWCASE_TEMPLATES: TemplateShowcaseItem[] = [
  {
    id: "minimal-light",
    name: "Minimal Light",
    category: "Clean & Professional",
    isPremium: false,
    gradient: "linear-gradient(135deg, #f8f2fa 0%, #e9ddff 100%)",
    accentColor: "#4f378a",
  },
  {
    id: "dark-professional",
    name: "Dark Professional",
    category: "Bold & Sophisticated",
    isPremium: true,
    gradient: "linear-gradient(135deg, #1a1025 0%, #2d1f4e 100%)",
    accentColor: "#cfbcff",
  },
  {
    id: "bold-creative",
    name: "Bold Creative",
    category: "Expressive & Vibrant",
    isPremium: false,
    gradient: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)",
    accentColor: "#ec4899",
  },
  {
    id: "terminal-dark",
    name: "Terminal Dark",
    category: "Developer Focused",
    isPremium: true,
    gradient: "linear-gradient(135deg, #0a0f0a 0%, #0d2010 100%)",
    accentColor: "#10b981",
  },
];
