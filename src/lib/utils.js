export function formatNumber(number) {
  if (number <= 1000) return number;
  const num = number / 1000;
  return num.toFixed(1) + "K";
}

export function transformPlainTextToLink(text) {
  const regex = /(?:r|u)\/(\w+)/g;

  var transformedText = text.replace(regex, '<a href="$&">$&</a>');

  return transformedText;
}
