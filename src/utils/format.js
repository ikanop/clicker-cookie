// src/utils/format.js

export function formatNumber(num, noDecimals = false) {
  if (typeof num !== 'number' || isNaN(num)) return '0';
  if (num === 0) return '0';

  if (num < 1_000_000) {
    return noDecimals
      ? Math.floor(num).toLocaleString()
      : Number(num.toFixed(1).replace(/\.0$/, '')).toLocaleString();
  }

  const units = ["M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc", "Ud", "Dd", "Td", "Qad", "Qid"];
  let scaled = num / 1_000_000;
  let unitIndex = 0;

  while (scaled >= 1000 && unitIndex < units.length - 1) {
    scaled /= 1000;
    unitIndex++;
  }

  // No decimals for prices or when explicitly requested
  if (noDecimals) {
    return Math.floor(scaled) + units[unitIndex];
  }

  // Scaled numbers with up to 3 decimals, strip unnecessary zeros
  return Number(scaled.toFixed(3).replace(/\.?0+$/, '')) + units[unitIndex];
}