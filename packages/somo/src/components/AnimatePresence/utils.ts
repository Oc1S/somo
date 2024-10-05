import { children as childrenHelper, JSXElement } from 'solid-js';

export type ComponentKey = string | number;

export function onlyElements(children: JSXElement): Element[] {
  const filtered: Element[] = [];

  // We use forEach here instead of map as map mutates the component key by preprending `.$`

  const resolved = childrenHelper(() => children);

  resolved.toArray().forEach(child => {
    if (child instanceof Element) filtered.push(child);
  });

  return filtered;
}
