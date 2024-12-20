import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";

export const AboutHome = () => {
  const dictionaries = getDictionaries();
  return (
    <div
      id={dictionaries.about.id}
      className={clsx(
        "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[1rem]",
        "w-full min-h-screen",
        "py-[60px]"
      )}
    >
      <p
        className={clsx(
          "text-[0.875rem] text-dark18 dark:text-grey90 font-medium"
        )}
        dangerouslySetInnerHTML={{
          __html: dictionaries.about.description,
        }}
      />
    </div>
  );
};
