export function formatNumber(num) {
  if (typeof num !== 'number' || isNaN(num)) return '0';

  if (num === 0) return (num).toFixed(0);
  if (num < 10) return (num).toFixed(1);
  if (num < 1000) return (num);

  const units = ["K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc", "Ud", "Dd", "Td", "Qad", "Qid"];
  let scaled = num;
  let unitIndex = -1;

  while (scaled >= 1000 && unitIndex < units.length - 1) {
    scaled /= 1000;
    unitIndex++;
  }

  return scaled.toFixed(1).replace(/\.0$/, '') + units[unitIndex];
}

export function formatAutoclicker(num) {
  if (typeof num !== 'number' || isNaN(num)) return '0';
  if (num === 0) return '0';

  if (num < 100) {
    return num.toFixed(1);
  }

  return formatNumber(num).toLocaleString();
}