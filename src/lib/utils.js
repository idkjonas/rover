export function formatNumber(number) {
  if (number <= 1000) return number;
  else if (number <= 1000000) {
    const num = number / 1000;
    return num.toFixed(1) + "K";
  } else {
    const num = number / 1000000;
    return num.toFixed(1) + "M";
  }
}

/* to be fixed and properly implemented
export function transformPlainTextToLink(text) {
  const regex = /(?:r|u)\/(\w+)/g;
  var transformedText = text.replace(regex, '<a href="$&">$&</a>');
  return transformedText;
} */
