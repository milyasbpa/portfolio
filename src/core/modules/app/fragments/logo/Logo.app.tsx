import * as React from "react";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import { getDictionaries } from "../../i18n";

export const LogoApp = () => {
  const dictionaries = getDictionaries();
  return (
    <Link href={dictionaries.navigation.logo.href}>
      <Image
        src={dictionaries.navigation.logo.src}
        alt={dictionaries.navigation.logo.alt}
        width={32}
        height={32}
        className={clsx("rounded-[0.5rem]")}
      />
    </Link>
  );
};
