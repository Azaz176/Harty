export { cn } from "./lib/cn";

// Core primitives
export { Text } from "./text";
export { Button, type ButtonProps } from "./button";
export { Input, type InputProps } from "./input";
export { Chip, type ChipProps } from "./chip";
export { Skeleton } from "./skeleton";

// Compound components — exported as namespace objects
export { Sheet } from "./sheet";
export { Drawer } from "./drawer";
export { Dialog } from "./dialog";
export { Toaster, toast } from "./toast";

// Re-export compound components with prefixed names for direct import
export {
  Root as SelectRoot,
  Trigger as SelectTrigger,
  Content as SelectContent,
  Item as SelectItem,
  Label as SelectLabel,
  Group as SelectGroup,
  Value as SelectValue,
  Separator as SelectSeparator,
} from "./select";

export {
  Root as TabsRoot,
  List as TabsList,
  Trigger as TabsTrigger,
  Content as TabsContent,
} from "./tabs";

export {
  Root as AccordionRoot,
  Item as AccordionItem,
  Trigger as AccordionTrigger,
  Content as AccordionContent,
} from "./accordion";

export {
  Provider as TooltipProvider,
  Root as TooltipRoot,
  Trigger as TooltipTrigger,
  Content as TooltipContent,
  Arrow as TooltipArrow,
} from "./tooltip";

// Commerce
export { ImageFrame } from "./image-frame";
export { PriceTicker } from "./price-ticker";
export { Rating } from "./rating";
export { SwatchPicker } from "./swatch-picker";
export { SizePicker } from "./size-picker";

// Motion & brand
export { Marquee } from "./marquee";
export { CursorProvider } from "./cursor";

// Aceternity-inspired effects
export * from "./aceternity";
