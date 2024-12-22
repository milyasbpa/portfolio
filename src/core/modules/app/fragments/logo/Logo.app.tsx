import * as React from "react";
import Image from "next/image";
import clsx from "clsx";

export const LogoApp = () => {
  return (
    <Image
      src={"/logo/favicon-96x96.png"}
      alt="logo"
      width={32}
      height={32}
      className={clsx("rounded-[0.5rem]")}
    />
  );
};
