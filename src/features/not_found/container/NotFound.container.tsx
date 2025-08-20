import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../i18n";
import Link from "next/link";
import Image from "next/image";

export const NotFoundContainer = () => {
  const dictionaries = getDictionaries();
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center",
        "w-full h-full min-h-[100vh]"
      )}
    >
      <div className={clsx("relative")}>
        <Image
          src={dictionaries.container_image}
          alt={dictionaries.container_image_alt}
          width={600}
          height={400}
          priority
        />
        <Image
          className={clsx(
            "absolute",
            "top-[18%] left-[50%]",
            "translate-x-[-50%]"
          )}
          src={dictionaries.cable_image}
          alt={dictionaries.cable_image_alt}
          width={200}
          height={100}
        />
        <div
          className={clsx(
            "grid grid-cols-1 place-content-center place-items-center gap-[0.5rem]",
            "absolute",
            "top-[55%] left-[50%]",
            "translate-x-[-50%]"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-center place-items-center gap-[0.125rem]"
            )}
          >
            <h2
              className={clsx(
                "text-[3rem] text-dark18 dark:text-grey90 font-semibold"
              )}
              dangerouslySetInnerHTML={{
                __html: dictionaries.message,
              }}
            />
            <p
              className={clsx(
                "text-[1.5rem] text-dark18 dark:text-grey85 font-semibold"
              )}
              dangerouslySetInnerHTML={{
                __html: dictionaries.description,
              }}
            />
          </div>

          <Link
            href={dictionaries.cta.primary.href}
            className={clsx(
              "rounded-[0.5rem]",
              "px-[1rem] py-[0.75rem]",
              "bg-purple60 dark:bg-purple70",
              "text-[0.875rem] font-semibold text-white"
            )}
          >
            {dictionaries.cta.primary.children}
          </Link>
        </div>
      </div>
    </div>
  );
};
