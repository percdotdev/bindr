const FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};

export function formatGuideDate(iso: string, locale = 'en'): string {
  return new Intl.DateTimeFormat(locale, FORMAT_OPTIONS).format(new Date(iso));
}
