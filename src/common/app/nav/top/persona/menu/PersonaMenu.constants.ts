import type { PersonaMenuItem } from "../UserPersona.model.d";

export const PERSONA_MENU_ITEMS: PersonaMenuItem[] = [
  { label: "My profile", icon: "account_circle", route: "/settings" },
  { label: "Settings", icon: "settings", route: "/settings" },
  { label: "Sign out", icon: "logout", action: "signout", danger: true },
];
