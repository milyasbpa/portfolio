import { useEffect } from "react";

const useIntersectionObserver = (
  elementId: string,
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) => {
  useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`Element with id "${elementId}" not found.`);
      return;
    }

    const observer = new IntersectionObserver(callback, options);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementId, callback, options]);
};

export default useIntersectionObserver;
