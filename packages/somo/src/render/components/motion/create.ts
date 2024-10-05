import { animations } from '../../../motion/features/animations';
import { drag } from '../../../motion/features/drag';
import { gestureAnimations } from '../../../motion/features/gestures';
import { layout } from '../../../motion/features/layout';
import { createDomVisualElement } from '../../dom/create-visual-element';
import { createMotionComponentFactory } from '../create-factory';

export const createMotionComponent = /*@__PURE__*/ createMotionComponentFactory(
  {
    ...animations,
    ...gestureAnimations,
    ...drag,
    ...layout,
  },
  createDomVisualElement,
);
