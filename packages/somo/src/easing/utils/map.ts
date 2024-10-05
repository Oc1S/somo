import { anticipate } from '../../easing/anticipate';
import { backIn, backInOut, backOut } from '../../easing/back';
import { circIn, circInOut, circOut } from '../../easing/circ';
import { cubicBezier } from '../../easing/cubic-bezier';
import { easeIn, easeInOut, easeOut } from '../../easing/ease';
import { Easing } from '../../easing/types';
import { invariant } from '../../utils/errors';
import { noop } from '../../utils/noop';

const easingLookup = {
  linear: noop,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate,
};

export const easingDefinitionToFunction = (definition: Easing) => {
  if (Array.isArray(definition)) {
    // If cubic bezier definition, create bezier curve
    invariant(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`);

    const [x1, y1, x2, y2] = definition;
    return cubicBezier(x1, y1, x2, y2);
  } else if (typeof definition === 'string') {
    // Else lookup from table
    invariant(easingLookup[definition] !== undefined, `Invalid easing type '${definition}'`);
    return easingLookup[definition];
  }

  return definition;
};
