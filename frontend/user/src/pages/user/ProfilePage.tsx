import { FaCamera } from "react-icons/fa";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import Section from "../../components/utils/Section";

const ProfilePage = () => {
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
          <div className="">
            <div className="relative mx-auto w-fit">
              <Avatar className="size-52">
                <AvatarImage
                  src="https://github.com/shadcn.pngf"
                  alt="@shadcn"
                />
                <AvatarFallback>SK</AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                className="hover:bg-accent absolute right-6 bottom-6 cursor-pointer"
              >
                <FaCamera className="size-5 text-black" />
              </Button>
            </div>
            {/* <FaCamera className="absolute top-[75%] left-[55%] size-5 -translate-x-1/2 -translate-y-1/2 cursor-pointer text-black" /> */}
          </div>
          {/* Name */}
          <div className="flex w-full flex-col md:flex-row">
            <div className="flex-[1] font-medium text-gray-800">Name</div>
            <div className="flex flex-[2] items-center">
              <div className="grow">John Marston</div>
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
              <div className="grow">John@marston.com</div>
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
              <div className="grow">India</div>
              <Button className="hover:bg-accent cursor-pointer" variant="link">
                Update
              </Button>
            </div>
          </div>
          {/* Timezone */}
          <div className="flex w-full flex-col md:flex-row">
            <div className="flex-[1] font-medium text-gray-800">Timezone</div>
            <div className="flex flex-[2] items-center">
              <div className="grow">India/Kolkata</div>
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
          <div className="flex w-full items-center">
            <div className="flex-[1] font-medium text-gray-800">
              Speaking French
            </div>
            <Button className="hover:bg-accent cursor-pointer" variant="link">
              Update
            </Button>
          </div>
          <Button
            variant="link"
            className="hover:bg-accent cursor-pointer font-bold"
          >
            + Add another skill
          </Button>
        </Section.Content>
      </Section>
      {/* Required Skills */}
      <Section>
        <Section.Title className="flex flex-col gap-2">
          <h3 className="text-lg md:text-xl lg:text-2xl">Required Skills</h3>
          <p className="text-gray-600">Skills you want from others. (Upto 5)</p>
        </Section.Title>
        <Section.Content className="flex flex-col items-start [&>*]:px-3 [&>*]:py-1.5 md:[&>*]:px-6 md:[&>*]:py-3 lg:[&>*]:px-12 lg:[&>*]:py-6">
          {/* Skill */}
          <div className="flex w-full items-center">
            <div className="flex-[1] font-medium text-gray-800">Fishing</div>
            <Button className="hover:bg-accent cursor-pointer" variant="link">
              Update
            </Button>
          </div>
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
