import * as React from "react";
import clsx from "clsx";

export const ScrollProgressApp = () => {
  const [scrollProgress, setScrollProgress] = React.useState<number>(0);

  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    setScrollProgress(progress);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={clsx("bg-purple78", "h-[2px]")}
      style={{ width: `${scrollProgress}%` }}
    />
  );
};
