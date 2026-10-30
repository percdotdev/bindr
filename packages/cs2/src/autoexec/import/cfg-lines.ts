const QUOTE = '"';

/** Drops `//` comments that sit outside quotes. */
export function stripCfgComment(line: string): string {
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === QUOTE) {
      quoted = !quoted;
      continue;
    }

    if (!quoted && char === '/' && line[index + 1] === '/') {
      return line.slice(0, index);
    }
  }

  return line;
}

/** Splits a cfg line on `;` that sit outside quotes. */
export function splitCfgStatements(line: string): string[] {
  const statements: string[] = [];
  let quoted = false;
  let start = 0;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === QUOTE) {
      quoted = !quoted;
      continue;
    }

    if (!quoted && char === ';') {
      statements.push(line.slice(start, index));
      start = index + 1;
    }
  }

  statements.push(line.slice(start));
  return statements;
}

/** Words of one statement. Quoted tokens keep their inner spaces. */
export function tokenizeCfgStatement(statement: string): string[] {
  const tokens: string[] = [];
  let index = 0;

  while (index < statement.length) {
    while (index < statement.length && isCfgSpace(statement[index] ?? '')) {
      index += 1;
    }

    if (index >= statement.length) {
      break;
    }

    if (statement[index] === QUOTE) {
      index += 1;
      let value = '';
      while (index < statement.length && statement[index] !== QUOTE) {
        value += statement[index];
        index += 1;
      }
      if (statement[index] === QUOTE) {
        index += 1;
      }
      tokens.push(value);
      continue;
    }

    let value = '';
    while (index < statement.length && !isCfgSpace(statement[index] ?? '')) {
      value += statement[index];
      index += 1;
    }
    tokens.push(value);
  }

  return tokens;
}

function isCfgSpace(char: string): boolean {
  return char === ' ' || char === '\t';
}
