export function cx(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
