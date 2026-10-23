import type { routing } from "@/i18n/routing";
import type messages from "@/messages/en.json";

// Gives type-checked translation keys: a typo in t("...") fails the build.
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
