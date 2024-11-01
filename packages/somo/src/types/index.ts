import type { JSX, ParentProps } from 'solid-js';
import type * as motionone from '@motionone/dom';
import type { PropertiesHyphen } from 'csstype';

export type { Options, VariantDefinition } from '@motionone/dom';

export interface MotionEventHandlers {
  onMotionStart?: (event: motionone.MotionEvent) => void;
  onMotionComplete?: (event: motionone.MotionEvent) => void;
  onHoverStart?: (event: motionone.CustomPointerEvent) => void;
  onHoverEnd?: (event: motionone.CustomPointerEvent) => void;
  onPressStart?: (event: motionone.CustomPointerEvent) => void;
  onPressEnd?: (event: motionone.CustomPointerEvent) => void;
  onViewEnter?: (event: motionone.ViewEvent) => void;
  onViewLeave?: (event: motionone.ViewEvent) => void;
}

declare module '@motionone/dom' {
  /*
	 Solid style attribute supports only kebab-case properties.
	 While @motionone/dom supports both camelCase and kebab-case,
	 but provides only camelCase properties in the types.
	*/
  interface CSSStyleDeclarationWithTransform
    extends Omit<PropertiesHyphen, 'direction' | 'transition'> {}

  /*
	 exit is missing in types in motionone core
	 because it is only used in the Presence implementations
	*/
  interface Options {
    exit?: motionone.VariantDefinition;
  }
}

export type MotionComponentProps<T extends keyof JSX.IntrinsicElements = 'div'> = ParentProps<
  JSX.IntrinsicElements[T] &
    MotionEventHandlers &
    motionone.Options & {
      ref?: any;
      tag?: string;
      /* TODO: */
      whileTap?: motionone.VariantDefinition;
      whileFocus?: motionone.VariantDefinition;
      whileHover?: motionone.VariantDefinition;
      whileInView?: motionone.VariantDefinition;
      whileDrag?: motionone.VariantDefinition;
    }
>;

// export type MotionComponent = {
//   // <Motion />
//   (props: JSX.IntrinsicElements['div'] & MotionComponentProps): JSX.Element;
//   // <Motion tag="div" />
//   <T extends keyof JSX.IntrinsicElements>(
//     props: JSX.IntrinsicElements[T] & MotionComponentProps & { tag: T },
//   ): JSX.Element;
// };

export type MotionComponent<T extends keyof JSX.IntrinsicElements = 'div'> = (
  props: JSX.IntrinsicElements[T] & MotionComponentProps,
) => JSX.Element;

export type MotionProxyComponent<T> = (props: T & MotionComponentProps) => JSX.Element;

export type MotionProxy = MotionComponent & {
  // <Motion.div />
  [K in keyof JSX.IntrinsicElements]: MotionProxyComponent<JSX.IntrinsicElements[K]>;
};

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      motion: motionone.Options;
    }
  }
}

// export only here so the `JSX` import won't be shaken off the tree:
export type E = JSX.Element;
