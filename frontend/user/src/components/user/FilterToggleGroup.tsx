import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FilterToggleGroupPropsType = {
  className?: string;
  options: string[];
  selected: string[];
  onChange: (selection: string[]) => void;
};

const FilterToggleGroup = ({
  className,
  options,
  selected,
  onChange,
}: FilterToggleGroupPropsType) => {
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
            "shrink-0 rounded-full px-4 py-2 text-sm transition-colors",
            selected.includes(option)
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background text-foreground",
          )}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

export default FilterToggleGroup;
