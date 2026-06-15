import type { BindEntry } from '@workspace/cs2/binds/model/types';

export function formatBindLine({ key, command }: BindEntry): string {
  return `bind "${key}" "${command}"`;
}

export function formatBindLines(binds: BindEntry[]): string {
  return binds.map(formatBindLine).join('\n');
}
