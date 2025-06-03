import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type ComboboxProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
> & {
  name?: string;
  value: string;
  onValueChange: (value: string) => any;
  valueList: string[];
  displayList: string[];
};

const Combobox = ({
  name = "value",
  value,
  onValueChange,
  valueList,
  displayList,
}: ComboboxProps) => {
  if (valueList.length !== displayList.length)
    throw new Error("`valueList` and `displayList` must be of same size.");

  const [isComboboxOpen, setIsComboboxOpen] = React.useState(false);
  const [currentDisplayValue, setCurrentDisplayValue] = React.useState("");

  React.useEffect(() => {
    setCurrentDisplayValue(
      displayList.filter((v) => v.includes(`${value}`))[0],
    );
  }, [value]);

  return (
    <Popover open={isComboboxOpen} onOpenChange={setIsComboboxOpen}>
      <PopoverTrigger className="cursor-pointer overflow-hidden" asChild>
        <Button
          variant="outline"
          role="combobox"
          //   aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {/* {value
                        ? frameworks.find(
                            (framework) => framework.value === value,
                          )?.label
                        : "Select framework..."} */}
          {currentDisplayValue !== ""
            ? currentDisplayValue
            : `Select ${name}...`}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${name}...`} className="h-9" />
          <CommandList>
            <CommandEmpty>No {name} found.</CommandEmpty>
            <CommandGroup>
              {displayList.map((displayValue, i) => (
                <CommandItem
                  key={i}
                  //   value={valueList[i]}
                  value={displayValue}
                  onSelect={(currentValue) => {
                    // onValueChange(currentValue === value ? "" : currentValue);
                    // console.log(`currentValue: ${currentValue}`);
                    // console.log(`value: ${value}`);
                    onValueChange(
                      currentValue.includes(`(${value})`) ? "" : valueList[i],
                    );
                    setIsComboboxOpen(false);
                  }}
                >
                  {displayValue}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === valueList[i] ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
