export function formatNumber(number) {
  if (number <= 1000) return number;
  const num = number / 1000;
  return num.toFixed(1) + "K";
}
