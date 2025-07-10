import { ComponentProps } from "react";
import Image from "next/image";

export const Icons = {
  logo: ({ className, src, alt, ...props }: ComponentProps<typeof Image>) => (
    <Image
      src="/icons/zonomo-logo.png"
      alt="Zonomo Logo"
      className={className}
      width={150}
      height={50}
      style={{ display: "block" }}
      {...props}
    />
  ),
};
