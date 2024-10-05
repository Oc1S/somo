export { calcBoxDelta } from './projection/geometry/delta-calc';
export { nodeGroup } from './projection/node/group';
export { HTMLProjectionNode } from './projection/node/HTMLProjectionNode';

/**
 * For debugging purposes
 */
import { animateValue } from './animation/animators/MainThreadAnimation';
import { frame, frameData } from './frameloop';
import { mix } from './utils/mix';
export { animateValue as animate, frame, frameData, mix };
export { correctBorderRadius } from './projection/styles/scale-border-radius';
export { correctBoxShadow } from './projection/styles/scale-box-shadow';
export { addScaleCorrector } from './projection/styles/scale-correction';
export { HTMLVisualElement } from './render/html/HTMLVisualElement';
export { buildTransform } from './render/html/utils/build-transform';
