import React from "react";
import { useSelector } from "react-redux";
import { FaCamera } from "react-icons/fa";
import * as ct from "countries-and-timezones";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import Section from "../../components/utils/Section";
import { useStoreDispatch } from "@/lib/hooks";
import type { StoreState } from "@/features/store";
import {
  useFetchDetailsQuery,
  useUpdateMutation,
  useUploadPictureMutation,
} from "@/features/account/accountApi";
import Loader from "@/components/utils/Loader";
import { cn, getInitials } from "@/lib/utils";
import SkeletonLoader from "@/components/utils/SkeletonLoader";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { MdDeleteOutline } from "react-icons/md";
import { SERVER_URL } from "@/features/api";
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
import { countries } from "@/lib/constants";
import Combobox from "@/components/utils/Combobox";

const ProfilePage = () => {
  // TODO: optimize combobox option display
  const [open, setOpen] = React.useState(false);
  const [fieldValue, setFieldValue] = React.useState("");
  const [dialogConfig, setDialogConfig] = React.useState<{
    field: string;
    label: string;
    type: "text" | "dropdown";
    options?: string[]; // for dropdown
    regex?: RegExp;
    message?: string;
    prevValue?: string;
  } | null>(null);
  const [upload, setUpload] = React.useState<{
    preview: string;
    file: File;
  } | null>(null);
  const [locationFields, setLocationFields] = React.useState<{
    countryId: string;
    timezone: string;
  }>({ countryId: "", timezone: "" });

  const {
    data,
    refetch: detailsRefetch,
    isLoading: isLoadingDetails,
    // isSuccess,
    // isError,
  } = useFetchDetailsQuery();
  const [
    updateUser,
    {
      data: updateResponse,
      isLoading: isUpdateLoading,
      // isSuccess: isUpdateSuccess,
    },
  ] = useUpdateMutation();
  const [
    updateUser2,
    {
      data: updateResponse2,
      isLoading: isUpdateLoading2,
      // isSuccess: isUpdateSuccess2,
    },
  ] = useUpdateMutation();
  const [uploadPicture, { isLoading: pictureUploading }] =
    useUploadPictureMutation();
  const [updateUserLocation, { isLoading: isUpdatingLocation }] =
    useUpdateMutation();

  // React.useEffect(() => {
  //   if (userDetails) setDetails(userDetails);
  // }, [userDetails]);

  /** useEffect to ensure location state is set when user details are fetched */
  React.useEffect(() => {
    if (data) {
      setLocationFields({
        countryId: data.user.country ?? "",
        timezone: data.user.timezone ?? "",
      });
    }
  }, [data]);

  /** Memoized array of timezones for selected country */
  const countryTimezones = React.useMemo(() => {
    if (locationFields.countryId.length > 0) {
      // timezones for particular country

      const country = ct.getCountry(locationFields.countryId);

      if (country === undefined) return [];
      else {
        // set first timezone as user's
        setLocationFields((prev) => ({
          ...prev,
          timezone: country.timezones[0],
        }));
        return country.timezones;
      }
      // return country === undefined ? [] : country.timezones;
    } else {
      // all timezones
      return Object.keys(ct.getAllTimezones());
    }
  }, [locationFields.countryId]);

  /** request to server to update user's location info */
  React.useEffect(() => {
    (async () => {
      if (
        locationFields.countryId.length > 0 &&
        locationFields.timezone.length > 0
      ) {
        try {
          const res = await updateUserLocation({
            // country: ct.getCountry(locationFields.countryId)?.name,
            country: locationFields.countryId,
            timezone: locationFields.timezone,
          }).unwrap();
          console.log(res);
          detailsRefetch();
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [locationFields]);

  /** Handles opening and closing of shared dialog */
  const handleOpen = (
    config: typeof dialogConfig,
    currentValue: string | undefined | null,
  ) => {
    setDialogConfig(config);
    setFieldValue(typeof currentValue === "string" ? currentValue : "");
    setOpen(true);
  };

  const handleConfirm = async () => {
    if (data && dialogConfig) {
      if (
        dialogConfig.field === "offeredSkills" ||
        dialogConfig.field === "requestedSkills"
      ) {
        // send existing (data) + fieldValue
        const existingData = data.user[dialogConfig.field].filter(
          (v) => v !== dialogConfig.prevValue,
        );
        await updateUser({
          [dialogConfig.field]: existingData.concat(fieldValue),
        });
      } else {
        await updateUser({
          [dialogConfig.field]: fieldValue,
        });
      }
      console.log(updateResponse);
      detailsRefetch();
    }

    setOpen(false);
  };

  /** Deletes `skill` from `skillListName` array in `data.user` */
  const handleSkillDelete = async (skill: string, skillListName: string) => {
    if (
      (skillListName === "offeredSkills" ||
        skillListName === "requestedSkills") &&
      data
    ) {
      await updateUser2({
        [skillListName]: data.user[skillListName].filter((s) => s !== skill),
      });
      console.log(updateResponse2);
      detailsRefetch();
    }
  };

  const handlePictureUpload = async () => {
    if (upload === null) return;
    try {
      const res = await uploadPicture(upload.file).unwrap();
      console.log(res);
      setUpload(null);
      detailsRefetch();
    } catch (error) {
      console.error(error);
    }
  };

  // console.dir(`locationFields: ${locationFields}`, {depth: null});
  // console.dir(locationFields, { depth: null });
  return (
    <div className="container mx-auto flex flex-col gap-20">
      {/* Shared Dialog */}
      <AlertDialog
        open={open || isUpdateLoading || isUpdateLoading2}
        onOpenChange={setOpen}
      >
        <AlertDialogContent>
          {isUpdateLoading2 ? (
            <AlertDialogTitle>
              <Loader className="mx-auto size-24" />
            </AlertDialogTitle>
          ) : (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>{dialogConfig?.label}</AlertDialogTitle>
                <AlertDialogDescription>
                  Set <span className="lowercase">{dialogConfig?.label}</span>.
                </AlertDialogDescription>
              </AlertDialogHeader>

              {/* Dynamic Input */}
              {dialogConfig?.type === "text" && (
                <>
                  <Input
                    autoFocus={true}
                    value={fieldValue}
                    onChange={(e) => setFieldValue(e.target.value)}
                    placeholder={dialogConfig.label}
                  />
                  {dialogConfig.regex &&
                    !dialogConfig.regex?.test(fieldValue) && (
                      <span className="text-sm text-red-500">
                        {dialogConfig.message ?? "Invalid format"}
                      </span>
                    )}
                </>
              )}

              {/* {dialogConfig?.type === "dropdown" && dialogConfig.options && (
                <Popover open={isComboboxOpen} onOpenChange={setIsComboboxOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[200px] justify-between"
                    >
                      {fieldValue !== "" ? fieldValue : "Select country..."}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="z-[100] w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search country..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                          {countries.map((country, i) => (
                            <CommandItem
                              key={i}
                              value={country.name}
                              onSelect={(currentValue) => {
                                console.log(currentValue);
                                setFieldValue(
                                  currentValue === fieldValue
                                    ? ""
                                    : currentValue,
                                );
                                setIsComboboxOpen(false);
                              }}
                            >
                              {`${country.name} (${country.code})`}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  fieldValue === country.name
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
                </Popover> */}

              {/* // <Select value={fieldValue} onValueChange={setFieldValue}>
                //   <SelectTrigger>{fieldValue}</SelectTrigger>
                //   <SelectContent>
                //     {dialogConfig.options.map((opt) => (
                //       <SelectItem key={opt} value={opt}>
                //         {opt}
                //       </SelectItem>
                //     ))}
                //   </SelectContent>
                // </Select> */}

              {/* // )} */}

              <AlertDialogFooter>
                <AlertDialogCancel disabled={isUpdateLoading}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction asChild disabled={isUpdateLoading}>
                  <Button onClick={handleConfirm}>
                    {isUpdateLoading ? (
                      <Loader className="size-5" />
                    ) : (
                      "Confirm"
                    )}
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>

      {/* Profile */}
      <Section>
        <Section.Title className="flex flex-col gap-2">
          <h3 className="text-lg md:text-xl lg:text-2xl">Profile</h3>
          <p className="text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </Section.Title>
        <Section.Content className="flex flex-col [&>*]:px-3 [&>*]:py-1.5 md:[&>*]:px-6 md:[&>*]:py-3 lg:[&>*]:px-12 lg:[&>*]:py-6">
          {/* Picture */}
          <div className="mx-auto">
            {isLoadingDetails ? (
              <SkeletonLoader className="size-52 rounded-full" />
            ) : (
              <>
                <div className="relative mx-auto w-fit">
                  <Avatar className="size-52">
                    <AvatarImage
                      src={
                        upload?.preview
                          ? upload.preview
                          : `${SERVER_URL}${data?.user.picture}`
                      }
                      alt={`@${data?.user.name}`}
                    />
                    <AvatarFallback className="uppercase">
                      {getInitials(data?.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="picture"
                    className="absolute right-6 bottom-6 cursor-pointer"
                  >
                    <FaCamera className="text-primary hover:text-primary/90 size-5" />
                  </label>
                  <input
                    className="hidden"
                    type="file"
                    id="picture"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files && e.target.files[0];
                      if (file === null) return;
                      const fileReader = new FileReader();
                      fileReader.onload = function () {
                        if (typeof fileReader.result === "string") {
                          setUpload({
                            file,
                            preview: fileReader.result,
                          });
                        }
                      };
                      fileReader.readAsDataURL(file);
                    }}
                  />
                </div>
                {/* action buttons */}
                {upload !== null && (
                  <div className="mt-6 flex items-center justify-center gap-3">
                    <Button
                      disabled={pictureUploading}
                      onClick={() => setUpload(null)}
                      className="cursor-pointer"
                      variant="outline"
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={pictureUploading}
                      onClick={handlePictureUpload}
                      className="cursor-pointer"
                    >
                      {pictureUploading ? (
                        <Loader className="size-5" />
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </div>
                )}
              </>
            )}
            {/* <FaCamera className="absolute top-[75%] left-[55%] size-5 -translate-x-1/2 -translate-y-1/2 cursor-pointer text-black" /> */}
          </div>
          {/* Name */}
          <div className="flex w-full flex-col md:flex-row">
            <div className="flex-[1] font-medium text-gray-800">Name</div>
            <div className="flex flex-[2] items-center">
              <div className="grow">
                {isLoadingDetails ? (
                  <SkeletonLoader className="h-lh w-full" />
                ) : (
                  <span>{data?.user.name}</span>
                )}
              </div>
              <Button
                onClick={() =>
                  handleOpen(
                    { field: "name", label: "New name", type: "text" },
                    data?.user.name,
                  )
                }
                className="hover:bg-accent cursor-pointer"
                variant="link"
              >
                Update
              </Button>
            </div>
          </div>
          {/* Email address */}
          <div className="flex w-full flex-col md:flex-row">
            <div className="flex-[1] font-medium text-gray-800">
              Email address
            </div>
            <div className="flex flex-[2] items-center">
              <div className="grow">
                {isLoadingDetails ? (
                  <SkeletonLoader className="h-lh w-full" />
                ) : (
                  <span>{data?.user.email}</span>
                )}
              </div>
              <Button
                onClick={() =>
                  handleOpen(
                    {
                      field: "email",
                      label: "New email",
                      type: "text",
                      regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Email must be valid",
                    },
                    data?.user.email,
                  )
                }
                className="hover:bg-accent cursor-pointer"
                variant="link"
              >
                Update
              </Button>
            </div>
          </div>
          {/* Password */}
          <div className="flex w-full flex-col md:flex-row">
            <div className="flex-[1] font-medium text-gray-800">Password</div>
            <div className="flex flex-[2] items-center">
              <div className="grow">********</div>
              <Button
                onClick={() =>
                  handleOpen(
                    {
                      field: "password",
                      label: "New password",
                      type: "text",
                      regex: /^(?=.*\d).{8,}$/,
                      message:
                        "Password must be minimum of 8 characters and have at least one digit",
                    },
                    "",
                  )
                }
                className="hover:bg-accent cursor-pointer"
                variant="link"
              >
                Update
              </Button>
            </div>
          </div>
        </Section.Content>
      </Section>
      {/* Location */}
      <Section>
        <Section.Title className="flex flex-col gap-2">
          <h3 className="text-lg md:text-xl lg:text-2xl">Location</h3>
          <p className="text-gray-600">
            This information will be used for schedule timings.
          </p>
        </Section.Title>
        <Section.Content className="flex flex-col [&>*]:px-3 [&>*]:py-1.5 md:[&>*]:px-6 md:[&>*]:py-3 lg:[&>*]:px-12 lg:[&>*]:py-6">
          {/* Country */}
          <div className="flex w-full flex-col md:flex-row">
            <div className="flex-[1] font-medium text-gray-800">Country</div>
            <div className="flex flex-[2] items-center">
              <div className="grow">
                {isLoadingDetails ? (
                  <SkeletonLoader className="h-lh w-full" />
                ) : data?.user.country ? (
                  data?.user.country
                ) : (
                  <span className="text-red-500">Not set</span>
                )}
              </div>
              {isUpdatingLocation ? (
                <Loader className="size-5" />
              ) : (
                <Combobox
                  name="country"
                  value={locationFields.countryId}
                  onValueChange={(countryId) => {
                    setLocationFields((prev) => ({ ...prev, countryId }));
                  }}
                  valueList={Object.values(countries).map((c) => c.id)}
                  displayList={Object.values(countries).map(
                    (c) => `${c.name} (${c.id})`,
                  )}
                />
              )}
              {/* <Button
                onClick={() =>
                  handleOpen(
                    {
                      field: "country",
                      label: "new country",
                      type: "dropdown",
                      options: ["List of countries", "Inactive"],
                    },
                    "Inactive",
                  )
                }
                className="hover:bg-accent cursor-pointer"
                variant="link"
              >
                Update
              </Button> */}
            </div>
          </div>
          {/* Timezone */}
          <div className="flex w-full flex-col md:flex-row">
            <div className="flex-[1] font-medium text-gray-800">Timezone</div>
            <div className="flex flex-[2] items-center">
              <div className="grow">
                {isLoadingDetails ? (
                  <SkeletonLoader className="h-lh w-full" />
                ) : data?.user.timezone ? (
                  data?.user.timezone
                ) : (
                  <span className="text-red-500">Not set</span>
                )}
              </div>
              {isUpdatingLocation ? (
                <Loader className="size-5" />
              ) : (
                <Combobox
                  name="timezone"
                  value={locationFields.timezone}
                  onValueChange={(timezone) =>
                    setLocationFields((prev) => ({ ...prev, timezone }))
                  }
                  valueList={countryTimezones}
                  displayList={countryTimezones}
                />
              )}
              {/* <Button
                onClick={() =>
                  handleOpen(
                    {
                      field: "timezone",
                      label: "new timezone",
                      type: "dropdown",
                      options: ["List of timezones", "Inactive"],
                    },
                    "Inactive",
                  )
                }
                className="hover:bg-accent cursor-pointer"
                variant="link"
              >
                Update
              </Button> */}
            </div>
          </div>
        </Section.Content>
      </Section>
      {/* Offered Skills */}
      <Section>
        <Section.Title className="flex flex-col gap-2">
          <h3 className="text-lg md:text-xl lg:text-2xl">
            Offered Skills{" "}
            <span className="text-base">
              ({data?.user.offeredSkills.length})
            </span>
          </h3>
          <p className="text-gray-600">Skills you can teach others. (Upto 5)</p>
        </Section.Title>
        <Section.Content className="flex flex-col items-start [&>*]:px-3 [&>*]:py-1.5 md:[&>*]:px-6 md:[&>*]:py-3 lg:[&>*]:px-12 lg:[&>*]:py-6">
          {/* Skill */}
          {isLoadingDetails
            ? Array(3).map((v) => (
                <SkeletonLoader key={v} className="mb-2 h-lh w-full" />
              ))
            : data?.user.offeredSkills.map((skill, i) => (
                <div key={i} className="flex w-full items-center">
                  <div className="flex-[1] font-medium text-gray-800">
                    {skill}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSkillDelete(skill, "offeredSkills")}
                      className="cursor-pointer text-red-500 hover:text-red-400"
                    >
                      <MdDeleteOutline className="size-5" />
                    </button>
                    <Button
                      onClick={() =>
                        handleOpen(
                          {
                            field: "offeredSkills",
                            label: "Offered Skill",
                            type: "text",
                            prevValue: skill,
                          },
                          skill,
                        )
                      }
                      className="hover:bg-accent cursor-pointer"
                      variant="link"
                    >
                      Update
                    </Button>
                  </div>
                </div>
              ))}
          <Button
            onClick={() =>
              handleOpen(
                {
                  field: "offeredSkills",
                  label: "New offered skill",
                  type: "text",
                },
                "",
              )
            }
            disabled={
              data?.user.offeredSkills.length !== undefined &&
              data?.user.offeredSkills.length > 4
                ? true
                : false
            }
            variant="link"
            className="cursor-pointer font-bold"
          >
            + Add another skill
          </Button>
        </Section.Content>
      </Section>
      {/* Requested Skills */}
      <Section>
        <Section.Title className="flex flex-col gap-2">
          <h3 className="text-lg md:text-xl lg:text-2xl">
            Requested Skills{" "}
            <span className="text-base">
              ({data?.user.requestedSkills.length})
            </span>
          </h3>
          <p className="text-gray-600">Skills you want from others. (Upto 5)</p>
        </Section.Title>
        <Section.Content className="flex flex-col items-start [&>*]:px-3 [&>*]:py-1.5 md:[&>*]:px-6 md:[&>*]:py-3 lg:[&>*]:px-12 lg:[&>*]:py-6">
          {/* Skill */}
          {isLoadingDetails
            ? Array(3).map((v) => (
                <SkeletonLoader key={v} className="mb-2 h-lh w-full" />
              ))
            : data?.user.requestedSkills.map((skill, i) => (
                <div key={i} className="flex w-full items-center">
                  <div className="flex-[1] font-medium text-gray-800">
                    {skill}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleSkillDelete(skill, "requestedSkills")
                      }
                      className="cursor-pointer text-red-500 hover:text-red-400"
                    >
                      <MdDeleteOutline className="size-5" />
                    </button>
                    <Button
                      onClick={() =>
                        handleOpen(
                          {
                            field: "requestedSkills",
                            label: "Requested Skill",
                            type: "text",
                            prevValue: skill,
                          },
                          skill,
                        )
                      }
                      className="hover:bg-accent cursor-pointer"
                      variant="link"
                    >
                      Update
                    </Button>
                  </div>
                </div>
              ))}
          <Button
            onClick={() =>
              handleOpen(
                {
                  field: "requestedSkills",
                  label: "New requested skill",
                  type: "text",
                },
                "",
              )
            }
            disabled={
              data?.user.requestedSkills.length !== undefined &&
              data?.user.requestedSkills.length > 4
                ? true
                : false
            }
            variant="link"
            className="cursor-pointer font-bold"
          >
            + Add another skill
          </Button>
        </Section.Content>
      </Section>
    </div>
  );
};

export default ProfilePage;
