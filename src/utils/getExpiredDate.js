export default function getExpiredDate() {
  return new Date(new Date().getTime() + 5 * 60 * 1000);
}
