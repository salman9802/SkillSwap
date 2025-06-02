import React from "react";
import { useSelector } from "react-redux";

import { FaCamera } from "react-icons/fa";
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
} from "@/features/account/accountApi";
import { setDetails } from "@/features/account/accountSlice";
import Loader from "@/components/utils/Loader";
import { getInitials } from "@/lib/utils";
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

const ProfilePage = () => {
  // TODO: update picture
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

  // const userId = useSelector((state: StoreState) => state.session.user?.id);
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

  // React.useEffect(() => {
  //   if (userDetails) setDetails(userDetails);
  // }, [userDetails]);

  /** Handles opening and closing of shared dialog */
  const handleOpen = (
    config: typeof dialogConfig,
    currentValue: string | undefined | null,
  ) => {
    setDialogConfig(config);
    // if (config?.field === "requestedSkill" || config?.field === "offeredSkill")
    //   if (data)
    //     data.user[`${config.field}s`] = data.user[`${config.field}s`].filter(
    //       (v) => v !== currentValue,
    //     );
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
        // data.user[dialogConfig.field] = [""];
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
      // setOpen(true)
      await updateUser2({
        [skillListName]: data.user[skillListName].filter((s) => s !== skill),
      });
      console.log(updateResponse2);
      detailsRefetch();
      // setOpen(false)
    }
  };

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

              {dialogConfig?.type === "dropdown" && dialogConfig.options && (
                <Select value={fieldValue} onValueChange={setFieldValue}>
                  <SelectTrigger>{fieldValue}</SelectTrigger>
                  <SelectContent>
                    {dialogConfig.options.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

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
              <div className="relative mx-auto w-fit">
                <Avatar className="size-52">
                  <AvatarImage
                    src={data?.user.name}
                    alt={`@${data?.user.name}`}
                  />
                  <AvatarFallback className="uppercase">
                    {getInitials(data?.user.name)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="ghost"
                  className="hover:bg-accent absolute right-6 bottom-6 cursor-pointer"
                >
                  <FaCamera className="size-5 text-black" />
                </Button>
              </div>
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
              <Button
                onClick={() =>
                  // handleOpen(
                  //   { field: "Country", label: "New country", type: "text" },
                  //   data?.user.country,
                  // )
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
              </Button>
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
              <Button
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
              </Button>
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
          {/* <div className="flex w-full items-center">
            <div className="flex-[1] font-medium text-gray-800">
              Speaking French
            </div>
            <Button className="hover:bg-accent cursor-pointer" variant="link">
              Update
            </Button>
          </div> */}
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
                  label: "New offered skill",
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
