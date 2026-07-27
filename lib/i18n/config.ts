export const locales = ['id', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'id';

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);
