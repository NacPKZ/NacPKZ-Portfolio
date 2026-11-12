export function normalizeSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}
export function matchesSearch(text: string, query: string) {
  const words = normalizeSearch(query).split(/\s+/).filter(Boolean);
  const haystack = normalizeSearch(text);
  return words.every(word => haystack.includes(word));
}
