import { Point } from '../projection/geometry/types';
import { RefObject } from '../utils/safe-react-types';

/** @public */
export interface EventInfo {
  point: Point;
}

export type EventHandler = (event: PointerEvent, info: EventInfo) => void;

export type ListenerControls = [() => void, () => void];

export type TargetOrRef = EventTarget | RefObject<EventTarget>;

export type TargetBasedReturnType<Target> = Target extends EventTarget
  ? ListenerControls
  : undefined;
