import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, State } from '../types/state';
import { useEffect } from 'react';
import useScrollbarSize from 'react-scrollbar-size';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useFocus = (element: HTMLElement | null) => {
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (element) {
      timeoutId = setTimeout(() => element.focus(), 500);
    }

    return () => clearTimeout(timeoutId);
  });
};
export const useScrollDisabler = (isVisible: boolean) => {
  const { width: scrollbarSize } = useScrollbarSize();

  useEffect(() => {
    const root = document.documentElement;
    let isOn = false;
    let scrollTop = 0;
    function disableScroll() {
      if (typeof document === 'undefined' || isOn) {
        return;
      }
      function hasScrollbar() {
        return root.scrollHeight > window.innerHeight;
      }
      scrollTop = window.scrollY;
      if (hasScrollbar()) {
        root.style.width = `calc(100% - ${scrollbarSize}px)`;
      } else {
        root.style.width = '100%';
      }
      root.style.position = 'fixed';
      root.style.top = `-${scrollTop}px`;
      root.style.overflow = 'hidden';
      root.style.scrollBehavior = 'auto';
      isOn = true;
    }
    function enableScroll() {
      if (!isOn) {
        return;
      }
      root.style.width = '';
      root.style.position = '';
      root.style.top = '';
      root.style.overflow = '';
      window.scroll(0, scrollTop);
      root.style.scrollBehavior = 'smooth';
      isOn = false;
    }
    if (isVisible) {
      disableScroll();
    }
    return () => enableScroll();
  }, [isVisible, scrollbarSize]);
};
export const useEscHandle = (closeCallback: () => void) => {
  useEffect(() => {
    const handleEscKeydown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeCallback();
      }
    };
    document.addEventListener('keydown', handleEscKeydown);

    return () => document.removeEventListener('keydown', handleEscKeydown);
  });
};
