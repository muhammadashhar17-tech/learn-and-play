import { ChevronDown, CircleHelp } from "lucide-react";
import { useTranslations } from "next-intl";
import { site } from "@/data/site";
import { ClayIcon } from "@/components/ui/ClayIcon";

const QUESTIONS = [1, 2, 3, 4, 5, 6, 7] as const;

/**
 * Frequently asked questions. Native <details>/<summary> gives keyboard support
 * and screen-reader "expanded/collapsed" state for free.
 */
export function Faq() {
  const t = useTranslations("Faq");
  const about = useTranslations("About");
  const contact = useTranslations("Contact");
  const values = { school: about("schoolName"), name: contact("personName"), email: site.contactEmail };

  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-4 pb-6 pt-4 sm:px-6">
      <div className="text-center">
        <ClayIcon icon={CircleHelp} tile="from-pink-400 to-violet-600" className="mx-auto" />
        <p className="mt-4 text-sm font-extrabold uppercase tracking-widest text-pink-600 dark:text-pink-400">{t("eyebrow")}</p>
        <h2 className="mt-1 text-3xl font-black tracking-tight text-ink sm:text-4xl">{t("title")}</h2>
        <p className="mt-2 text-lg text-muted">{t("subtitle")}</p>
      </div>

      <div className="mt-8 space-y-3">
        {QUESTIONS.map((n) => (
          <details
            key={n}
            className="group rounded-[1.5rem] border-2 border-white bg-surface shadow-soft transition-shadow duration-200 open:shadow-lift dark:border-white/5"
          >
            <summary className="flex min-h-14 items-center justify-between gap-4 rounded-[1.5rem] px-5 py-4 text-start font-bold text-ink [&::-webkit-details-marker]:hidden">
              <span>{t(`q${n}`)}</span>
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-2 text-brand-600 transition-transform duration-300 group-open:rotate-180 dark:text-brand-300">
                <ChevronDown className="size-5" aria-hidden />
              </span>
            </summary>
            <p className="px-5 pb-5 text-muted">
              {t.rich(`a${n}`, {
                ...values,
                mail: (chunks) => (
                  <a
                    href={`mailto:${site.contactEmail}`}
                    dir="ltr"
                    className="font-latin font-bold text-brand-700 underline decoration-brand-300 underline-offset-2 hover:decoration-brand-600 dark:text-brand-300"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
