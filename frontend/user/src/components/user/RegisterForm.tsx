import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerFormSchema, type RegisterFormFields } from "@/lib/schemas";
import Loader from "../utils/Loader";

export function RegisterForm({
  className,
  onFormSubmit,
  rootError,
  isSubmitting,
  ...props
}: React.ComponentProps<"div"> & {
  onFormSubmit: (formFields: RegisterFormFields) => Promise<void>;
  rootError: string;
  isSubmitting: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormFields>({
    mode: "onChange",
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormFields> = async (formFields) => {
    await onFormSubmit(formFields);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="md:text-xl">Create a new account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {rootError.length > 0 && (
                <span className="text-red-500">{rootError}</span>
              )}
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  {...register("name")}
                  id="name"
                  type="name"
                  placeholder="Name"
                  autoComplete="off"
                />
                {errors.name && (
                  <span className="text-sm text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  autoComplete="off"
                />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="grid gap-3">
                {/* <div className="flex items-center"> */}
                <Label htmlFor="password">Password</Label>
                {/* </div> */}
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="off"
                />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full cursor-pointer"
              >
                {isSubmitting ? (
                  <Loader className="size-5" />
                ) : (
                  "Create account"
                )}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/user/login" className="underline underline-offset-4">
                Log in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
