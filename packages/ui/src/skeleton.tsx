import { cn } from "./lib/cn";

export function Skeleton({
  className,
  style,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-paper-sunk",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:animate-[shimmer_1.5s_ease-in-out_infinite]",
        "before:bg-gradient-to-r before:from-transparent before:via-paper-raised/60 before:to-transparent",
        className
      )}
      style={style}
      {...props}
    />
  );
}

/*
  Add this to your global CSS or tokens.css:
  @keyframes shimmer {
    100% { transform: translateX(100%); }
  }
*/
