import { cn } from '@/lib/utils';

export function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string | false;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-ink mb-1.5 block text-sm font-medium">
        {label} <span className="text-primary-strong">*</span>
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-danger mt-1 text-xs font-medium">
          {label} {error}.
        </p>
      )}
    </div>
  );
}

export const describedBy = (id: string, error: unknown) => (error ? `${id}-error` : undefined);

export const inputCls = (invalid: boolean) =>
  cn(
    'w-full rounded-2xl border px-4 py-3 text-base outline-none transition-colors',
    invalid ? 'border-danger focus:border-danger' : 'border-grey20 focus:border-primary',
  );
