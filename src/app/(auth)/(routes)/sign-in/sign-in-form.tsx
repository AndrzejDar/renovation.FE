"use client";

import { LoginUserInput, LoginUserSchema } from "@/lib/validations/user.schema";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStoreActions } from "@/store/hooks";

import Lock from "@/assets/icons/lock.svg";
import Profile from "@/assets/icons/profile.svg";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

import Warning from "@/assets/icons/exclamation-triangle-fill.svg";

interface SignInFormProps {
  className: string;
}

const SignInForm = ({ className }: SignInFormProps) => {
  const formMethods = useForm<LoginUserInput>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState<string | null>();

  const setRequestLoading = useStoreActions(
    (actions) => actions.app.setRequestLoading
  );

  const { push } = useRouter();

  const signInUser = useStoreActions((actions) => actions.auth.signInUser);
  const { mutate: signInUserMuation } = useMutation(signInUser, {
    onSuccess: (data) => {
      console.log("signIn mutation success");
      push("/dashboard");
    },
    onMutate: () => {
      //loading state
      setRequestLoading(true);
      setError(null);
    },
    onSettled: () => {
      //finished loading state
      setRequestLoading(false);
    },
    onError: (e: AxiosError) => {
      //error state
      if (e.response?.status === 401) setError("Błędne dane logowania");
      else "Błąd logowania";
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
    control,
  } = formMethods;

  useEffect(() => {
    if (isSubmitSuccessful) reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler = (data: LoginUserInput) => {
    signInUserMuation(data);
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} className={className}>
        {error != null ? (
          <div className="w-full text-center bg-[rgba(248,215,218,1)] rounded-md flex flex-row items-center gap-2 p-4">
            <Warning />
            {error}
          </div>
        ) : null}
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-6">
              {/* <FormLabel>email</FormLabel> */}
              <FormControl>
                <Input placeholder="username@gmail.com" {...field}>
                  <Profile />
                </Input>
              </FormControl>
              {/* <FormDescription>This is your email</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-6">
              {/* <FormLabel>password</FormLabel> */}
              <FormControl>
                <Input
                  placeholder="Hasło"
                  {...field}
                  className="mb-5"
                  type="password"
                >
                  <Lock />
                </Input>
              </FormControl>
              {/* <FormDescription>This is your password</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <Button size="full" type="submit" className="mt-9">
          Zaloguj
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
