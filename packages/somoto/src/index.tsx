import './styles.css';

import {
  Component,
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  onCleanup,
  onMount,
} from 'solid-js';

import { Toast } from './components/toast';
import { GAP, TOAST_WIDTH, VIEWPORT_OFFSET, VISIBLE_TOASTS_AMOUNT } from './constants';
import { toast, ToastState } from './state';
import {
  type ExternalToast,
  type HeightT,
  Position,
  type ToasterProps,
  ToastOptions,
  type ToastToDismiss,
  type ToastType,
} from './types';
import { getDocumentDirection } from './utils/get-document-direction';

function _cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

function createSomoto() {
  const [activeToasts, setActiveToasts] = createSignal<ToastType[]>([]);

  onMount(() => {
    const unSubscribe = ToastState.subscribe(toast => {
      setActiveToasts(currentToasts => {
        if ('dismiss' in toast && toast.dismiss) {
          return currentToasts.filter(t => t.id !== toast.id);
        }

        const existingToastIndex = currentToasts.findIndex(t => t.id === toast.id);
        if (existingToastIndex !== -1) {
          const updatedToasts = [...currentToasts];
          updatedToasts[existingToastIndex] = { ...updatedToasts[existingToastIndex], ...toast };
          return updatedToasts;
        } else {
          return [toast, ...currentToasts];
        }
      });
    });

    onCleanup(unSubscribe);
  });

  return {
    toasts: activeToasts,
  };
}

const Toaster: Component<ToasterProps> = p => {
  const { offset, style, icons } = p;
  const props = mergeProps(
    {
      invert: false,
      expand: false,
      pauseWhenPageIsHidden: false,
      closeButton: false,
      gap: GAP,
      position: 'bottom-right',
      hotkey: ['altKey', 'KeyT'],
      theme: 'light',
      toastOptions: {} as ToastOptions,
      visibleToasts: VISIBLE_TOASTS_AMOUNT,
      dir: getDocumentDirection(),
      containerAriaLabel: 'Notifications',
      cn: _cn,
    } satisfies Partial<ToasterProps>,
    p,
  );
  const [toasts, setToasts] = createSignal<ToastType[]>([]);

  const possiblePositions = createMemo(() => {
    return Array.from(
      new Set(
        [props.position].concat(
          toasts()
            .filter(toast => toast.position)
            .map(toast => toast.position) as Position[],
        ),
      ),
    );
  });

  const [heights, setHeights] = createSignal<HeightT[]>([]);
  const [expanded, setExpanded] = createSignal(false);
  const [interacting, setInteracting] = createSignal(false);
  const [actualTheme, setActualTheme] = createSignal(
    props.theme !== 'system'
      ? props.theme
      : typeof window !== 'undefined'
        ? window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : 'light',
  );

  const [listRef, setListRef] = createSignal<HTMLOListElement>();
  const hotkeyLabel = props.hotkey.join('+').replace(/Key/g, '').replace(/Digit/g, '');
  let lastFocusedElementRef: HTMLElement | null = null;
  let isFocusWithinRef = false;

  const removeToast = (toastToRemove: ToastType) => {
    setToasts(toasts => {
      if (!toasts.find(toast => toast.id === toastToRemove.id)?.delete) {
        ToastState.dismiss(toastToRemove.id);
      }

      return toasts.filter(({ id }) => id !== toastToRemove.id);
    });
  };

  onMount(() => {
    const unSubscribe = ToastState.subscribe(toast => {
      if ((toast as ToastToDismiss).dismiss) {
        setToasts(toasts => toasts.map(t => (t.id === toast.id ? { ...t, delete: true } : t)));
        return;
      }

      // Prevent batching, temp solution.
      setTimeout(() => {
        ReactDOM.flushSync(() => {
          setToasts(toasts => {
            const indexOfExistingToast = toasts.findIndex(t => t.id === toast.id);

            // Update the toast if it already exists
            if (indexOfExistingToast !== -1) {
              return [
                ...toasts.slice(0, indexOfExistingToast),
                { ...toasts[indexOfExistingToast], ...toast },
                ...toasts.slice(indexOfExistingToast + 1),
              ];
            }

            return [toast, ...toasts];
          });
        });
      });
    });
    onCleanup(unSubscribe);
  });

  /* sync actualTheme with theme */
  createEffect(() => {
    if (props.theme !== 'system') {
      setActualTheme(props.theme);
      return;
    }

    if (props.theme === 'system') {
      // check if current preference is dark
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setActualTheme('dark');
      } else {
        setActualTheme('light');
      }
    }

    if (typeof window === 'undefined') return;

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
      if (matches) {
        setActualTheme('dark');
      } else {
        setActualTheme('light');
      }
    });
  });

  // Ensure expanded is always false when no toasts are present / only one left
  createEffect(() => {
    if (toasts().length <= 1) {
      setExpanded(false);
    }
  });

  createEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isHotkeyPressed = props.hotkey.every(key => (event as any)[key] || event.code === key);

      if (isHotkeyPressed) {
        setExpanded(true);
        listRef()?.focus();
      }

      if (
        event.code === 'Escape' &&
        (document.activeElement === listRef() || listRef()?.contains(document.activeElement))
      ) {
        setExpanded(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    onCleanup(() => {
      document.removeEventListener('keydown', handleKeyDown);
    });
  });

  createEffect(() => {
    if (listRef()) {
      onCleanup(() => {
        if (lastFocusedElementRef) {
          lastFocusedElementRef.focus({ preventScroll: true });
          lastFocusedElementRef = null;
          isFocusWithinRef = false;
        }
      });
    }
  });

  if (!toasts().length) return null;

  return (
    // Remove item from normal navigation flow, only available via hotkey
    <section
      aria-label={`${props.containerAriaLabel} ${hotkeyLabel}`}
      tabIndex={-1}
      ref={r => (props.ref = r)}
    >
      {possiblePositions().map((position, index) => {
        const [y, x] = position.split('-');
        return (
          <ol
            dir={props.dir === 'auto' ? getDocumentDirection() : props.dir}
            tabIndex={-1}
            ref={setListRef}
            class={props.className}
            data-sonner-toaster
            data-theme={actualTheme}
            data-y-position={y}
            data-x-position={x}
            style={{
              '--front-toast-height': `${heights()[0]?.height || 0}px`,
              '--offset': typeof offset === 'number' ? `${offset}px` : offset || VIEWPORT_OFFSET,
              '--width': `${TOAST_WIDTH}px`,
              '--gap': `${props.gap}px`,
              ...style,
            }}
            onBlur={event => {
              if (isFocusWithinRef && !event.currentTarget.contains(event.relatedTarget as Node)) {
                isFocusWithinRef = false;
                if (lastFocusedElementRef) {
                  lastFocusedElementRef.focus({ preventScroll: true });
                  lastFocusedElementRef = null;
                }
              }
            }}
            onFocus={event => {
              const isNotDismissible =
                event.target instanceof HTMLElement && event.target.dataset.dismissible === 'false';

              if (isNotDismissible) return;

              if (!isFocusWithinRef) {
                isFocusWithinRef = true;
                lastFocusedElementRef = event.relatedTarget as HTMLElement;
              }
            }}
            onMouseEnter={() => setExpanded(true)}
            onMouseMove={() => setExpanded(true)}
            onMouseLeave={() => {
              // Avoid setting expanded to false when interacting with a toast, e.g. swiping
              if (!interacting) {
                setExpanded(false);
              }
            }}
            onPointerDown={event => {
              const isNotDismissible =
                event.target instanceof HTMLElement && event.target.dataset.dismissible === 'false';

              if (isNotDismissible) return;
              setInteracting(true);
            }}
            onPointerUp={() => setInteracting(false)}
          >
            {toasts()
              .filter(toast => (!toast.position && index === 0) || toast.position === position)
              .map((toast, index) => (
                <Toast
                  icons={icons}
                  index={index}
                  toast={toast}
                  defaultRichColors={props.richColors}
                  duration={props.toastOptions.duration ?? props.duration}
                  class={props.toastOptions.className}
                  descriptionClassName={props.toastOptions.descriptionClassName}
                  style={props.toastOptions.style}
                  unstyled={props.toastOptions.unstyled}
                  classNames={props.toastOptions.classNames}
                  cancelButtonStyle={props.toastOptions.cancelButtonStyle}
                  actionButtonStyle={props.toastOptions.actionButtonStyle}
                  closeButton={props.toastOptions.closeButton ?? props.closeButton}
                  invert={props.invert}
                  visibleToasts={props.visibleToasts}
                  interacting={interacting()}
                  position={props.position}
                  removeToast={removeToast}
                  toasts={toasts().filter(t => t.position == toast.position)}
                  heights={heights().filter(h => h.position == toast.position)}
                  setHeights={setHeights}
                  expandByDefault={props.expand}
                  gap={props.gap}
                  expanded={expanded()}
                  pauseWhenPageIsHidden={props.pauseWhenPageIsHidden}
                  cn={props.cn}
                />
              ))}
          </ol>
        );
      })}
    </section>
  );
};

export {
  createSomoto,
  type ExternalToast,
  toast,
  Toaster,
  type ToasterProps,
  type ToastType as ToastT,
};
export { type Action, type ToastClassnames, type ToastToDismiss } from './types';
