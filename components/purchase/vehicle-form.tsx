'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Car, Loader2, Motorbike, Sparkles, Truck, Zap } from 'lucide-react';
import { z } from 'zod';

import { Field, describedBy, inputCls } from '@/components/form-field';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import {
  type PremiumResult,
  useBrands,
  useModels,
  usePremium,
  useRegions,
  useVehicleTypes,
} from '@/lib/purchase/queries';
import { cn } from '@/lib/utils';

import { PremiumModal } from './premium-modal';
import { type Option, SearchableSelect } from './searchable-select';

const YEARS = Array.from({ length: 2026 - 2005 + 1 }, (_, i) => 2026 - i);

const TYPE_ICON: Record<string, React.ReactNode> = {
  car: <Car className="h-4 w-4" />,
  motorcycle: <Motorbike className="h-4 w-4" />,
  pickup: <Truck className="h-4 w-4" />,
  truck: <Truck className="h-4 w-4" />,
  ev: <Zap className="h-4 w-4" />,
};

const schema = z.object({
  category: z.string().min(1),
  brand: z.string().min(1),
  year: z.string().min(1),
  model: z.string().min(1),
  areaCode: z.string().min(1),
  name: z.string().min(2),
  phone: z.string().regex(/^8\d{7,13}$/),
  email: z.string().email(),
});
type FormValues = z.infer<typeof schema>;

export function VehicleForm({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const router = useRouter();
  const t = dict.purchase;
  const [result, setResult] = useState<PremiumResult | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: 'onSubmit' });

  const category = useWatch({ control, name: 'category' });
  const brand = useWatch({ control, name: 'brand' });
  const year = useWatch({ control, name: 'year' });
  const model = useWatch({ control, name: 'model' });
  const areaCode = useWatch({ control, name: 'areaCode' });

  const typesQ = useVehicleTypes();
  const regionsQ = useRegions();
  const activeType = typesQ.data?.find((v) => v.key === category) ?? null;
  const brandsQ = useBrands(activeType?.wheelerType ?? null);
  const modelsQ = useModels(brand || null, year ? Number(year) : null, '');
  const premium = usePremium();

  const typeOptions = useMemo<Option[]>(
    () =>
      (typesQ.data ?? []).map((v) => ({
        value: v.key,
        label: t.types[v.key as keyof typeof t.types] ?? v.key,
        icon: TYPE_ICON[v.key],
      })),
    [typesQ.data, t],
  );
  const brandOptions = useMemo<Option[]>(
    () => (brandsQ.data ?? []).map((b) => ({ value: b.id, label: b.name })),
    [brandsQ.data],
  );
  const yearOptions = useMemo<Option[]>(
    () => YEARS.map((y) => ({ value: String(y), label: String(y) })),
    [],
  );
  const modelOptions = useMemo<Option[]>(
    () => (modelsQ.data ?? []).map((m) => ({ value: m.id, label: m.modelName })),
    [modelsQ.data],
  );
  const regionOptions = useMemo<Option[]>(
    () => (regionsQ.data ?? []).map((r) => ({ value: r.code, label: r.code })),
    [regionsQ.data],
  );

  const onModel = useCallback(
    (v: string) => setValue('model', v, { shouldDirty: true }),
    [setValue],
  );
  const onArea = useCallback(
    (v: string) => setValue('areaCode', v, { shouldDirty: true }),
    [setValue],
  );
  const onCategory = useCallback(
    (v: string) => {
      setValue('category', v);
      setValue('brand', '');
      setValue('model', '');
    },
    [setValue],
  );
  const onBrand = useCallback(
    (v: string) => {
      setValue('brand', v);
      setValue('model', '');
    },
    [setValue],
  );
  const onYear = useCallback(
    (v: string) => {
      setValue('year', v);
      setValue('model', '');
    },
    [setValue],
  );

  const onSubmit = (vals: FormValues) => {
    if (!activeType) return;
    premium.mutate(
      {
        wheelerType: activeType.wheelerType,
        isEV: activeType.isEV,
        brandId: vals.brand,
        vehicleId: vals.model,
        year: Number(vals.year),
        areaCode: vals.areaCode,
        name: vals.name,
        phone: vals.phone,
        email: vals.email,
      },
      { onSuccess: setResult },
    );
  };

  const selects = {
    errorText: t.loadError,
    retryText: t.retry,
    emptyText: t.empty,
    clearText: dict.common.clearSearch,
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2">
        <SearchableSelect
          id="category"
          label={t.category}
          invalid={!!errors.category}
          invalidText={t.required}
          placeholder={t.select}
          value={category ?? null}
          options={typeOptions}
          onChange={onCategory}
          loading={typesQ.isLoading}
          error={typesQ.isError}
          onRetry={typesQ.refetch}
          {...selects}
        />
        <SearchableSelect
          id="brand"
          label={t.brand}
          invalid={!!errors.brand}
          invalidText={t.required}
          placeholder={t.select}
          value={brand ?? null}
          options={brandOptions}
          onChange={onBrand}
          disabled={!activeType}
          loading={brandsQ.isLoading}
          error={brandsQ.isError}
          onRetry={brandsQ.refetch}
          searchable
          searchPlaceholder={t.search}
          {...selects}
        />
        <SearchableSelect
          id="year"
          label={t.year}
          invalid={!!errors.year}
          invalidText={t.required}
          placeholder={t.select}
          value={year ?? null}
          options={yearOptions}
          onChange={onYear}
          searchable
          searchPlaceholder={t.search}
          {...selects}
        />
        <SearchableSelect
          id="model"
          label={t.model}
          invalid={!!errors.model}
          invalidText={t.required}
          placeholder={t.select}
          value={model ?? null}
          options={modelOptions}
          onChange={onModel}
          disabled={!brand || !year}
          loading={modelsQ.isLoading}
          error={modelsQ.isError}
          onRetry={modelsQ.refetch}
          searchable
          searchPlaceholder={t.search}
          {...selects}
        />
        <SearchableSelect
          id="areaCode"
          label={t.areaCode}
          invalid={!!errors.areaCode}
          invalidText={t.required}
          placeholder={t.select}
          value={areaCode ?? null}
          options={regionOptions}
          onChange={onArea}
          loading={regionsQ.isLoading}
          error={regionsQ.isError}
          onRetry={regionsQ.refetch}
          searchable
          searchPlaceholder={t.search}
          {...selects}
        />

        <Field id="name" label={t.name} error={errors.name && t.required}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder={t.namePlaceholder}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy('name', errors.name)}
            className={inputCls(!!errors.name)}
            {...register('name')}
          />
        </Field>

        <Field id="phone" label={t.phone} error={errors.phone && t.invalid}>
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
              id="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder={t.phonePlaceholder}
              aria-invalid={!!errors.phone}
              aria-describedby={describedBy('phone', errors.phone)}
              className="w-full px-3 py-3 text-base outline-none"
              {...register('phone')}
            />
          </div>
        </Field>

        <Field id="email" label={t.email} error={errors.email && t.invalid}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder={t.emailPlaceholder}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy('email', errors.email)}
            className={inputCls(!!errors.email)}
            {...register('email')}
          />
        </Field>

        <div className="sm:col-span-2">
          {premium.isError && (
            <p role="alert" className="text-danger mb-3 text-sm font-medium">
              {t.notSaved}
            </p>
          )}
          <button
            type="submit"
            disabled={premium.isPending}
            className="bg-primary hover:bg-primary-light flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-4 font-semibold text-white transition-colors disabled:opacity-70"
          >
            {premium.isPending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" /> {t.calculating}
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" /> {t.calculate}
              </>
            )}
          </button>
        </div>
      </form>

      {result && (
        <PremiumModal
          result={result}
          dict={dict}
          onClose={() => setResult(null)}
          onContinue={() =>
            router.push(`/${locale}/purchase/insurance-list?q=${result.quotationId}`)
          }
        />
      )}
    </>
  );
}
