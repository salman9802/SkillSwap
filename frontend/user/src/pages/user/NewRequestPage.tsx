import React from "react";
import { MdDeleteOutline } from "react-icons/md";

import ToggleGroup from "@/components/user/ToggleGroup";
import Section from "@/components/utils/Section";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFetchDetailsQuery } from "@/features/account/accountApi";
import { SERVER_URL } from "@/features/api";
import SkeletonLoader from "@/components/utils/SkeletonLoader";
import DateTimePicker from "@/components/utils/DateTimePicker";
import { useCreateSkillswapRequestMutation } from "@/features/skillswap-request/skillswapRequestApi";
import Loader from "@/components/utils/Loader";

const NewRequestPage = () => {
  const [newDate, setNewDate] = React.useState<Date>();
  const [skillswapRequest, setSkillswapRequest] = React.useState<{
    requestedSkill: string;
    availability: { date: Date }[];
  }>({
    requestedSkill: "",
    availability: [],
  });

  const {
    data: userDetails,
    refetch: refetchUser,
    isLoading: isUserLoading,
  } = useFetchDetailsQuery();
  const [createSkillswapRequest, { isLoading: isCreatingSkillswapRequest }] =
    useCreateSkillswapRequestMutation();

  const handleAddAvailability = () => {
    if (newDate)
      setSkillswapRequest((prev) => ({
        ...prev,
        availability: [...prev.availability, { date: newDate }],
      }));
    setNewDate(undefined);
  };

  const handleDeleteAvailability = (availability: { date: Date }) => {
    // setAvailability((prev) => prev.filter((a) => a !== availability));
    setSkillswapRequest((prev) => ({
      ...prev,
      availability: prev.availability.filter(
        (a) => a.date !== availability.date,
      ),
    }));
  };

  // const handleUpdateAvailability = (index: number) => {
  //   setNewDate(undefined);
  // };

  const handlePublishRequest = async () => {
    if (
      skillswapRequest.requestedSkill.length === 0 ||
      skillswapRequest.availability.length === 0 ||
      skillswapRequest.availability.length > 5
    ) {
      alert("Please select requested skill and have availability between 1-5");
      return;
    }

    try {
      const res = await createSkillswapRequest(skillswapRequest).unwrap();
      console.log(res);
    } catch (error) {
      console.error(error);
    }

    setSkillswapRequest({ requestedSkill: "", availability: [] });
  };

  return (
    <div className="container mx-auto flex flex-col gap-10 text-xl">
      {/* Name */}
      <Section className="flex w-full flex-col items-start justify-between gap-4">
        <h1 className="pb-6 text-xl md:text-2xl lg:text-3xl">
          New Skillswap Request
        </h1>
        <Section.Title className="flex flex-col gap-2">
          <span className="text-xl font-semibold text-gray-900">Name</span>
          <p className="text-base text-gray-600">
            Cannot be edited from here. Go to profile to change your display
            name
          </p>
        </Section.Title>
        <Section.Content className="flex w-full items-center gap-3 [&>*]:my-3">
          <Avatar className="size-12">
            <AvatarImage
              src={`${SERVER_URL}${userDetails?.user.picture}`}
              alt="@shadcn"
            />
            <AvatarFallback>
              {getInitials(userDetails?.user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="font-medium text-gray-700">
            {userDetails?.user.name}
          </div>
        </Section.Content>
      </Section>
      {/* Requested skill */}
      <Section className="flex w-full flex-col items-start justify-between gap-4">
        <Section.Title className="flex w-full flex-col gap-2">
          <span className="text-xl font-semibold text-gray-900">
            Requested skill <sup className="text-xl text-red-500">*</sup>
          </span>
          <p className="text-base text-gray-600">
            Skill you want to learn. (Only one can be selected)
          </p>
        </Section.Title>
        <Section.Content className="w-full [&>*]:py-3">
          {isUserLoading && (
            <div className="flex gap-3">
              {Array.from({ length: 5 }, (_, i) => (
                <SkeletonLoader key={i} className="h-lh w-1/12" />
              ))}
            </div>
          )}
          {userDetails !== undefined && (
            <ToggleGroup
              className="[&>*]:cursor-pointer"
              options={userDetails.user.requestedSkills}
              selected={
                skillswapRequest.requestedSkill.length > 0
                  ? [skillswapRequest.requestedSkill]
                  : []
              }
              onChange={(selection) => {
                setSkillswapRequest((prev) => ({
                  ...prev,
                  requestedSkill: selection[0],
                }));
              }}
            />
          )}
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
          {isUserLoading && (
            <div className="flex gap-3">
              {Array.from({ length: 5 }, (_, i) => (
                <SkeletonLoader key={i} className="h-lh w-1/12" />
              ))}
            </div>
          )}
          {userDetails !== undefined && (
            <ToggleGroup
              className="[&>*]:bg-gray-100 [&>*]:text-gray-400 [&>*]:hover:bg-gray-100 [&>*]:hover:text-gray-400"
              options={userDetails.user.offeredSkills}
              selected={[]}
              onChange={() => {}}
            />
          )}
        </Section.Content>
      </Section>
      {/* Availability schedule */}
      <Section className="flex w-full flex-col items-start justify-between gap-4">
        <Section.Title className="flex flex-col gap-2">
          <span className="text-xl font-semibold text-gray-900">
            Availability <sup className="text-xl text-red-500">*</sup>
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
          {skillswapRequest.availability.map((a, i) => (
            <div key={i} className="flex flex-col text-lg md:flex-row">
              <div className="flex-[1] font-medium text-gray-800">
                {/* 16 May, 2025 */}
                {a.date.toDateString()}
              </div>
              <div className="flex flex-[2] items-center">
                {/* <div className="grow text-base">12:00, 13:00, 16:00</div> */}
                <div className="grow text-base">
                  {a.date.toLocaleTimeString()}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteAvailability(a)}
                    className="cursor-pointer text-red-500 hover:text-red-400"
                  >
                    <MdDeleteOutline className="size-5" />
                  </button>
                  {/* <AvailabilityUpdateAlertDialog
                    trigger={
                      <Button
                        onClick={() => handleUpdateAvailability(i)}
                        className="hover:bg-accent cursor-pointer"
                        variant="link"
                      >
                        Update
                      </Button>
                    }
                  >
                    <DateTimePicker
                      date={newDate}
                      onValueChange={(date) => setNewDate(date)}
                      className="w-fit [&>*]:cursor-pointer"
                    />
                  </AvailabilityUpdateAlertDialog> */}
                </div>
              </div>
            </div>
          ))}

          <div className="flex gap-3">
            <DateTimePicker
              date={newDate}
              onValueChange={(date) => setNewDate(date)}
              className="w-fit shadow-lg [&>*]:cursor-pointer"
            />

            <Button
              variant="link"
              onClick={handleAddAvailability}
              disabled={newDate === undefined}
              className="cursor-pointer font-bold"
            >
              + Add date & time
            </Button>
          </div>
        </Section.Content>
      </Section>
      {/* Timezone */}
      {/* <Section className="flex w-full flex-col items-start justify-between gap-4">
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
      </Section> */}
      {/* Action buttons */}
      <div className="my-12 flex items-center justify-end gap-6">
        {/* <Button className="cursor-pointer" variant="outline">
          Back
        </Button> */}
        <Button
          disabled={
            skillswapRequest.requestedSkill.length === 0 ||
            skillswapRequest.availability.length === 0
          }
          onClick={handlePublishRequest}
          className="cursor-pointer"
        >
          {isCreatingSkillswapRequest ? (
            <Loader className="size-5" />
          ) : (
            "Publish Skillswap request"
          )}
        </Button>
      </div>
    </div>
  );
};

export default NewRequestPage;
