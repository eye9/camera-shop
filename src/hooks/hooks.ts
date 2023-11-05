import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, State } from '../types/state';
import { useEffect } from 'react';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useFocus = (element: HTMLElement | null) => {
  useEffect(() => {
    if (element) {
      setTimeout(() => element.focus(), 500);
    }
  });
};
export const useScrollDisabler = (isVisible: boolean) => {
  function getScrollbarSize() {
    const doc = document.documentElement;
    const dummyScroller = document.createElement('div');
    dummyScroller.setAttribute(
      'style',
      'width:99px;height:99px;position:absolute;top:-9999px;overflow:scroll;'
    );
    doc.appendChild(dummyScroller);
    const scrollbarSize = dummyScroller.offsetWidth - dummyScroller.clientWidth;
    doc.removeChild(dummyScroller);
    return scrollbarSize;
  }

  function hasScrollbar() {
    return document.documentElement.scrollHeight > window.innerHeight;
  }

  useEffect(() => {
    let isOn = false;
    let scrollTop = 0;
    function disableScroll() {
      if (typeof document === 'undefined' || isOn) {
        return;
      }
      const root = document.documentElement;
      scrollTop = window.scrollY;
      if (hasScrollbar()) {
        root.style.width = `calc(100% - ${getScrollbarSize()}px)`;
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
      if (typeof document === 'undefined' || !isOn) {
        return;
      }
      const root = document.documentElement;
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
  }, [isVisible]);
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
