'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { ChevronDown, Menu, X } from 'lucide-react';

import { PRODUCTS, SITE } from '@/lib/content';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { cn } from '@/lib/utils';

import { BrandLogo } from './brand-logo';
import { LanguageToggle } from './language-toggle';

function NavUnderline({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'from-primary-light absolute bottom-0 left-1/2 h-0.75 -translate-x-1/2 bg-linear-to-r to-[#ff5722] transition-all duration-300',
        active ? 'w-full' : 'w-0 group-hover:w-full',
      )}
    />
  );
}

function NavLink({
  href,
  active,
  children,
  delay,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
  delay?: string;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      style={delay ? { animationDelay: delay } : undefined}
      className={cn(
        'anim-nav group relative flex items-center px-4 font-medium transition-colors',
        active ? 'text-primary-strong' : 'text-ink hover:text-primary',
      )}
    >
      {children}
      <NavUnderline active={active} />
    </Link>
  );
}

export function SiteHeader({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const p = (path: string) => `/${locale}${path}`;
  const isActive = (path: string) => pathname === p(path) || pathname.startsWith(`${p(path)}/`);

  const canHover = () =>
    typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const hoverOpen = () => {
    if (!canHover()) return;
    cancelClose();
    setProductsOpen(true);
  };

  const hoverClose = () => {
    if (!canHover()) return;
    cancelClose();
    closeTimer.current = setTimeout(() => setProductsOpen(false), 180);
  };

  useEffect(() => cancelClose, []);

  useEffect(() => {
    if (!productsOpen && !mobileOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!productsRef.current?.contains(e.target as Node)) setProductsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setProductsOpen(false);
      setMobileOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [productsOpen, mobileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-[68px] max-w-7xl items-center justify-between gap-4 px-4 md:min-h-[90px]">
        <Link href={p('')} aria-label="Bang Jamin" className="anim-logo shrink-0">
          <BrandLogo className="h-7 md:h-9" priority />
        </Link>

        <nav
          className="hidden items-stretch gap-6 self-stretch lg:flex"
          aria-label={dict.common.navMain}
        >
          <div
            className="anim-nav relative flex"
            style={{ animationDelay: '100ms' }}
            ref={productsRef}
            onMouseEnter={hoverOpen}
            onMouseLeave={hoverClose}
          >
            <button
              type="button"
              aria-expanded={productsOpen}
              onClick={() => setProductsOpen((o) => !o)}
              className={cn(
                'group relative flex items-center gap-1 px-4 font-medium transition-colors',
                isActive('/purchase') ? 'text-primary-strong' : 'text-ink hover:text-primary',
              )}
            >
              {dict.nav.produk}
              <ChevronDown
                className={cn('h-4 w-4 transition-transform', productsOpen && 'rotate-180')}
              />
              <NavUnderline active={isActive('/purchase')} />
            </button>
            {productsOpen && (
              <div className="border-grey20 absolute top-full left-0 mt-2 w-60 overflow-hidden rounded-2xl border bg-white p-2 shadow-xl">
                {PRODUCTS.map((prod) => {
                  const label = dict.products[prod.key];
                  const status =
                    prod.status === 'available' ? dict.status.available : dict.status.comingSoon;
                  const inner = (
                    <span className="flex w-full items-center gap-3">
                      <span aria-hidden className="text-xl">
                        {prod.emoji}
                      </span>
                      <span className="flex flex-col text-left">
                        <span className="text-ink font-semibold">{label}</span>
                        <span
                          className={cn(
                            'text-xs',
                            prod.status === 'available' ? 'text-whatsapp-dark' : 'text-grey60',
                          )}
                        >
                          {status}
                        </span>
                      </span>
                    </span>
                  );
                  return prod.href ? (
                    <Link
                      key={prod.key}
                      href={p(prod.href)}
                      onClick={() => setProductsOpen(false)}
                      className="hover:bg-grey10 block rounded-xl p-3 transition-colors"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <span
                      key={prod.key}
                      className="block cursor-not-allowed rounded-xl p-3 opacity-60"
                    >
                      {inner}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          <NavLink href={p('/about')} active={isActive('/about')} delay="200ms">
            {dict.nav.tentang}
          </NavLink>
          <NavLink href={p('/claim')} active={isActive('/claim')} delay="300ms">
            {dict.nav.klaim}
          </NavLink>

          <LanguageToggle locale={locale} label={dict.common.langLabel} className="self-center" />

          <a
            href={`${SITE.origin}/partner`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ animationDelay: '400ms' }}
            className="anim-nav border-primary text-primary-strong self-center rounded-2xl border px-3.5 py-3 text-base font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,121,68,0.3)]"
          >
            {dict.nav.sahabat}
            <span className="sr-only"> {dict.common.opensExternal}</span>
          </a>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle locale={locale} label={dict.common.langLabel} />
          <button
            type="button"
            aria-label={dict.common.menu}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="border-grey20 text-ink grid h-11 w-11 place-items-center rounded-xl border"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="border-grey20 border-t bg-white px-4 py-3 lg:hidden"
          aria-label={dict.common.navMainMobile}
        >
          <p className="text-grey60 px-2 pt-2 pb-1 text-xs font-bold tracking-wide uppercase">
            {dict.nav.produk}
          </p>
          {PRODUCTS.map((prod) => {
            const label = dict.products[prod.key];
            const status =
              prod.status === 'available' ? dict.status.available : dict.status.comingSoon;
            const row = (
              <span className="flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <span aria-hidden className="text-xl">
                    {prod.emoji}
                  </span>
                  <span className="text-ink font-semibold">{label}</span>
                </span>
                <span
                  className={cn(
                    'text-xs',
                    prod.status === 'available' ? 'text-whatsapp-dark' : 'text-grey60',
                  )}
                >
                  {status}
                </span>
              </span>
            );
            return prod.href ? (
              <Link
                key={prod.key}
                href={p(prod.href)}
                onClick={() => setMobileOpen(false)}
                className="hover:bg-grey10 block rounded-xl p-3"
              >
                {row}
              </Link>
            ) : (
              <span key={prod.key} className="block rounded-xl p-3 opacity-60">
                {row}
              </span>
            );
          })}
          <div className="border-grey20 mt-2 border-t pt-2">
            <Link
              href={p('/about')}
              onClick={() => setMobileOpen(false)}
              className="text-ink hover:bg-grey10 block rounded-xl p-3 font-semibold"
            >
              {dict.nav.tentang}
            </Link>
            <Link
              href={p('/claim')}
              onClick={() => setMobileOpen(false)}
              className="text-ink hover:bg-grey10 block rounded-xl p-3 font-semibold"
            >
              {dict.nav.klaim}
            </Link>
            <a
              href={`${SITE.origin}/partner`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="bg-primary mt-2 block rounded-2xl p-3 text-center font-semibold text-white"
            >
              {dict.nav.sahabat}
              <span className="sr-only"> {dict.common.opensExternal}</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
