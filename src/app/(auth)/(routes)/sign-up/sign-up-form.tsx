"use client";

import {
  RegisterUserDataInput,
  RegisterUserSchema,
} from "@/lib/validations/user.schema";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStoreActions } from "@/store/hooks";

import Smile from "@/assets/misc/smile.svg";
import { Checkbox } from "@/components/ui/checkbox";
import DynamicDropdownInput from "@/components/DynamicDropdownInput";

interface SignUpFormProps {
  className: string;
  succes: {
    setSucces: React.Dispatch<React.SetStateAction<Boolean | undefined>>;
    setMail: React.Dispatch<React.SetStateAction<string>>;
    setMsg: React.Dispatch<React.SetStateAction<string>>;
  };
}

const SignUpForm = ({ className, succes }: SignUpFormProps) => {
  const formMethods = useForm<RegisterUserDataInput>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm: "",
      phoneNumber: "",
      organisation: "",
      country: "",
    },
  });

  const handleDropdownSelect = (e: any, id: any) => {
    if (e.value) formMethods.setValue(id, e.value);
  };

  const [optionalVisible, setOptionalVisible] = useState(false);

  const setRequestLoading = useStoreActions(
    (actions) => actions.app.setRequestLoading
  );

  const signUpUser = useStoreActions((actions) => actions.auth.signUpUser);
  const { mutate: signUpUserMuation } = useMutation(signUpUser, {
    onSuccess: (data: RegisterUserDataInput) => {
      if (succes) {
        succes.setMail(data?.email);
        succes.setSucces(true);
      }
      console.log("signUp mutation success", data);
    },
    onMutate: () => {
      //loading state
      setRequestLoading(true);
    },
    onSettled: () => {
      //finished loading state
      setRequestLoading(false);
    },
    onError: (e: any) => {
      //error state
      succes.setSucces(false);
      console.log(e.response.data.error);
      succes.setMsg(e.response.data.error);
      console.log(e);
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

  const onSubmitHandler = (data: RegisterUserDataInput) => {
    signUpUserMuation(data);
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} className={className}>
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="space-y-1 mb-4">
              <FormLabel className="text-base font-normal">Imię</FormLabel>
              <FormControl>
                <Input placeholder="Imię" {...field}></Input>
              </FormControl>
              {/* <FormDescription>This is your email</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="space-y-1 mb-4">
              <FormLabel className="text-base font-normal">Nazwisko</FormLabel>
              <FormControl>
                <Input placeholder="Nazwisko" {...field}></Input>
              </FormControl>
              {/* <FormDescription>This is your email</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1 mb-4">
              <FormLabel className="text-base font-normal">Email:</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field}></Input>
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
            <FormItem className="space-y-1 mb-4">
              <FormLabel className="text-base font-normal">Hasło</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="hasło"
                  {...field}
                  className="mb-5"
                ></Input>
              </FormControl>
              {/* <FormDescription>This is your password</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={control}
          name="confirm"
          render={({ field }) => (
            <FormItem className="space-y-1 mb-6">
              <FormLabel className="text-base font-normal">
                Powtórz hasło
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="powtórz hasło"
                  {...field}
                  className="mb-5"
                ></Input>
              </FormControl>
              {/* <FormDescription>This is your password</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <div className="items-top flex space-x-2 items-center mb-4">
          <Checkbox
            id="terms1"
            checked={optionalVisible}
            onCheckedChange={() => setOptionalVisible((prev) => !prev)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="flex flex-row text-sm text-muted-foreground items-center "
            >
              Would you like to write more? We&apos;d love it!
              <Smile className="ml-3" />
            </label>
          </div>
        </div>
        {optionalVisible && (
          <>
            <FormField
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="space-y-1 mb-4">
                  <FormLabel className="text-base font-normal">
                    Numer telefonu
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+48 123 456 789"
                      {...field}
                      className="mb-5"
                    ></Input>
                  </FormControl>
                  {/* <FormDescription>This is your password</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={control}
              name="organisation"
              render={({ field }) => (
                <FormItem className="space-y-1 mb-4">
                  <FormLabel className="text-base font-normal">
                    Organizacja
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Twoja firma"
                      {...field}
                      className="mb-5"
                    ></Input>
                  </FormControl>
                  {/* <FormDescription>This is your password</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={control}
              name="country"
              render={({ field }) => (
                <FormItem className="space-y-1 mb-4">
                  <FormLabel className="text-base font-normal">Kraj</FormLabel>
                  <FormControl>
                    <DynamicDropdownInput
                      endpoint={"countries"}
                      // nameField={field.nameField}
                      id={"country"}
                      onChange={handleDropdownSelect}
                      initValueID={"PL"}
                    />
                  </FormControl>
                  {/* <FormDescription>This is your password</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </>
        )}
        <Button size="full" type="submit" className="mt-9">
          Zarejestruj
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
