import React from "react";

import ToggleGroup from "@/components/user/ToggleGroup";
import Section from "@/components/utils/Section";
import requestsJSON from "../../../__data/requests.json";
import type { RequestCardDataType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// NOTE: Mock data
const requests = requestsJSON as RequestCardDataType[];
const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const NewRequestPage = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <div className="container mx-auto flex flex-col gap-10 text-xl">
      {/* Name */}
      <Section className="flex w-full flex-col items-start justify-between gap-4">
        <h1 className="pb-6 text-xl md:text-2xl lg:text-3xl">New Request</h1>
        <Section.Title className="flex flex-col gap-2">
          <span className="text-xl font-semibold text-gray-900">Name</span>
          <p className="text-base text-gray-600">
            Cannot be edited from here. Go to profile to change your display
            name
          </p>
        </Section.Title>
        <Section.Content className="flex w-full items-center gap-3 [&>*]:my-3">
          {/* TODO: add profile picture */}
          <Avatar className="size-12">
            <AvatarImage src="https://github.com/shadcn.pngf" alt="@shadcn" />
            <AvatarFallback>JM</AvatarFallback>
          </Avatar>
          <div className="font-medium text-gray-700">John Marston</div>
        </Section.Content>
      </Section>
      {/* Requested skill */}
      <Section className="flex w-full flex-col items-start justify-between gap-4">
        <Section.Title className="flex w-full flex-col gap-2">
          <span className="text-xl font-semibold text-gray-900">
            Requested skill
          </span>
          <p className="text-base text-gray-600">
            Skill you want to learn. (Only one can be selected)
          </p>
        </Section.Title>
        <Section.Content className="w-full [&>*]:py-3">
          <ToggleGroup
            className="[&>*]:cursor-pointer"
            options={requests[0].skillsOffered}
            selected={[requests[0].skillsOffered[2]]}
            onChange={() => {}}
          />
        </Section.Content>
      </Section>
      {/* Offered skill */}
      <Section className="flex w-full flex-col items-start justify-between gap-4">
        <Section.Title className="flex w-full flex-col gap-2">
          <span className="text-xl font-semibold text-gray-900">
            Offered skill
          </span>
          <p className="text-base text-gray-600">
            Skill you can teach. This will be decided by the other party. (Make
            sure you know all of the below skills)
          </p>
        </Section.Title>
        <Section.Content className="w-full [&>*]:py-3">
          <ToggleGroup
            className="[&>*]:bg-gray-100 [&>*]:text-gray-400 [&>*]:hover:bg-gray-100 [&>*]:hover:text-gray-400"
            options={requests[0].skillsOffered}
            selected={[]}
            onChange={() => {}}
          />
        </Section.Content>
      </Section>
      {/* Availability schedule */}
      <Section className="flex w-full flex-col items-start justify-between gap-4">
        <Section.Title className="flex flex-col gap-2">
          <span className="text-xl font-semibold text-gray-900">
            Availability
          </span>
          <p className="text-base text-gray-600">
            Select dates and respective timings for session. (Upto 5)
          </p>
        </Section.Title>
        {/* <span className="border px-6 py-3 text-lg">16 May, 2025</span> */}
        {/* Date&Times */}
        {/* <div className="flex w-full items-center">
          <div className="flex-[1] font-medium text-gray-800">16 May, 2025</div>
          <Button className="hover:bg-accent cursor-pointer" variant="link">
            Update
          </Button>
        </div> */}
        <Section.Content className="w-full [&>*]:px-3 [&>*]:py-1.5 md:[&>*]:px-6 md:[&>*]:py-3 lg:[&>*]:px-12 lg:[&>*]:py-6">
          {/* One date&time */}
          <div className="flex flex-col text-lg md:flex-row">
            <div className="flex-[1] font-medium text-gray-800">
              16 May, 2025
            </div>
            <div className="flex flex-[2] items-center">
              <div className="grow text-base">12:00, 13:00, 16:00</div>
              <Button className="hover:bg-accent cursor-pointer" variant="link">
                Update
              </Button>
            </div>
          </div>

          <div className="flex flex-col text-lg md:flex-row">
            <div className="flex-[1] font-medium text-gray-800">
              16 May, 2025
            </div>
            <div className="flex flex-[2] items-center">
              <div className="grow text-base">12:00, 13:00, 16:00</div>
              <Button className="hover:bg-accent cursor-pointer" variant="link">
                Update
              </Button>
            </div>
          </div>
          <Button
            variant="link"
            className="hover:bg-accent cursor-pointer font-bold"
          >
            + Add another date & time
          </Button>
        </Section.Content>
      </Section>
      {/* Timezone */}
      <Section className="flex w-full flex-col items-start justify-between gap-4">
        <Section.Title className="flex flex-col gap-2">
          <span className="text-xl font-semibold text-gray-900">Timezone</span>
          <p className="text-base text-gray-600">
            This will be used for session schedules and reminders.
          </p>
        </Section.Title>
        <Section.Content className="w-full [&>*]:my-3">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {value
                  ? frameworks.find((framework) => framework.value === value)
                      ?.label
                  : "Select timezone..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search timezone..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        {framework.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === framework.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </Section.Content>
      </Section>
      {/* Action buttons */}
      <div className="my-12 flex items-center justify-end gap-6">
        {/* <Button className="cursor-pointer" variant="outline">
          Back
        </Button> */}
        <Button className="cursor-pointer">Publish request</Button>
      </div>
    </div>
  );
};

export default NewRequestPage;
