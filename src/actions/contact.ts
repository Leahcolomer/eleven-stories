"use server";

import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/content/site";
import { sectors, zones } from "@/content/form";

// Libellés utilisés dans l'e-mail reçu par Leah (toujours en français)
const zoneLabels: Record<(typeof zones)[number], string> = {
  france: "France",
  international: "International",
  both: "France & International",
};
const sectorLabels: Record<(typeof sectors)[number], string> = {
  fashion: "Mode",
  jewellery: "Joaillerie",
  hospitality: "Hôtellerie",
  restaurant: "Restauration",
  beauty: "Beauté & cosmétique",
  design: "Design & art de vivre",
  other: "Autre",
};

const required = (max: number) =>
  z.string().trim().min(1, "required").max(max, "tooLong");

const schema = z.object({
  name: required(120),
  email: z.string().trim().min(1, "required").max(200, "tooLong").pipe(z.email("email")),
  phone: z
    .string()
    .trim()
    .min(1, "required")
    .regex(/^[+()\d\s.-]{6,25}$/, "phone"),
  zone: z.enum(zones, "required"),
  city: z.string().trim().max(200, "tooLong"),
  sector: z.enum(sectors, "required"),
  message: required(5000),
  consent: z.literal("on", "consent"),
});

export type ContactField = keyof z.infer<typeof schema>;
export type ErrorCode = "required" | "email" | "phone" | "consent" | "tooLong";

export type ContactState = {
  status: "idle" | "success" | "error";
  /** Code d'erreur par champ, traduit côté client */
  fieldErrors?: Partial<Record<ContactField, ErrorCode>>;
  /** Valeurs saisies, pour ne rien perdre en cas d'erreur */
  values?: Record<string, string>;
  serverError?: boolean;
};

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = Object.fromEntries(
    ["name", "email", "phone", "zone", "city", "sector", "message", "consent"].map((k) => [
      k,
      String(formData.get(k) ?? ""),
    ]),
  );

  // Champ piège : invisible pour un humain, rempli par les robots
  if (String(formData.get("website") ?? "").length > 0) {
    return { status: "success" };
  }

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField;
      const code = (["required", "email", "phone", "consent", "tooLong"] as const).includes(
        issue.message as ErrorCode,
      )
        ? (issue.message as ErrorCode)
        : "required";
      fieldErrors[field] ??= code;
    }
    return { status: "error", fieldErrors, values };
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY manquante");
    return { status: "error", serverError: true, values };
  }

  const locale = formData.get("locale") === "en" ? "EN" : "FR";
  const rows: [string, string][] = [
    ["Nom / Prénom", data.name],
    ["E-mail", data.email],
    ["Téléphone", data.phone],
    ["Zone visée", zoneLabels[data.zone] + (data.city ? ` — ${data.city}` : "")],
    ["Secteur", sectorLabels[data.sector]],
    ["Langue du site", locale],
  ];

  const html = `
<div style="font-family:Georgia,serif;color:#111;max-width:600px;margin:0 auto;padding:32px">
  <p style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8f8175;margin:0 0 8px">Eleven Stories — Parlons-en</p>
  <h1 style="font-weight:400;font-size:28px;margin:0 0 28px">Nouvelle demande de <em>${escape(data.name)}</em></h1>
  <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
    ${rows
      .map(
        ([label, value]) =>
          `<tr><td style="padding:10px 0;border-bottom:1px solid #e9e1d6;color:#8f8175;width:140px;vertical-align:top">${label}</td><td style="padding:10px 0;border-bottom:1px solid #e9e1d6">${escape(value)}</td></tr>`,
      )
      .join("")}
  </table>
  <p style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8f8175;margin:32px 0 12px">Projet / actualité</p>
  <p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.7;white-space:pre-wrap;margin:0">${escape(data.message)}</p>
  <p style="font-family:Arial,sans-serif;font-size:12px;color:#8f8175;margin-top:40px">Répondez directement à cet e-mail pour écrire à ${escape(data.email)}.</p>
</div>`;

  const text = [...rows.map(([l, v]) => `${l} : ${v}`), "", "Projet / actualité :", data.message].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "Eleven Stories <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL || site.email,
      replyTo: data.email,
      subject: `Nouvelle demande — ${data.name} · ${sectorLabels[data.sector]}`,
      html,
      text,
    });
    if (error) {
      console.error("[contact] Resend :", error);
      return { status: "error", serverError: true, values };
    }
  } catch (err) {
    console.error("[contact] Envoi impossible :", err);
    return { status: "error", serverError: true, values };
  }

  return { status: "success" };
}
