export default function convertTocurrency(amount: number, factor = 100) {
  return Math.round(amount * factor);
}
