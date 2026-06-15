export function buildCrosshairShareUrl(
  shareCode: string,
  pathname = '/crosshair'
): string {
  const url = new URL(pathname, window.location.origin);
  url.searchParams.set('code', shareCode);
  return url.toString();
}
