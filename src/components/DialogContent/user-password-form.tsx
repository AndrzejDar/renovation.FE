"use client";

import {
  ChangeUserPasswordInput,
  ChangeUserPasswordSchema,
} from "@/lib/validations/user.schema";
import React, { useEffect } from "react";
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
import { useStoreActions, useStoreState } from "@/store/hooks";
import AuthService from "@/services/authService";
import DecorativeLink from "../DecorativeLink";
import MyProfile from "./MyProfile";
import ConfirmationDialog from "./ConfirmationDialog";

interface UserDataFormProps {
  className?: string;
}

const ChangeUserPasswordForm = ({ className }: UserDataFormProps) => {
  const formMethods = useForm<ChangeUserPasswordInput>({
    resolver: zodResolver(ChangeUserPasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirm: "",
    },
  });

  const setDialogContent = useStoreActions(
    (store) => store.app.setDialogContent
  );

  const setRequestLoading = useStoreActions(
    (actions) => actions.app.setRequestLoading
  );
  const userId = useStoreState((store) => store.auth.getUserId) ?? 0;

  const { mutate: changeUserPasswordMuation } = useMutation(
    AuthService.ChangeUserPassword(userId),
    {
      onSuccess: (data) => {
        console.log("changeUserPassword mutation success");
        setDialogContent(() => (
          <ConfirmationDialog
            text="Hasło zostało zmienione"
            redirect={<MyProfile />}
          />
        ));
      },
      onMutate: () => {
        //loading state
        setRequestLoading(true);
      },
      onSettled: () => {
        //finished loading state
        setRequestLoading(false);
      },
      onError: (e) => {
        //error state
        console.log("changeUserPassword mutation error");
        console.log(e);
      },
    }
  );

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

  const onSubmitHandler = (data: ChangeUserPasswordInput) => {
    changeUserPasswordMuation(data);
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} className={className}>
        <FormField
          control={control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem className="space-y-1 mb-8 flex flex-row items-center">
              <FormLabel className="text-base font-normal w-[210px]">
                Stare hasło:
              </FormLabel>
              <div className="w-full flex flex-col justify-start items-start">
                <FormControl>
                  <Input type="password" {...field}></Input>
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="space-y-1 mb-8 flex flex-row items-center">
              <FormLabel className="text-base font-normal w-[210px]">
                Nowe hasło:
              </FormLabel>
              <div className="w-full flex flex-col justify-start items-start">
                <FormControl>
                  <Input type="password" {...field}></Input>
                </FormControl>
                {/* <FormDescription>This is your email</FormDescription> */}
                <FormMessage />
              </div>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={control}
          name="confirm"
          render={({ field }) => (
            <FormItem className="space-y-1 mb-8 flex flex-row items-center">
              <FormLabel className="text-base font-normal w-[210px]">
                Powtórz hasło:
              </FormLabel>
              <div className="w-full flex flex-col justify-start items-start">
                <FormControl>
                  <Input type="password" {...field}></Input>
                </FormControl>
                {/* <FormDescription>This is your email</FormDescription> */}
                <FormMessage />
              </div>
            </FormItem>
          )}
        ></FormField>

        <div className="w-full flex-row flex justify-end mt-9 gap-10 items-center">
          <div
            onClick={() => {
              setDialogContent(() => <MyProfile />);
            }}
          >
            <DecorativeLink href="">Anuluj</DecorativeLink>
          </div>
          <Button size="lg" type="submit" className=" justify-end">
            Zmień hasło
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangeUserPasswordForm;
