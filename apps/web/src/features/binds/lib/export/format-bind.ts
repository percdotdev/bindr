import type { BindEntry } from '@/features/binds/lib/model/types';

export function formatBindLine({ key, command }: BindEntry): string {
  return `bind "${key}" "${command}"`;
}

export function formatBindLines(binds: BindEntry[]): string {
  return binds.map(formatBindLine).join('\n');
}
