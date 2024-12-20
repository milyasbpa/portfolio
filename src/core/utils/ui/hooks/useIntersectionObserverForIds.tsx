import { useEffect, useState } from "react";

const useIntersectionObserverForIds = (
  ids: string[],
  options: IntersectionObserverInit = {}
) => {
  const [activeIds, setActiveIds] = useState<string[]>([]);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) {
      console.warn("No elements found for the provided IDs:", ids);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const intersectingIds = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target.id);

      setActiveIds(intersectingIds);
    }, options);

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [ids, options]);

  return activeIds;
};

export default useIntersectionObserverForIds;
