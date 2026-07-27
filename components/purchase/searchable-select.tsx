'use client';

import { memo, useEffect, useMemo, useRef, useState } from 'react';

import { ChevronDown, Loader2, X } from 'lucide-react';

import { cn } from '@/lib/utils';

export type Option = { value: string; label: string; icon?: React.ReactNode };

type Props = {
  label: string;
  placeholder: string;
  value: string | null;
  options: Option[];
  onChange: (value: string) => void;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  errorText: string;
  retryText: string;
  emptyText: string;
  clearText: string;
  onRetry?: () => void;
  id: string;
  invalid?: boolean;
  invalidText?: string;
};

export const SearchableSelect = memo(function SearchableSelect({
  label,
  placeholder,
  value,
  options,
  onChange,
  disabled,
  loading,
  error,
  searchable,
  searchPlaceholder,
  errorText,
  retryText,
  emptyText,
  clearText,
  onRetry,
  id,
  invalid,
  invalidText,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selected = options.find((o) => o.value === value) ?? null;

  const filtered = useMemo(() => {
    if (!searchable || !query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query, searchable]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    if (searchable) requestAnimationFrame(() => searchRef.current?.focus());
    return () => document.removeEventListener('mousedown', onDown);
  }, [open, searchable]);

  useEffect(() => {
    if (!open) return;
    document.getElementById(`${id}-opt-${active}`)?.scrollIntoView({ block: 'nearest' });
  }, [active, open, id]);

  const closeAndReturnFocus = () => {
    setOpen(false);
    setQuery('');
    setActive(0);
    triggerRef.current?.focus();
  };

  const choose = (v: string) => {
    onChange(v);
    closeAndReturnFocus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') return closeAndReturnFocus();
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) return setOpen(true);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && filtered[active]) {
      e.preventDefault();
      choose(filtered[active].value);
    }
  };

  const listId = `${id}-listbox`;
  const activeOptionId = open && filtered[active] ? `${id}-opt-${active}` : undefined;

  return (
    <div ref={rootRef} className="relative">
      <label id={`${id}-label`} htmlFor={id} className="text-ink mb-1.5 block text-sm font-medium">
        {label} <span className="text-primary-strong">*</span>
      </label>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        disabled={disabled}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={searchable ? undefined : activeOptionId}
        aria-labelledby={`${id}-label ${id}`}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${id}-error` : undefined}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        className={cn(
          'flex w-full items-center justify-between gap-2 rounded-2xl border bg-white px-4 py-3 text-left text-sm transition-colors',
          disabled ? 'text-grey40 bg-grey10 cursor-not-allowed' : 'hover:border-grey40 text-ink',
          invalid ? 'border-danger' : 'border-grey20',
          open && !invalid && 'border-primary',
        )}
      >
        <span className={cn('flex items-center gap-2 truncate', !selected && 'text-grey60')}>
          {selected?.icon}
          {selected ? selected.label : placeholder}
        </span>
        {loading ? (
          <Loader2 className="text-grey40 h-4 w-4 shrink-0 animate-spin" />
        ) : (
          <ChevronDown
            className={cn(
              'text-grey60 h-4 w-4 shrink-0 transition-transform',
              open && 'rotate-180',
            )}
          />
        )}
      </button>
      {invalid && invalidText && (
        <p id={`${id}-error`} className="text-danger mt-1 text-xs font-medium">
          {label} {invalidText}.
        </p>
      )}

      {open && (
        <div className="border-grey20 absolute z-30 mt-2 max-h-72 w-full overflow-hidden rounded-2xl border bg-white shadow-xl">
          {searchable && (
            <div className="border-grey20 relative border-b p-2">
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                aria-controls={listId}
                aria-activedescendant={activeOptionId}
                className="focus:border-primary border-grey20 w-full rounded-xl border px-3 py-2 text-sm outline-none"
              />
              {query && (
                <button
                  type="button"
                  aria-label={clearText}
                  onClick={() => setQuery('')}
                  className="text-grey40 hover:text-ink absolute top-1/2 right-4 -translate-y-1/2"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          )}

          <ul
            id={listId}
            role="listbox"
            aria-label={label}
            className="max-h-56 overflow-y-auto p-1"
          >
            {error ? (
              <li className="text-grey90 flex flex-col items-center gap-2 p-4 text-sm">
                {errorText}
                {onRetry && (
                  <button
                    type="button"
                    onClick={onRetry}
                    className="text-primary-strong font-semibold hover:underline"
                  >
                    {retryText}
                  </button>
                )}
              </li>
            ) : loading ? (
              [0, 1, 2, 3].map((i) => (
                <li key={i} className="p-1">
                  <div className="shimmer h-9 rounded-xl" />
                </li>
              ))
            ) : filtered.length === 0 ? (
              <li className="text-grey90 p-4 text-center text-sm">{emptyText}</li>
            ) : (
              filtered.map((o, i) => (
                <li
                  key={o.value}
                  id={`${id}-opt-${i}`}
                  role="option"
                  aria-selected={o.value === value}
                  onClick={() => choose(o.value)}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    'flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors',
                    i === active ? 'bg-grey10' : 'hover:bg-grey10',
                    o.value === value && 'text-primary-strong font-semibold',
                  )}
                >
                  {o.icon}
                  <span className="truncate">{o.label}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
});
