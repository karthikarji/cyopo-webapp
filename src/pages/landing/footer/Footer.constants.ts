import type { FooterLinkGroup, FooterLink } from "./Footer.model.d";

export const FOOTER_TAGLINE = "Building the future of professional creative identity.";
export const FOOTER_COPYRIGHT = `© ${new Date().getFullYear()} cyopo. All rights reserved.`;

export const FOOTER_LINKS: FooterLinkGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Templates", href: "#templates" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", href: "/help" },
      { label: "Contact", href: "/contact" },
      { label: "Status", href: "/status" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

export const FOOTER_SOCIAL_LINKS: FooterLink[] = [
  { label: "twitter", href: "https://twitter.com/cyopo" },
  { label: "github", href: "https://github.com/cyopo" },
  { label: "linkedin", href: "https://linkedin.com/company/cyopo" },
];
