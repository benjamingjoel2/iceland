"use client";

import { AnimatePresence, m } from "framer-motion";
import { useId, useRef, useState } from "react";
import Link from "next/link";
import { contact } from "@/config/site";
import {
  budgetLabels,
  budgetOptions,
  contactLabels,
  contactMethods,
  dialCodes,
  enquirySchema,
  heardLabels,
  heardOptions,
  interestLabels,
  interestOptions,
  seasonLabels,
  seasonsOptions,
} from "@/lib/enquiry";

type Journeys = { slug: string; title: string }[];
type Errors = Record<string, string>;

const tile =
  "flex min-h-[52px] items-center justify-center rounded-[2px] border px-4 py-3 text-center text-[13px] font-medium transition-colors duration-200 cursor-pointer select-none";
const tileOff = "border-white bg-white text-atlantic hover:bg-glacier";
const tileOn = "border-aurora bg-aurora text-white";
const input =
  "h-[52px] w-full rounded-[2px] border border-transparent bg-white px-4 text-[14px] text-atlantic placeholder:text-slate/70 outline-none transition-colors focus:border-aurora";

function Fieldset({ legend, hint, children, error, id }: { legend: string; hint?: React.ReactNode; children: React.ReactNode; error?: string; id: string }) {
  return (
    <fieldset className="border-b border-dashed border-white/25 pb-10 pt-10 first:pt-0" aria-describedby={error ? `${id}-err` : undefined}>
      <legend className="mb-1 text-[18px] font-medium text-white">{legend}</legend>
      {hint ? <p className="mb-5 text-[12px] text-white/75">{hint}</p> : <div className="mb-5" />}
      {children}
      {error ? (
        <p id={`${id}-err`} role="alert" className="mt-3 text-[13px] text-amber-200">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

function Err({ id, msg }: { id: string; msg?: string }) {
  return msg ? (
    <p id={id} role="alert" className="mt-1.5 text-[12px] text-amber-200">
      {msg}
    </p>
  ) : null;
}

export function EnquiryForm({ journeys, initialJourney = "" }: { journeys: Journeys; initialJourney?: string }) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [season, setSeason] = useState<string>("");
  const [interests, setInterests] = useState<string[]>([]);
  const [contactMethod, setContactMethod] = useState<string>("email");
  const [journey, setJourney] = useState(initialJourney);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [firstName, setFirstName] = useState("");


  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      dialCode: String(fd.get("dialCode") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      season,
      dates: String(fd.get("dates") ?? ""),
      travellers: String(fd.get("travellers") ?? ""),
      journey,
      interests,
      budget: String(fd.get("budget") ?? ""),
      heard: String(fd.get("heard") ?? ""),
      notes: String(fd.get("notes") ?? ""),
      contactMethod,
      company: String(fd.get("company") ?? ""),
    };

    const parsed = enquirySchema.safeParse(payload);
    if (!parsed.success) {
      const next: Errors = {};
      for (const i of parsed.error.issues) next[String(i.path[0])] ??= i.message;
      setErrors(next);
      const first = Object.keys(next)[0];
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        setStatus("error");
        return;
      }
      setFirstName(payload.name.split(" ")[0]);
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status === "done" ? (
        <m.div
          key="done"
          role="status"
          className="mx-auto max-w-[34rem] py-10 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="t-eyebrow mb-4 text-white/80">Thank you{firstName ? `, ${firstName}` : ""}</p>
          <h2 className="t-h3">Your journey north has begun</h2>
          <p className="t-body mx-auto mt-6 max-w-[26rem] text-white/85">
            Your specialist will be in touch within one working day, {contactMethod === "email" ? "by email" : "by telephone"}, to talk through your ideas. There is
            nothing more you need to do.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <Link href="/journal" className="flex h-12 items-center rounded-[2px] border border-white/40 px-6 text-[13px] font-medium text-white hover:bg-white hover:text-atlantic">
              Read the journal
            </Link>
          </div>
        </m.div>
      ) : (
        <m.form
          key="form"
          ref={formRef}
          noValidate
          onSubmit={onSubmit}
          className="mx-auto w-full max-w-[34rem]"
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {/* Honeypot */}
          <div aria-hidden className="absolute left-[-9999px]">
            <label>
              Company <input name="company" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <Fieldset id={`${uid}-season`} legend="When would you like to travel?" error={errors.season}>
            <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Preferred season">
              {seasonsOptions.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={season === s}
                  data-field={i === 0 ? "season" : undefined}
                  onClick={() => setSeason(s)}
                  className={`${tile} ${season === s ? tileOn : tileOff}`}
                >
                  <span>
                    {seasonLabels[s]}
                    <span className="block text-[11px] font-normal opacity-70">
                      {s === "summer" ? "Jun – Aug" : s === "winter" ? "Oct – Mar" : "Help me choose"}
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <label htmlFor="dates" className="sr-only">Travel dates or month</label>
                <input id="dates" name="dates" placeholder="Travel dates or month (e.g. February 2027)" className={input} />
              </div>
              <div>
                <label htmlFor="travellers" className="sr-only">Number of travellers</label>
                <input
                  id="travellers"
                  name="travellers"
                  type="number"
                  min={1}
                  max={40}
                  inputMode="numeric"
                  placeholder="Number of travellers*"
                  data-field="travellers"
                  aria-invalid={!!errors.travellers}
                  aria-describedby={errors.travellers ? "travellers-err" : undefined}
                  className={input}
                />
                <Err id="travellers-err" msg={errors.travellers} />
              </div>
            </div>
          </Fieldset>

          <Fieldset id={`${uid}-journey`} legend="Which journey interests you?" hint={<>Every journey is private and can be adapted. See <Link href="/prices" className="underline">dates &amp; prices</Link>.</>}>
            <label htmlFor="journey" className="sr-only">Journey of interest</label>
            <div className="relative">
              <select id="journey" value={journey} onChange={(e) => setJourney(e.target.value)} className={`${input} appearance-none pr-10`}>
                <option value="">Not sure yet — help me decide</option>
                {journeys.map((j) => (
                  <option key={j.slug} value={j.slug}>{j.title}</option>
                ))}
                <option value="bespoke">Something bespoke</option>
              </select>
              <Chevron />
            </div>
          </Fieldset>

          <Fieldset id={`${uid}-interests`} legend="What are you interested in?" hint="Choose as many as you like.">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {interestOptions.map((opt) => {
                const on = interests.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setInterests((cur) => (on ? cur.filter((x) => x !== opt) : [...cur, opt]))}
                    className={`${tile} ${on ? tileOn : tileOff}`}
                  >
                    {interestLabels[opt]}
                  </button>
                );
              })}
            </div>
          </Fieldset>

          <Fieldset id={`${uid}-budget`} legend="Budget and how you found us">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <label htmlFor="budget" className="sr-only">Budget range</label>
                <div className="relative">
                  <select id="budget" name="budget" defaultValue="" data-field="budget" aria-invalid={!!errors.budget} aria-describedby={errors.budget ? "budget-err" : undefined} className={`${input} appearance-none pr-10`}>
                    <option value="" disabled>Budget range*</option>
                    {budgetOptions.map((b) => (
                      <option key={b} value={b}>{budgetLabels[b]}</option>
                    ))}
                  </select>
                  <Chevron />
                </div>
                <Err id="budget-err" msg={errors.budget} />
              </div>
              <div>
                <label htmlFor="heard" className="sr-only">How did you hear about us?</label>
                <div className="relative">
                  <select id="heard" name="heard" defaultValue="" className={`${input} appearance-none pr-10`}>
                    <option value="">How did you hear about us?</option>
                    {heardOptions.map((h) => (
                      <option key={h} value={h}>{heardLabels[h]}</option>
                    ))}
                  </select>
                  <Chevron />
                </div>
              </div>
            </div>
          </Fieldset>

          <Fieldset id={`${uid}-contact`} legend="Contact information" hint="So your specialist can reach you personally.">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="sr-only">Full name</label>
                <input id="name" name="name" autoComplete="name" placeholder="Full name*" data-field="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} className={input} />
                <Err id="name-err" msg={errors.name} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="sr-only">Email address</label>
                <input id="email" name="email" type="email" autoComplete="email" placeholder="Email address*" data-field="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} className={input} />
                <Err id="email-err" msg={errors.email} />
              </div>
              <div>
                <label htmlFor="dialCode" className="sr-only">Country code</label>
                <div className="relative">
                  <select id="dialCode" name="dialCode" defaultValue="+1" autoComplete="tel-country-code" className={`${input} appearance-none pr-10`}>
                    {dialCodes.map((d) => (
                      <option key={d.code} value={d.code}>{d.label}</option>
                    ))}
                  </select>
                  <Chevron />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">Phone number</label>
                <input id="phone" name="phone" type="tel" autoComplete="tel-national" placeholder={contactMethod === "email" ? "Phone number" : "Phone number*"} data-field="phone" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-err" : undefined} className={input} />
                <Err id="phone-err" msg={errors.phone} />
              </div>
            </div>
            <p className="mb-3 mt-7 text-[14px] font-medium text-white">Preferred contact method</p>
            <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Preferred contact method">
              {contactMethods.map((m) => (
                <button key={m} type="button" role="radio" aria-checked={contactMethod === m} onClick={() => setContactMethod(m)} className={`${tile} ${contactMethod === m ? tileOn : tileOff}`}>
                  {contactLabels[m]}
                </button>
              ))}
            </div>
          </Fieldset>

          <div className="pt-10">
            <label htmlFor="notes" className="sr-only">Notes</label>
            <textarea
              id="notes"
              name="notes"
              rows={5}
              placeholder="Tell us more: celebrations, mobility, children's ages, the moment you are dreaming of…"
              className="w-full rounded-[2px] bg-white px-4 py-3.5 text-[14px] text-atlantic outline-none placeholder:text-slate/70 focus:ring-1 focus:ring-aurora"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-4 flex h-[72px] w-full items-center justify-center rounded-[2px] bg-white text-[14px] font-medium text-atlantic transition-colors hover:bg-aurora hover:text-white disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send enquiry"}
            </button>
            {status === "error" ? (
              <p role="alert" className="mt-3 text-center text-[13px] text-amber-200">
                Something didn&rsquo;t go through. Please check the fields above, or email {contact.email}.
              </p>
            ) : null}
            {Object.keys(errors).length > 0 ? (
              <p role="alert" className="mt-3 text-center text-[13px] text-amber-200">Please check the highlighted fields.</p>
            ) : null}
            <p className="mt-4 text-center text-[11px] text-white/60">
              We use your details only to plan your journey. See our <Link href="/legal/privacy" className="underline">privacy notice</Link>.
            </p>
          </div>
        </m.form>
      )}
    </AnimatePresence>
  );
}

function Chevron() {
  return (
    <svg aria-hidden viewBox="0 0 10 6" className="pointer-events-none absolute right-4 top-1/2 h-1.5 w-2.5 -translate-y-1/2 text-atlantic" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M1 1l4 4 4-4" />
    </svg>
  );
}
