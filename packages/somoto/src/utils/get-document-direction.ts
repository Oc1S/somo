import { Direction } from '../types';

export function getDocumentDirection(): Direction {
  if (typeof window === 'undefined' || typeof document === 'undefined') return 'ltr';

  const dirAttribute = document.documentElement.getAttribute('dir');
  if (dirAttribute === 'auto' || !dirAttribute) {
    return window.getComputedStyle(document.documentElement).direction as Direction;
  }

  return dirAttribute as Direction;
}
