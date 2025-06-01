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
import { useFetchDetailsQuery } from "@/features/account/accountApi";
import { setDetails } from "@/features/account/accountSlice";
import Loader from "@/components/utils/Loader";
import { getInitials } from "@/lib/utils";
import SkeletonLoader from "@/components/utils/SkeletonLoader";

const ProfilePage = () => {
  // TODO: update modals
  // TODO: update values
  // TODO: update picture

  // const userId = useSelector((state: StoreState) => state.session.user?.id);
  const {
    data,
    isLoading: isLoadingDetails,
    isSuccess,
    isError,
  } = useFetchDetailsQuery();

  // React.useEffect(() => {
  //   if (userDetails) setDetails(userDetails);
  // }, [userDetails]);

  return (
    <div className="container mx-auto flex flex-col gap-20">
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
                  <AvatarFallback>
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
              <Button className="hover:bg-accent cursor-pointer" variant="link">
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
              <Button className="hover:bg-accent cursor-pointer" variant="link">
                Update
              </Button>
            </div>
          </div>
          {/* Password */}
          <div className="flex w-full flex-col md:flex-row">
            <div className="flex-[1] font-medium text-gray-800">Password</div>
            <div className="flex flex-[2] items-center">
              <div className="grow">********</div>
              <Button className="hover:bg-accent cursor-pointer" variant="link">
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
              <Button className="hover:bg-accent cursor-pointer" variant="link">
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
              <Button className="hover:bg-accent cursor-pointer" variant="link">
                Update
              </Button>
            </div>
          </div>
        </Section.Content>
      </Section>
      {/* Offered Skills */}
      <Section>
        <Section.Title className="flex flex-col gap-2">
          <h3 className="text-lg md:text-xl lg:text-2xl">Offered Skills</h3>
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
            ? Array(3).fill(<SkeletonLoader className="mb-2 h-lh w-full" />)
            : data?.user.offeredSkills.map((skill, i) => (
                <div key={i} className="flex w-full items-center">
                  <div className="flex-[1] font-medium text-gray-800">
                    {skill}
                  </div>
                  <Button
                    className="hover:bg-accent cursor-pointer"
                    variant="link"
                  >
                    Update
                  </Button>
                </div>
              ))}
          <Button
            variant="link"
            className="hover:bg-accent cursor-pointer font-bold"
          >
            + Add another skill
          </Button>
        </Section.Content>
      </Section>
      {/* Requested Skills */}
      <Section>
        <Section.Title className="flex flex-col gap-2">
          <h3 className="text-lg md:text-xl lg:text-2xl">Requested Skills</h3>
          <p className="text-gray-600">Skills you want from others. (Upto 5)</p>
        </Section.Title>
        <Section.Content className="flex flex-col items-start [&>*]:px-3 [&>*]:py-1.5 md:[&>*]:px-6 md:[&>*]:py-3 lg:[&>*]:px-12 lg:[&>*]:py-6">
          {/* Skill */}
          {isLoadingDetails
            ? Array(3).fill(<SkeletonLoader className="mb-2 h-lh w-full" />)
            : data?.user.requestedSkills.map((skill, i) => (
                <div key={i} className="flex w-full items-center">
                  <div className="flex-[1] font-medium text-gray-800">
                    {skill}
                  </div>
                  <Button
                    className="hover:bg-accent cursor-pointer"
                    variant="link"
                  >
                    Update
                  </Button>
                </div>
              ))}
          <Button
            variant="link"
            className="hover:bg-accent cursor-pointer font-bold"
          >
            + Add another skill
          </Button>
        </Section.Content>
      </Section>
    </div>
  );
};

export default ProfilePage;
