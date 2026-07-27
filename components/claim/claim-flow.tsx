'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, ArrowLeft, ChevronRight, Loader2 } from 'lucide-react';
import { z } from 'zod';

import { Field, describedBy, inputCls } from '@/components/form-field';
import { PRODUCTS, type ProductKey, SITE } from '@/lib/content';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { cn } from '@/lib/utils';

const ICON: Record<ProductKey, string> = {
  kendaraan: '/brand/claim/motor-vehicle.webp',
  hewan: '/brand/claim/pet.webp',
  kesehatan: '/brand/claim/health.webp',
  perjalanan: '/brand/claim/travel.webp',
};

const schema = z.object({
  policyNumber: z.string().min(4),
  incidentDate: z
    .string()
    .min(1)
    .refine((d) => new Date(d) <= new Date(), { message: 'future' }),
  description: z.string().min(10),
  name: z.string().min(2),
  phone: z.string().regex(/^8\d{7,13}$/),
  email: z.string().email(),
});
type ClaimForm = z.infer<typeof schema>;

export function ClaimFlow({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.claim;
  const router = useRouter();
  const [product, setProduct] = useState<ProductKey | null>(null);
  const [result, setResult] = useState<'notFound' | 'error' | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimForm>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: ClaimForm) => {
    setResult(null);
    const res = await fetch('/api/claim', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...values, product }),
    }).catch(() => null);
    if (!res) return setResult('error');
    setResult(res.status === 404 ? 'notFound' : 'error');
  };

  if (!product) {
    return (
      <>
        <StepHeader
          title={t.stepProduct}
          step="1/2"
          backLabel={dict.common.back}
          onBack={() => router.push(`/${locale}`)}
        />
        <p className="mt-2 text-sm leading-5.25 font-bold text-black md:mt-8 md:text-base md:leading-6">
          {t.prompt}
        </p>
        <ul className="mt-3 grid gap-4 sm:grid-cols-2 md:mt-4">
          {PRODUCTS.map((p) => {
            const disabled = p.status !== 'available';
            const label = t.products[p.key];
            return (
              <li key={p.key}>
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => setProduct(p.key)}
                  className={cn(
                    'flex w-full items-center gap-4 rounded-2xl bg-white p-4 text-left transition-all duration-300',
                    disabled
                      ? 'cursor-not-allowed opacity-40'
                      : 'cursor-pointer hover:shadow-[0_12px_24px_rgba(0,0,0,0.10)]',
                  )}
                >
                  <Image
                    src={ICON[p.key]}
                    alt=""
                    width={70}
                    height={70}
                    className="h-[70px] w-[70px] shrink-0"
                  />
                  <span className="flex flex-1 flex-col">
                    <span className="text-ink font-medium">{label}</span>
                    {disabled && (
                      <span className="text-magenta text-sm">{dict.status.comingSoon}</span>
                    )}
                  </span>
                  <ChevronRight className="text-grey40 h-6 w-6 shrink-0" />
                </button>
              </li>
            );
          })}
        </ul>
      </>
    );
  }

  return (
    <>
      <StepHeader
        title={t.stepForm}
        step="2/2"
        backLabel={t.changeProduct}
        onBack={() => setProduct(null)}
      />
      <button
        type="button"
        onClick={() => setProduct(null)}
        className="text-primary-strong mt-1 inline-flex items-center gap-1.5 py-2 text-sm font-semibold hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> {t.changeProduct}
      </button>

      <div className="border-ink mt-5 rounded-4xl border bg-white p-4 sm:p-8">
        <div className="border-grey20 flex items-center gap-3 border-b pb-4 sm:pb-6">
          <Image src={ICON[product]} alt="" width={44} height={44} className="h-11 w-11" />
          <span className="text-ink font-medium">{t.products[product]}</span>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-6 grid gap-5 sm:grid-cols-2"
        >
          <Field id="policyNumber" label={t.policyNumber} error={errors.policyNumber && t.required}>
            <input
              id="policyNumber"
              type="text"
              placeholder={t.policyPlaceholder}
              aria-invalid={!!errors.policyNumber}
              aria-describedby={describedBy('policyNumber', errors.policyNumber)}
              className={inputCls(!!errors.policyNumber)}
              {...register('policyNumber')}
            />
          </Field>

          <Field
            id="incidentDate"
            label={t.incidentDate}
            error={
              errors.incidentDate &&
              (errors.incidentDate.message === 'future' ? t.futureDate : t.required)
            }
          >
            <input
              id="incidentDate"
              type="date"
              max={new Date().toISOString().slice(0, 10)}
              aria-invalid={!!errors.incidentDate}
              aria-describedby={describedBy('incidentDate', errors.incidentDate)}
              className={inputCls(!!errors.incidentDate)}
              {...register('incidentDate')}
            />
          </Field>

          <div className="sm:col-span-2">
            <Field id="description" label={t.description} error={errors.description && t.required}>
              <textarea
                id="description"
                rows={4}
                placeholder={t.descriptionPlaceholder}
                aria-invalid={!!errors.description}
                aria-describedby={describedBy('description', errors.description)}
                className={inputCls(!!errors.description)}
                {...register('description')}
              />
            </Field>
          </div>

          <Field id="claimName" label={t.name} error={errors.name && t.required}>
            <input
              id="claimName"
              type="text"
              autoComplete="name"
              placeholder={t.namePlaceholder}
              aria-invalid={!!errors.name}
              aria-describedby={describedBy('claimName', errors.name)}
              className={inputCls(!!errors.name)}
              {...register('name')}
            />
          </Field>

          <Field id="claimPhone" label={t.phone} error={errors.phone && t.invalid}>
            <div
              className={cn(
                'focus-within:border-primary flex overflow-hidden rounded-2xl border',
                errors.phone ? 'border-danger' : 'border-grey20',
              )}
            >
              <span className="bg-grey10 text-grey90 grid place-items-center px-3 text-sm font-semibold">
                +62
              </span>
              <input
                id="claimPhone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder={t.phonePlaceholder}
                aria-invalid={!!errors.phone}
                aria-describedby={describedBy('claimPhone', errors.phone)}
                className="w-full px-3 py-3 text-base outline-none"
                {...register('phone')}
              />
            </div>
          </Field>

          <div className="sm:col-span-2">
            <Field id="claimEmail" label={t.email} error={errors.email && t.invalid}>
              <input
                id="claimEmail"
                type="email"
                autoComplete="email"
                placeholder={t.emailPlaceholder}
                aria-invalid={!!errors.email}
                aria-describedby={describedBy('claimEmail', errors.email)}
                className={inputCls(!!errors.email)}
                {...register('email')}
              />
            </Field>
          </div>

          <div className="sm:col-span-2">
            {result === 'notFound' && (
              <div
                role="alert"
                className="border-danger/40 bg-danger/5 mb-4 flex gap-3 rounded-2xl border p-4"
              >
                <AlertCircle className="text-danger mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="text-danger font-semibold">{t.notFoundTitle}</p>
                  <p className="text-grey90 mt-1 text-sm">{t.notFoundBody}</p>
                  <a
                    href={SITE.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-strong mt-2 inline-block text-sm font-semibold hover:underline"
                  >
                    {t.notFoundHelp}
                  </a>
                </div>
              </div>
            )}
            {result === 'error' && (
              <p role="alert" className="text-danger mb-3 text-sm font-medium">
                {dict.purchase.loadError}
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary-light flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-4 font-semibold text-white transition-colors disabled:opacity-70"
            >
              {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" />}
              {isSubmitting ? t.submitting : t.submit}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

function StepHeader({
  title,
  step,
  onBack,
  backLabel,
}: {
  title: string;
  step: string;
  onBack: () => void;
  backLabel: string;
}) {
  return (
    <div className="sticky top-0 z-30 -mx-4 flex h-16 items-center justify-between bg-white px-4 md:static md:h-auto md:bg-transparent md:px-0">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onBack}
          aria-label={backLabel}
          className="hover:text-primary text-black transition-colors md:hidden"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-base leading-6 font-bold text-black md:text-lg md:leading-6.75">
          {title}
        </h1>
      </div>
      <span className="bg-grey20 text-grey90 rounded-full px-3.5 py-1.5 text-sm leading-5.25 font-bold">
        {step}
      </span>
    </div>
  );
}
