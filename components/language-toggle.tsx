'use client';

import { usePathname, useRouter } from 'next/navigation';

import { type Locale, locales } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';

export function LanguageToggle({
  locale,
  label,
  className,
}: {
  locale: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    const segments = pathname.split('/');
    segments[1] = next;
    router.push(segments.join('/') || `/${next}`);
  };

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        'border-grey20 inline-flex items-center rounded-full border bg-white p-0.5 text-sm font-semibold',
        className,
      )}
    >
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-pressed={l === locale}
          className={cn(
            'flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 uppercase transition-colors',
            l === locale ? 'bg-primary text-white' : 'text-grey60 hover:text-ink',
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
