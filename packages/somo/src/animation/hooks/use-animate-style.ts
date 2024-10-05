import { useConstant } from '../../utils/use-constant';
import { useUnmountEffect } from '../../utils/use-unmount-effect';
import { createScopedWaapiAnimate } from '../animators/waapi/animate-style';
import { AnimationScope } from '../types';

export function useAnimateMini<T extends Element = any>() {
  const scope: AnimationScope<T> = useConstant(() => ({
    current: null!, // Will be hydrated
    animations: [],
  }));

  const animate = useConstant(() => createScopedWaapiAnimate(scope));

  useUnmountEffect(() => {
    scope.animations.forEach(animation => animation.stop());
  });

  return [scope, animate] as [AnimationScope<T>, typeof animate];
}
