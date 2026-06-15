export function getDecimalPlaces(step: number) {
  const stepText = step.toString();
  const decimalIndex = stepText.indexOf('.');

  return decimalIndex === -1 ? 0 : stepText.length - decimalIndex - 1;
}

export function formatControlValue(value: number, step: number) {
  return value.toFixed(getDecimalPlaces(step));
}

export function snapToStep(
  value: number,
  min: number,
  max: number,
  step: number
): number {
  const clamped = Math.min(max, Math.max(min, value));
  const stepped = Math.round(clamped / step) * step;

  return Number(stepped.toFixed(getDecimalPlaces(step)));
}
