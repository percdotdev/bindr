const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

export function formatGuideDate(iso: string): string {
  return DATE_FORMATTER.format(new Date(iso));
}
