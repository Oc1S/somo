import type { JSXElement } from 'solid-js';
import {
  createEffect,
  createMemo,
  createSignal,
  Match,
  mergeProps,
  onCleanup,
  Show,
  Switch,
} from 'solid-js';
import { createTimer } from 'src/primitives/create-timer';

import { GAP, SWIPE_THRESHOLD, TIME_BEFORE_UNMOUNT, TOAST_LIFETIME } from '../constants';
import { useIsDocumentHidden } from '../hooks/use-is-document-hidden';
import { useIsMounted } from '../hooks/use-is-mounted';
import { toast } from '../state';
import type { Action, ToastClassnames, ToastIcons, ToastVariants } from '../types';
import { isAction, type ToastProps } from '../types';
import { cn } from '../utils/cn';
import { CloseIcon, getIcon, Loading } from './icons';

export const Toast = (p: ToastProps) => {
  const props = mergeProps(
    {
      gap: GAP,
      closeButtonAriaLabel: 'Close toast',
      descriptionClassName: '',
    },
    p,
  );

  const mounted = useIsMounted();
  const [removed, setRemoved] = createSignal(false);
  const [swiping, setSwiping] = createSignal(false);
  const [swipeOut, setSwipeOut] = createSignal(false);
  const [offsetBeforeRemove, setOffsetBeforeRemove] = createSignal(0);
  const [initialHeight, setInitialHeight] = createSignal(0);
  const [toastElement, setToastElement] = createSignal<HTMLLIElement>();

  const isFront = () => props.index === 0;
  const invert = () => props.toast.invert || props.invert;
  const isVisible = () => props.index + 1 <= props.visibleAmount;
  const toastType = () => props.toast.type;
  const disabled = () => toastType() === 'loading';
  const dismissible = () => props.toast.dismissible !== false;
  const closeButton = () => props.toast.closeButton ?? props.closeButton;
  const duration = () => props.toast.duration || props.duration || TOAST_LIFETIME;

  let dragStartTime: Date | null = null;
  let pointerStartRef: { x: number; y: number } | null = null;

  const position = createMemo(() => props.position.split('-'));
  const isDocumentHidden = useIsDocumentHidden();

  // Height index is used to calculate the offset as it gets updated before the toast array, which means we can calculate the new layout faster.
  const heightIndex = createMemo(() => {
    const index = props.heights.findIndex(height => height.toastId === props.toast.id);
    return index === -1 ? 0 : index;
  });

  const toastsHeightBefore = createMemo(() => {
    return props.heights.reduce((prev, curr, reducerIndex) => {
      // Calculate offset up until current toast
      if (reducerIndex >= heightIndex()) {
        return prev;
      }
      return prev + curr.height;
    }, 0);
  });

  const offset = createMemo(() => {
    // console.log(
    //   '@id',
    //   props.toast.id,
    //   '@index',
    //   props.index,
    //   '@height-index',
    //   heightIndex(),
    //   '@gap',
    //   props.gap,
    //   '@height-before',
    //   toastsHeightBefore(),
    //   '@offset',
    //   heightIndex() * props.gap + toastsHeightBefore(),
    //   '@heights',
    //   props.heights,
    // );
    return heightIndex() * props.gap + toastsHeightBefore();
  });

  /* calc heights */
  createEffect(() => {
    const toastNode = toastElement();
    if (!mounted() || !toastNode) return;
    const originalHeight = toastNode.style.height;
    toastNode.style.height = 'auto';
    const newHeight = toastNode.getBoundingClientRect().height;
    toastNode.style.height = originalHeight;

    setInitialHeight(newHeight);

    // Add toast height to heights array after the toast is mounted
    props.setHeights(heights => {
      const alreadyExists = heights.find(height => height.toastId === props.toast.id);
      if (alreadyExists) {
        return heights.map(height =>
          height.toastId === props.toast.id ? { ...height, height: newHeight } : height,
        );
      } else {
        return [
          { toastId: props.toast.id, height: newHeight, position: props.toast.position! },
          ...heights,
        ];
      }
    });

    onCleanup(() => {
      props.setHeights(heights => heights.filter(height => height.toastId !== props.toast.id));
    });
  });

  const deleteToast = () => {
    // Save the offset for the exit swipe animation
    setRemoved(true);
    setOffsetBeforeRemove(offset());
    props.setHeights(h => h.filter(height => height.toastId !== props.toast.id));

    setTimeout(() => {
      props.removeToast(props.toast);
    }, TIME_BEFORE_UNMOUNT);
  };

  /* auto close */
  createEffect(() => {
    if (duration() === Infinity || toastType() === 'loading') return;
    const { startTimer, pauseTimer } = createTimer(duration(), () => {
      props.toast.onAutoClose?.(props.toast);
      deleteToast();
    });

    if (
      props.expanded ||
      props.interacting ||
      (props.pauseWhenPageIsHidden && isDocumentHidden())
    ) {
      pauseTimer();
    } else {
      startTimer();
    }
  });

  /* delete */
  createEffect(() => {
    if (props.toast.delete) {
      deleteToast();
    }
  });

  function getLoadingIcon() {
    return (
      <Show when={props.icons?.loading} fallback={<Loading visible={toastType() === 'loading'} />}>
        {loading => (
          <div class="somoto-loader" data-visible={toastType() === 'loading'}>
            {loading()}
          </div>
        )}
      </Show>
    );
  }

  const renderCloseButton = (): JSXElement => {
    return (
      <Show when={closeButton() && !props.toast.jsx}>
        <button
          aria-label={props.closeButtonAriaLabel}
          data-disabled={disabled()}
          data-close-button
          onClick={
            disabled() || !dismissible()
              ? () => {}
              : () => {
                  deleteToast();
                  props.toast.onDismiss?.(props.toast);
                }
          }
          class={cn(props.classNames?.closeButton, props.toast?.classNames?.closeButton)}
        >
          <Show when={props.icons?.close} fallback={<CloseIcon />}>
            {closeElement => closeElement()}
          </Show>
        </button>
      </Show>
    );
  };

  const renderIcon = (): JSXElement => {
    return (
      <Show when={toastType() || props.toast.icon || props.toast.promise}>
        <div data-icon="" class={cn(props.classNames?.icon, props.toast.classNames?.icon)}>
          {/* loading & promise */}
          <Show when={props.toast.promise || (toastType() === 'loading' && !props.toast.icon)}>
            <Show when={props.toast.icon} fallback={getLoadingIcon()}>
              {props.toast.icon}
            </Show>
          </Show>

          <Show when={toastType() !== 'loading'}>
            {_ => {
              return (
                <Switch>
                  <Match when={props.toast.icon}>{props.toast.icon}</Match>
                  <Match when={props.icons?.[toastType() as keyof ToastIcons]}>
                    {icon => icon()}
                  </Match>
                  <Match when={getIcon(toastType() as ToastVariants)}>{icon => icon()}</Match>
                </Switch>
              );
            }}
          </Show>
        </div>
      </Show>
    );
  };

  /* content:title + description */
  const renderContent = (): JSXElement => {
    return (
      <div data-content="" class={cn(props.classNames?.content, props.toast?.classNames?.content)}>
        <div data-title="" class={cn(props.classNames?.title, props.toast?.classNames?.title)}>
          {props.toast.title}
        </div>
        <Show when={props.toast.description}>
          {description => (
            <div
              data-description=""
              class={cn(
                props.descriptionClassName,
                props.toast.descriptionClassName,
                props.classNames?.description,
                props.toast?.classNames?.description,
              )}
            >
              {description()}
            </div>
          )}
        </Show>
      </div>
    );
  };

  /* cancel */
  const renderCancel = (): JSXElement => {
    return (
      <Show
        when={props.toast.cancel && isAction(props.toast.cancel)}
        fallback={<Show when={props.toast.cancel}>{cancel => <>{cancel()}</>}</Show>}
      >
        <button
          data-button
          data-cancel
          style={props.toast.cancelButtonStyle || props.cancelButtonStyle}
          onClick={event => {
            // We need to check twice because typescript
            if (!isAction(props.toast.cancel)) return;
            if (!dismissible()) return;
            props.toast.cancel.onClick?.(event);
            deleteToast();
          }}
          class={cn(props.classNames?.cancelButton, props.toast?.classNames?.cancelButton)}
        >
          {(props.toast.cancel as Action).label}
        </button>
      </Show>
    );
  };

  /* action */
  const renderAction = (): JSXElement => {
    return (
      <Show
        when={props.toast.action && isAction(props.toast.action)}
        fallback={<Show when={props.toast.action}>{action => <>{action()}</>}</Show>}
      >
        <button
          data-button
          data-action
          style={props.toast.actionButtonStyle || props.actionButtonStyle}
          onClick={event => {
            // We need to check twice because typescript
            if (!isAction(props.toast.action)) return;
            if (event.defaultPrevented) return;
            props.toast.action.onClick?.(event);
            deleteToast();
          }}
          class={cn(props.classNames?.actionButton, props.toast.classNames?.actionButton)}
        >
          {(props.toast.action as Action).label}
        </button>
      </Show>
    );
  };

  return (
    <li
      aria-live={props.toast.important ? 'assertive' : 'polite'}
      aria-atomic="true"
      role="status"
      tabIndex={0}
      ref={setToastElement}
      class={cn(
        props.class,
        props.toast.className,
        props.classNames?.toast,
        props.toast?.classNames?.toast,
        props.classNames?.default,
        props.classNames?.[toastType() as keyof ToastClassnames],
        props.toast?.classNames?.[toastType() as keyof ToastClassnames],
      )}
      data-somoto-toast=""
      data-rich-colors={props.toast.richColors ?? props.defaultRichColors}
      data-styled={!(props.toast.jsx || props.toast.unstyled || props.unstyled)}
      data-mounted={mounted()}
      data-promise={Boolean(toast.promise)}
      data-removed={removed()}
      data-visible={isVisible()}
      data-y-position={position()[0]}
      data-x-position={position()[1]}
      data-index={props.index}
      data-front={isFront()}
      data-swiping={swiping()}
      data-dismissible={dismissible()}
      data-type={toastType()}
      data-invert={invert()}
      data-swipe-out={swipeOut()}
      data-expanded={Boolean(props.expanded || (props.expandByDefault && mounted()))}
      style={{
        '--index': props.index,
        '--toasts-before': props.index,
        '--z-index': props.toasts.length - props.index,
        '--offset': `${removed() ? offsetBeforeRemove() : offset()}px`,
        '--initial-height': props.expandByDefault ? 'auto' : `${initialHeight()}px`,
        ...props.style,
        ...props.toast.style,
      }}
      onPointerDown={event => {
        if (disabled() || !dismissible()) return;
        dragStartTime = new Date();
        setOffsetBeforeRemove(offset());
        // Ensure we maintain correct pointer capture even when going outside of the toast (e.g. when swiping)
        (event.target as HTMLElement).setPointerCapture(event.pointerId);
        if ((event.target as HTMLElement).tagName === 'BUTTON') return;
        setSwiping(true);
        pointerStartRef = { x: event.clientX, y: event.clientY };
      }}
      onPointerUp={() => {
        if (swipeOut() || !dismissible()) return;
        pointerStartRef = null;
        const toastNode = toastElement();
        const swipeAmount = Number(
          toastNode?.style.getPropertyValue('--swipe-amount').replace('px', '') || 0,
        );
        const timeTaken = new Date().getTime() - (dragStartTime as Date)?.getTime();
        const velocity = Math.abs(swipeAmount) / timeTaken;

        // Remove only if threshold is met
        if (Math.abs(swipeAmount) >= SWIPE_THRESHOLD || velocity > 0.11) {
          setOffsetBeforeRemove(offset());
          props.toast.onDismiss?.(props.toast);
          deleteToast();
          setSwipeOut(true);
          return;
        }

        toastNode?.style.setProperty('--swipe-amount', '0px');
        setSwiping(false);
      }}
      onPointerMove={event => {
        if (!pointerStartRef || !dismissible()) return;

        const yPosition = event.clientY - pointerStartRef.y;
        const xPosition = event.clientX - pointerStartRef.x;

        const clamp = position()[0] === 'top' ? Math.min : Math.max;
        const clampedY = clamp(0, yPosition);
        const swipeStartThreshold = event.pointerType === 'touch' ? 10 : 2;
        const isAllowedToSwipe = Math.abs(clampedY) > swipeStartThreshold;

        if (isAllowedToSwipe) {
          const toastNode = toastElement();
          toastNode?.style.setProperty('--swipe-amount', `${yPosition}px`);
        } else if (Math.abs(xPosition) > swipeStartThreshold) {
          // User is swiping in wrong direction so we disable swipe gesture
          // for the current pointer down interaction
          pointerStartRef = null;
        }
      }}
    >
      {renderCloseButton()}
      <Show
        when={props.toast.jsx || props.toast.title instanceof Element}
        fallback={
          <>
            {renderIcon()}
            {renderContent()}
            {renderCancel()}
            {renderAction()}
          </>
        }
      >
        {props.toast.jsx || props.toast.title}
      </Show>
    </li>
  );
};
