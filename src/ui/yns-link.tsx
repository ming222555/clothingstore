import Link from "next/link";
import { ComponentPropsWithRef } from "react";

export default function YnsLink(props: ComponentPropsWithRef<typeof Link>) {
  return <Link {...props} prefetch={false} />;
}
