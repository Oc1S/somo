import type { Accessor, JSX, Ref, Setter } from 'solid-js';

export type MaybeAccessor<T> = T | Accessor<T>;

export type ToastVariants =
  | 'default'
  | 'action'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'loading';

export type PromiseT<Data = any> = Promise<Data> | (() => Promise<Data>);

export type PromiseTResult<Data = any> =
  | JSX.Element
  | ((data: Data) => JSX.Element | Promise<JSX.Element>);

export type PromiseExternalToast = Omit<ExternalToast, 'description'>;

export type PromiseData<ToastData = any> = PromiseExternalToast & {
  loading?: string | JSX.Element;
  success?: PromiseTResult<ToastData>;
  error?: PromiseTResult;
  description?: PromiseTResult;
  finally?: () => void | Promise<void>;
};

export interface ToastClassnames {
  toast?: string;
  title?: string;
  description?: string;
  loader?: string;
  closeButton?: string;
  cancelButton?: string;
  actionButton?: string;
  success?: string;
  error?: string;
  info?: string;
  warning?: string;
  loading?: string;
  default?: string;
  content?: string;
  icon?: string;
}

export interface ToastIcons {
  success?: JSX.Element;
  info?: JSX.Element;
  warning?: JSX.Element;
  error?: JSX.Element;
  loading?: JSX.Element;
  close?: JSX.Element;
}

export interface Action {
  label: JSX.Element;
  onClick: JSX.EventHandler<HTMLButtonElement, MouseEvent>;
  actionButtonStyle?: JSX.CSSProperties;
}

export interface ToastType {
  id: number | string;
  title?: string | JSX.Element;
  type?: ToastVariants;
  icon?: JSX.Element;
  jsx?: JSX.Element;
  richColors?: boolean;
  invert?: boolean;
  closeButton?: boolean;
  dismissible?: boolean;
  description?: JSX.Element;
  duration?: number;
  delete?: boolean;
  important?: boolean;
  action?: Action | JSX.Element;
  cancel?: Action | JSX.Element;
  onDismiss?: (toast: ToastType) => void;
  onAutoClose?: (toast: ToastType) => void;
  promise?: PromiseT;
  cancelButtonStyle?: JSX.CSSProperties;
  actionButtonStyle?: JSX.CSSProperties;
  style?: JSX.CSSProperties;
  unstyled?: boolean;
  className?: string;
  classNames?: ToastClassnames;
  descriptionClassName?: string;
  position?: Position;
}

export function isAction(action: Action | JSX.Element): action is Action {
  return (action as Action).label !== undefined;
}

export type Position =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center';
export interface HeightT {
  height: number;
  toastId: number | string;
  position: Position;
}

export interface ToastOptions {
  className?: string;
  closeButton?: boolean;
  descriptionClassName?: string;
  style?: JSX.CSSProperties;
  cancelButtonStyle?: JSX.CSSProperties;
  actionButtonStyle?: JSX.CSSProperties;
  duration?: number;
  unstyled?: boolean;
  classNames?: ToastClassnames;
}

export type Direction = 'rtl' | 'ltr' | 'auto';

export interface ToasterProps {
  invert?: boolean;
  theme?: 'light' | 'dark' | 'system';
  position?: Position;
  hotkey?: string[];
  richColors?: boolean;
  expand?: boolean;
  duration?: number;
  gap?: number;
  visibleAmount?: number;
  closeButton?: boolean;
  toastOptions?: ToastOptions;
  className?: string;
  style?: JSX.CSSProperties;
  offset?: string | number;
  dir?: Direction;
  icons?: ToastIcons;
  containerAriaLabel?: string;
  pauseWhenPageIsHidden?: boolean;
  ref?: Ref<HTMLElement>;
}

export interface ToastProps {
  toast: ToastType;
  toasts: ToastType[];
  index: number;
  expanded: boolean;
  invert: boolean;
  heights: HeightT[];
  setHeights: Setter<HeightT[]>;
  removeToast: (toast: ToastType) => void;
  gap?: number;
  position: Position;
  visibleAmount: number;
  expandByDefault: boolean;
  closeButton: boolean;
  interacting: boolean;
  style?: JSX.CSSProperties;
  cancelButtonStyle?: JSX.CSSProperties;
  actionButtonStyle?: JSX.CSSProperties;
  duration?: number;
  class?: string;
  classNames?: ToastClassnames;
  unstyled?: boolean;
  descriptionClassName?: string;
  icons?: ToastIcons;
  closeButtonAriaLabel?: string;
  pauseWhenPageIsHidden: boolean;
  defaultRichColors?: boolean;
}

export enum SwipeStateTypes {
  SwipedOut = 'SwipedOut',
  SwipedBack = 'SwipedBack',
  NotSwiped = 'NotSwiped',
}

export type Theme = 'light' | 'dark';

export interface ToastToDismiss {
  id: number | string;
  dismiss: boolean;
}

export type ExternalToast = Omit<
  ToastType,
  'id' | 'type' | 'title' | 'jsx' | 'delete' | 'promise'
> & {
  id?: number | string;
};
