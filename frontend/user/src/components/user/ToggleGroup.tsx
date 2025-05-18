import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ToggleGroupPropsType = {
  className?: string;
  options: string[];
  selected: string[];
  onChange: (selection: string[]) => void;
};

const ToggleGroup = ({
  className,
  options,
  selected,
  onChange,
}: ToggleGroupPropsType) => {
  const toggleOption = (option: string) => {
    const newSelected = selected.includes(option)
      ? selected.filter((s) => s !== option)
      : [option, ...selected];
    onChange(newSelected);
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option, i) => (
        <Button
          key={i}
          onClick={() => toggleOption(option)}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-sm shadow-sm transition-colors",
            selected.includes(option)
              ? "toggle-group-selected bg-primary text-primary-foreground border-primary"
              : "bg-background text-foreground",
          )}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

export default ToggleGroup;
