import { useId } from "react";
import { cn } from "@/lib/utils";

// Infinity mark: two ribbons (teal + lime) forming ∞, with the two "people" above.
// Keep in sync with public/images/logo/insureleague-mark.svg and app/icon.svg.
export function LogoMark({ className }: { className?: string }) {
  const clipId = `il-cross-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 120 84" fill="none" className={className} aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <rect x="44" y="30" width="32" height="44" />
        </clipPath>
      </defs>
      <path d="M14 54C14 31 46 31 60 54C74 77 106 77 106 54" stroke="#14A89A" strokeWidth="12" />
      <path
        d="M106 54C106 31 74 31 60 54C46 77 14 77 14 54"
        stroke="#FFFFFF"
        strokeWidth="20"
        clipPath={`url(#${clipId})`}
      />
      <path d="M106 54C106 31 74 31 60 54C46 77 14 77 14 54" stroke="#B5D334" strokeWidth="12" />
      <circle cx="33" cy="15" r="9" fill="#14A89A" />
      <circle cx="88" cy="22" r="6.5" fill="#B5D334" />
    </svg>
  );
}

export function Logo({ size = "md", className }: { size?: "sm" | "md"; className?: string }) {
  const sm = size === "sm";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={sm ? "h-9 w-auto" : "h-11 w-auto"} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif font-bold tracking-tight text-[#0B4A45]",
            sm ? "text-xl" : "text-2xl sm:text-[1.7rem]"
          )}
        >
          InsureLeague
        </span>
        <span className={cn("mt-1 font-serif italic text-primary", sm ? "text-xs" : "text-sm")}>
          Securing Lives
        </span>
      </span>
    </span>
  );
}
