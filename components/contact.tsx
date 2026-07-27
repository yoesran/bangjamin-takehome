'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2, Mail, MessageCircle, Phone } from 'lucide-react';
import { z } from 'zod';

import { Field, describedBy, inputCls } from '@/components/form-field';
import { SITE } from '@/lib/content';
import type { Dictionary } from '@/lib/i18n/dictionaries';

const CONTACT_LINKS = [
  { href: `mailto:${SITE.email}`, icon: Mail, label: SITE.email },
  { href: `tel:${SITE.phone}`, icon: Phone, label: SITE.phone },
  { href: SITE.whatsappHref, icon: MessageCircle, label: `${SITE.whatsapp} (Chat Only)` },
] as const;

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().regex(/^8\d{7,13}$/),
  message: z.string().min(5),
});
type ContactForm = z.infer<typeof schema>;

export function Contact({ dict }: { dict: Dictionary }) {
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: ContactForm) => {
    setFailed(false);
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(values),
    }).catch(() => null);
    if (!res?.ok) return setFailed(true);
    setSent(true);
  };

  return (
    <section className="bg-grey10 relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[30%] z-0 h-[520px]">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 360 130"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            opacity="0.3"
            d="M-1 75.42C49.55 62.196 169.54-25.43 162.664 28.225c-8.596 67.07 14.043 48.03 58.067 26.052 44.023-21.977 42.773 41.782 54.372 61.946 11.383 19.788 32.445-72.652 85.897-72.652"
            stroke="#cfcfcf"
            strokeWidth="12"
          />
        </svg>
      </div>
      <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-8 px-4 py-10 md:grid-cols-2 xl:items-center">
        <div>
          <h2 className="font-display text-[24px] leading-8 font-semibold text-black sm:text-[2.75rem] sm:leading-[55px]">
            {dict.contact.title}{' '}
            <span className="text-primary-strong">{dict.contact.titleAccent}</span>
          </h2>
          <p className="text-grey90 mt-4 text-lg leading-relaxed sm:text-[22px] sm:leading-[35.75px]">
            {dict.contact.desc}
          </p>
          <ul className="mt-8 space-y-3">
            {CONTACT_LINKS.map(({ href, icon: Icon, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-ink hover:text-primary flex items-center gap-3 font-medium transition-colors"
                >
                  <span className="text-primary grid h-7 w-7 shrink-0 place-items-center">
                    <Icon className="h-4 w-4" />
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-4xl border border-black bg-white p-6 sm:p-8 md:min-h-[558px]">
          <h3 className="font-body mb-5 text-2xl leading-9 font-bold">{dict.contact.formTitle}</h3>

          {sent ? (
            <div
              ref={successRef}
              tabIndex={-1}
              role="status"
              className="bg-whatsapp/10 text-whatsapp-dark flex items-center gap-3 rounded-2xl p-4 outline-none"
            >
              <CheckCircle2 className="h-6 w-6 shrink-0" />
              <p className="font-semibold">{dict.contact.success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
              <Field
                id="name"
                label={dict.contact.name}
                error={errors.name && dict.contact.invalid}
              >
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder={dict.contact.namePlaceholder}
                  aria-invalid={!!errors.name}
                  aria-describedby={describedBy('name', errors.name)}
                  className={inputCls(!!errors.name)}
                  {...register('name')}
                />
              </Field>

              <Field
                id="phone"
                label={dict.contact.phone}
                error={errors.phone && dict.contact.invalid}
              >
                <div className="border-grey20 focus-within:border-primary flex overflow-hidden rounded-2xl border">
                  <span className="bg-grey10 text-grey90 grid place-items-center px-3 text-sm font-semibold">
                    +62
                  </span>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder={dict.contact.phonePlaceholder}
                    aria-invalid={!!errors.phone}
                    aria-describedby={describedBy('phone', errors.phone)}
                    className="w-full px-3 py-3 text-base outline-none"
                    {...register('phone')}
                  />
                </div>
              </Field>

              <Field
                id="message"
                label={dict.contact.message}
                error={errors.message && dict.contact.invalid}
              >
                <textarea
                  id="message"
                  rows={4}
                  placeholder={dict.contact.messagePlaceholder}
                  aria-invalid={!!errors.message}
                  aria-describedby={describedBy('message', errors.message)}
                  className={inputCls(!!errors.message)}
                  {...register('message')}
                />
              </Field>

              {failed && (
                <p role="alert" className="text-danger text-sm font-medium">
                  {dict.contact.error}
                </p>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary flex items-center justify-center gap-2 rounded-2xl px-8 py-3 font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-70"
                >
                  {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" />}
                  {dict.contact.submit}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
