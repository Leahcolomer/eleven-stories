"use client";

import { useActionState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { sendContact, type ContactField, type ContactState } from "@/actions/contact";
import { sectors, zones } from "@/content/form";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { cx, em } from "@/lib/utils";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "peer w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-3 text-base font-light text-ink placeholder:text-taupe/70 focus:border-ink focus:outline-none focus:ring-0 transition-colors aria-[invalid=true]:border-red-800";

export function ContactForm() {
  const t = useTranslations("form");
  const locale = useLocale();
  const reduce = useReducedMotion();
  const [state, formAction, pending] = useActionState(sendContact, initialState);

  const v = state.values ?? {};
  const err = (field: ContactField) => {
    const code = state.fieldErrors?.[field];
    return code ? t(`errors.${code}`) : undefined;
  };

  if (state.status === "success") {
    return (
      <motion.div
        role="status"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="border-t border-ink pt-12"
      >
        <p className="display serif-accent text-4xl md:text-5xl">{t.rich("successTitle", { em })}</p>
        <p className="mt-6 text-lg leading-relaxed text-muted">{t("successText")}</p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-10">
      <input type="hidden" name="locale" value={locale} />
      {/* Champ piège anti-robots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-10 md:grid-cols-2 md:gap-x-12">
        <Field id="name" label={t("name")} error={err("name")}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            defaultValue={v.name}
            aria-invalid={!!err("name")}
            aria-describedby={err("name") ? "name-error" : undefined}
            className={inputClass}
          />
        </Field>

        <Field id="email" label={t("email")} error={err("email")}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={v.email}
            aria-invalid={!!err("email")}
            aria-describedby={err("email") ? "email-error" : undefined}
            className={inputClass}
          />
        </Field>

        <Field id="phone" label={t("phone")} error={err("phone")}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            defaultValue={v.phone}
            aria-invalid={!!err("phone")}
            aria-describedby={err("phone") ? "phone-error" : undefined}
            className={inputClass}
          />
        </Field>

        <Field id="sector" label={t("sector")} error={err("sector")}>
          <Select
            id="sector"
            name="sector"
            defaultValue={v.sector}
            invalid={!!err("sector")}
            placeholder={t("select")}
            options={sectors.map((s) => ({ value: s, label: t(`sectorOptions.${s}`) }))}
          />
        </Field>

        <Field id="zone" label={t("zone")} error={err("zone")}>
          <Select
            id="zone"
            name="zone"
            defaultValue={v.zone}
            invalid={!!err("zone")}
            placeholder={t("select")}
            options={zones.map((z) => ({ value: z, label: t(`zoneOptions.${z}`) }))}
          />
        </Field>

        <Field id="city" label={t("city")} optional={t("optional")} error={err("city")}>
          <input
            id="city"
            name="city"
            type="text"
            placeholder={t("cityPlaceholder")}
            defaultValue={v.city}
            aria-invalid={!!err("city")}
            className={inputClass}
          />
        </Field>
      </div>

      <Field id="message" label={t("message")} error={err("message")}>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder={t("messagePlaceholder")}
          defaultValue={v.message}
          aria-invalid={!!err("message")}
          aria-describedby={err("message") ? "message-error" : undefined}
          className={cx(inputClass, "resize-y leading-relaxed")}
        />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-4 text-sm leading-relaxed text-muted">
          <input
            type="checkbox"
            name="consent"
            defaultChecked={v.consent === "on"}
            aria-invalid={!!err("consent")}
            aria-describedby={err("consent") ? "consent-error" : undefined}
            className="mt-1 size-4 shrink-0 cursor-pointer appearance-none border border-ink bg-transparent bg-center bg-no-repeat checked:bg-ink checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22><path d=%22M4 8.5l2.5 2.5L12 5.5%22 stroke=%22white%22 stroke-width=%221.5%22 fill=%22none%22/></svg>')]"
          />
          <span>
            {t.rich("consent", {
              link: (chunks) => (
                <Link href="/confidentialite" className="link-underline text-ink" target="_blank">
                  {chunks}
                </Link>
              ),
            })}
          </span>
        </label>
        {err("consent") && (
          <p id="consent-error" className="mt-2 text-sm text-red-800">
            {err("consent")}
          </p>
        )}
      </div>

      {state.serverError && (
        <p role="alert" className="border-l border-red-800 pl-4 text-sm text-red-800">
          {t("errors.server", { email: site.email })}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="eyebrow inline-flex items-center gap-4 rounded-full border border-ink bg-ink px-10 py-4 !font-normal text-paper transition-colors duration-500 hover:bg-transparent hover:text-ink disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? t("sending") : t("submit")}
        <span aria-hidden>→</span>
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow block text-taupe">
        {label}
        {optional && <span className="ml-2 normal-case tracking-normal opacity-70">({optional})</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-800">
          {error}
        </p>
      )}
    </div>
  );
}

function Select({
  id,
  name,
  defaultValue,
  invalid,
  placeholder,
  options,
}: {
  id: string;
  name: string;
  defaultValue?: string;
  invalid: boolean;
  placeholder: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        required
        defaultValue={defaultValue ?? ""}
        aria-invalid={invalid}
        aria-describedby={invalid ? `${id}-error` : undefined}
        className={cx(inputClass, "cursor-pointer appearance-none pr-8 invalid:text-taupe/70")}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="text-ink">
            {o.label}
          </option>
        ))}
      </select>
      <span aria-hidden className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-xs text-taupe">
        ▾
      </span>
    </div>
  );
}
