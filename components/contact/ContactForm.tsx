"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, Copy, Mail, PenLine } from "lucide-react";
import { useTranslations } from "next-intl";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";

const TOPICS = ["question", "idea", "problem", "other"] as const;
type Topic = (typeof TOPICS)[number];
type Field = "name" | "email" | "message";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm() {
  const t = useTranslations("Contact");
  const [values, setValues] = useState({ name: "", email: "", topic: "question" as Topic, message: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function validate(v = values) {
    const e: Partial<Record<Field, string>> = {};
    if (!v.name.trim()) e.name = t("required");
    else if (v.name.trim().length < 2) e.name = t("nameInvalid");
    if (!v.email.trim()) e.email = t("required");
    else if (!EMAIL_RE.test(v.email.trim())) e.email = t("emailInvalid");
    if (!v.message.trim()) e.message = t("required");
    else if (v.message.trim().length < 10) e.message = t("messageInvalid");
    return e;
  }

  function update<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    // Once a field has shown an error, re-check it as the student types.
    if (key in errors) setErrors((prev) => ({ ...prev, [key]: validate(next)[key as Field] }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    const first = (["name", "email", "message"] as Field[]).find((f) => found[f]);
    if (first) {
      ({ name: nameRef, email: emailRef, message: messageRef })[first].current?.focus();
      return;
    }
    const subject = t("emailSubject", { topic: t(`subjects.${values.topic}`) });
    const body = t("emailBody", { name: values.name.trim(), email: values.email.trim(), message: values.message.trim() });
    window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.contactEmail);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the address is visible anyway */
    }
  }

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-900 dark:bg-emerald-950/30"
          role="status"
        >
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-500 text-white">
            <Mail className="size-8" aria-hidden />
          </span>
          <h2 className="mt-4 text-xl font-bold text-ink">{t("successTitle")}</h2>
          <p className="mt-2 text-muted">{t("successText", { email: site.contactEmail })}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button variant="secondary" onClick={copyEmail}>
              {copied ? <Check className="size-5 text-emerald-600" aria-hidden /> : <Copy className="size-5" aria-hidden />}
              {copied ? t("copied") : t("copy")}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setSent(false);
                setValues({ name: values.name, email: values.email, topic: "question", message: "" });
              }}
            >
              <PenLine className="size-5" aria-hidden />
              {t("again")}
            </Button>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={submit}
          noValidate
          className="space-y-5 rounded-[1.75rem] border-2 border-white bg-surface dark:border-white/5 p-6 shadow-soft sm:p-8"
        >
          <h2 className="text-xl font-bold text-ink">{t("formTitle")}</h2>

          {hasErrors && (
            <p role="alert" className="flex items-center gap-2 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
              <AlertCircle className="size-5 shrink-0" aria-hidden />
              {t("errorSummary")}
            </p>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField id="c-name" label={t("name")} error={errors.name}>
              <input
                ref={nameRef}
                id="c-name"
                value={values.name}
                onChange={(e) => update("name", e.target.value)}
                onBlur={() => values.name && setErrors((p) => ({ ...p, name: validate().name }))}
                autoComplete="name"
                placeholder={t("namePlaceholder")}
                maxLength={60}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "c-name-error" : undefined}
                className={inputClass(!!errors.name)}
              />
            </FormField>
            <FormField id="c-email" label={t("email")} error={errors.email}>
              <input
                ref={emailRef}
                id="c-email"
                type="email"
                dir="ltr"
                value={values.email}
                onChange={(e) => update("email", e.target.value)}
                onBlur={() => values.email && setErrors((p) => ({ ...p, email: validate().email }))}
                autoComplete="email"
                inputMode="email"
                placeholder={t("emailPlaceholder")}
                maxLength={120}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "c-email-error" : undefined}
                className={`${inputClass(!!errors.email)} text-start rtl:text-end`}
              />
            </FormField>
          </div>

          <FormField id="c-topic" label={t("subject")}>
            <select
              id="c-topic"
              value={values.topic}
              onChange={(e) => update("topic", e.target.value as Topic)}
              className={inputClass(false)}
            >
              {TOPICS.map((topic) => (
                <option key={topic} value={topic}>
                  {t(`subjects.${topic}`)}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id="c-message" label={t("message")} error={errors.message}>
            <textarea
              ref={messageRef}
              id="c-message"
              dir="auto"
              rows={6}
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder={t("messagePlaceholder")}
              maxLength={2000}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "c-message-error" : undefined}
              className={`${inputClass(!!errors.message)} resize-y`}
            />
          </FormField>

          <Button type="submit" className="w-full sm:w-auto">
            <Mail className="size-5" aria-hidden />
            {t("send")}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function inputClass(invalid: boolean) {
  return `w-full rounded-2xl border-2 bg-bg px-4 py-3 text-ink outline-none transition placeholder:text-muted/70 focus:border-brand-500 ${
    invalid ? "border-rose-400" : "border-line"
  }`;
}

function FormField({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-rose-600 dark:text-rose-400">
          <AlertCircle className="size-4 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}
