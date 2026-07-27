'use client';

import { useEffect, useRef, useState } from 'react';

import { ExternalLink, Loader2, MapPin, Phone, Search, X } from 'lucide-react';

import { Dialog } from '@/components/dialog';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { type Plan, useWorkshops } from '@/lib/purchase/insurance-queries';
import { cn } from '@/lib/utils';

const FILTERS = [
  { value: 'all', key: 'filterAll' },
  { value: 'AUTHORIZED', key: 'filterAuthorized' },
  { value: 'NON_AUTHORIZED', key: 'filterNonAuthorized' },
] as const;

export function WorkshopDialog({
  plan,
  dict,
  onClose,
}: {
  plan: Plan;
  dict: Dictionary;
  onClose: () => void;
}) {
  const t = dict.insuranceList;
  const [rawSearch, setRawSearch] = useState('');
  const [search, setSearch] = useState('');
  const [type, setType] = useState<string>('all');

  useEffect(() => {
    const id = setTimeout(() => setSearch(rawSearch), 300);
    return () => clearTimeout(id);
  }, [rawSearch]);

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useWorkshops(
    search,
    type,
  );

  const rows = data?.pages.flatMap((p) => p.data) ?? [];
  const networkTotal = data?.pages[0]?.networkTotal ?? 0;

  const scrollRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasNextPage) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { root: scrollRef.current, rootMargin: '200px' },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, [hasNextPage, fetchNextPage, rows.length]);

  return (
    <Dialog
      labelledBy="workshop-title"
      onClose={onClose}
      panelClassName="flex max-h-[85vh] max-w-3xl flex-col"
    >
      <div className="border-grey20 flex items-start justify-between gap-4 border-b p-4 sm:p-6">
        <div>
          <h2 id="workshop-title" className="font-display text-xl font-semibold text-black">
            {t.workshopTitle} · {plan.name}
          </h2>
          <p className="text-grey60 mt-1 text-sm">
            {networkTotal.toLocaleString('id-ID')}+ {t.workshopSubtitle}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t.close}
          className="text-grey40 hover:text-ink shrink-0"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="border-grey20 flex flex-col gap-3 border-b p-4 sm:flex-row sm:p-6">
        <div className="relative flex-1">
          <Search className="text-grey40 absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
          <input
            type="search"
            value={rawSearch}
            onChange={(e) => setRawSearch(e.target.value)}
            placeholder={t.workshopSearch}
            aria-label={t.workshopSearch}
            className="border-grey20 focus:border-primary w-full rounded-2xl border py-3 pr-4 pl-11 text-base transition-colors outline-none"
          />
        </div>
        <div role="group" aria-label={t.workshopTitle} className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              aria-pressed={type === f.value}
              onClick={() => setType(f.value)}
              className={cn(
                'rounded-2xl border px-4 py-2.5 text-sm font-medium transition-colors',
                type === f.value
                  ? 'border-primary bg-primary text-white'
                  : 'border-grey20 text-grey90 hover:border-grey40',
              )}
            >
              {t[f.key]}
            </button>
          ))}
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6">
        {isLoading ? (
          <ul className="grid gap-3 sm:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <li key={i} className="shimmer h-28 rounded-2xl" />
            ))}
          </ul>
        ) : isError ? (
          <p className="text-danger py-6 text-center text-sm">{dict.purchase.loadError}</p>
        ) : rows.length === 0 ? (
          <p className="text-grey90 py-6 text-center text-sm">{t.workshopEmpty}</p>
        ) : (
          <>
            <ul className="grid gap-3 sm:grid-cols-2">
              {rows.map((w) => (
                <li key={w.id} className="border-grey20 rounded-2xl border p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-ink font-semibold">{w.name}</p>
                    <span
                      className={cn(
                        'shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap',
                        w.type === 'AUTHORIZED'
                          ? 'border-whatsapp-dark text-whatsapp-dark'
                          : 'border-grey40 text-grey90',
                      )}
                    >
                      {w.type === 'AUTHORIZED' ? t.filterAuthorized : t.filterNonAuthorized}
                    </span>
                  </div>
                  <p className="text-grey90 mt-1 flex items-start gap-1.5 text-xs">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>
                      {w.address}
                      {w.city ? `, ${w.city}` : ''}
                    </span>
                  </p>
                  {w.phone && (
                    <a
                      href={`tel:${w.phone}`}
                      className="text-grey90 hover:text-primary mt-1 flex items-center gap-1.5 text-xs transition-colors"
                    >
                      <Phone className="h-3.5 w-3.5" /> {w.phone}
                    </a>
                  )}
                  {w.gmaps && (
                    <a
                      href={w.gmaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-strong mt-2 inline-flex items-center gap-1 text-xs font-semibold hover:underline"
                    >
                      Google Maps <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </li>
              ))}
            </ul>

            <div ref={sentinelRef} role="status" className="py-5 text-center">
              {isFetchingNextPage ? (
                <span className="text-grey60 inline-flex items-center gap-2 text-sm">
                  <Loader2 className="h-4 w-4 animate-spin" /> {t.loading}
                </span>
              ) : (
                !hasNextPage && <span className="text-grey60 text-sm">{t.workshopEnd}</span>
              )}
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
}
