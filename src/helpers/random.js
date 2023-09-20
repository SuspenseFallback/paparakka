export default function randint(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
