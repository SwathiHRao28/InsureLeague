import Image from "next/image";
import { cn } from "@/lib/utils";
import markImg from "@/public/images/logo/insureleague-mark.png";
import wordmarkImg from "@/public/images/logo/insureleague-wordmark.png";

// The client's original logo, cut from their artwork: the mark on the left, "InsureLeague / Securing Lives" beside it.
export function Logo({ size = "md", className }: { size?: "sm" | "md"; className?: string }) {
  const sm = size === "sm";
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image src={markImg} alt="" priority className={sm ? "h-10 w-auto" : "h-12 w-auto"} />
      <Image src={wordmarkImg} alt="InsureLeague, Securing Lives" priority className={sm ? "h-9 w-auto" : "h-11 w-auto"} />
    </span>
  );
}
