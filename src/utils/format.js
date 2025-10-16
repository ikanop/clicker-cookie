// src/utils/format.js

export function formatNumber(num) {
  if (typeof num !== 'number' || isNaN(num)) return '0';
  if (num === 0) return '0';

  if (num < 10) return (Math.round(num * 10) / 10).toFixed(1); // small numbers <10
  if (num < 1000) return Math.floor(num).toString();            // 10–999 → whole numbers

  // >=1000 → scale with K/M/B...
  const units = ["K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc", "Ud", "Dd", "Td", "Qad", "Qid"];
  let scaled = num;
  let unitIndex = -1;

  while (scaled >= 1000 && unitIndex < units.length - 1) {
    scaled /= 1000;
    unitIndex++;
  }

  return (Math.round(scaled * 10) / 10).toFixed(1).replace(/\.0$/, '') + units[unitIndex];
}

export function formatAutoclicker(num) {
  if (typeof num !== 'number' || isNaN(num)) return '0';
  if (num === 0) return '0';

  if (num < 100) return (Math.round(num * 10) / 10).toFixed(1); // numbers <100 → 1 decimal
  if (num < 1000) return Math.floor(num).toLocaleString();      // 100–999 → integer with commas

  // >=1000 → scale like formatNumber
  const units = ["K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc", "Ud", "Dd", "Td", "Qad", "Qid"];
  let scaled = num;
  let unitIndex = -1;

  while (scaled >= 1000 && unitIndex < units.length - 1) {
    scaled /= 1000;
    unitIndex++;
  }

  return (Math.round(scaled * 10) / 10).toFixed(1).replace(/\.0$/, '') + units[unitIndex];
}