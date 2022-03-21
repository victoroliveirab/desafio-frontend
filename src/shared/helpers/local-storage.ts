export const PREFIX = `pt-tech-`;

export function persistItem(key: string, item: unknown) {
  localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(item));
}

export function retrieveItem<T>(key: string, defaultValue: T) {
  const item = localStorage.getItem(`${PREFIX}${key}`);
  if (!item) return defaultValue;
  return <T>JSON.parse(item);
}
