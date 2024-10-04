import { Component, ParentProps } from 'solid-js';

import { createRendererMotionComponent, MotionComponentProps } from '../../motion';
import { FeaturePackages } from '../../motion/features/types';
import { DOMMotionComponents } from '../dom/types';
import { createUseRender } from '../dom/use-render';
import { isSVGComponent } from '../dom/utils/is-svg-component';
import { htmlMotionConfig } from '../html/config-motion';
import { svgMotionConfig } from '../svg/config-motion';
import { CreateVisualElement } from '../types';

type MotionComponent<T, P extends object> = T extends keyof DOMMotionComponents
  ? DOMMotionComponents[T]
  : Component<MotionComponentProps<ParentProps<P>>>;

export function createMotionComponentFactory(
  preloadedFeatures?: FeaturePackages,
  createVisualElement?: CreateVisualElement<any>,
) {
  return function createMotionComponent<
    Props extends Record<string, any>,
    TagName extends keyof DOMMotionComponents | string = 'div',
  >(
    Component: TagName | string | Component<Props>,
    { forwardMotionProps } = { forwardMotionProps: false },
  ) {
    const baseConfig = isSVGComponent(Component) ? svgMotionConfig : htmlMotionConfig;

    const config = {
      ...baseConfig,
      preloadedFeatures,
      useRender: createUseRender(forwardMotionProps),
      createVisualElement,
      Component,
    };

    return createRendererMotionComponent(config as any) as MotionComponent<TagName, Props>;
  };
}
