import { Ref } from 'solid-js';

import type { VisualElement } from '../../render/VisualElement';
import { isRefObject } from '../../utils/is-ref-object';
import { VisualState } from './use-visual-state';

/**
 * Creates a ref function that, when called, hydrates the provided
 * external ref and VisualElement.
 */
export function useMotionRef<Instance, RenderState>(
  visualState: VisualState<Instance, RenderState>,
  visualElement?: VisualElement<Instance> | null,
  externalRef?: Ref<Instance>,
): Ref<Instance> {
  return (instance: Instance) => {
    instance && visualState.mount?.(instance);

    if (visualElement) {
      if (instance) {
        visualElement.mount(instance);
      } else {
        visualElement.unmount();
      }
    }

    if (externalRef) {
      if (typeof externalRef === 'function') {
        (externalRef as any)(instance);
      } else if (isRefObject(externalRef)) {
        (externalRef as any).current = instance;
      }
    }
  };
  /**
   * Only pass a new ref callback to React if we've received a visual element
   * factory. Otherwise we'll be mounting/remounting every time externalRef
   * or other dependencies change.
   */
  // usecallback [visualElement],
}
