"use client";

import {
  ChangeUserDataInput,
  ChangeUserDataSchema,
  RegisterUserSchema,
} from "@/lib/validations/user.schema";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStoreActions, useStoreState } from "@/store/hooks";

import Smile from "@/assets/misc/smile.svg";
import { Checkbox } from "@/components/ui/checkbox";
import DynamicDropdownInput from "@/components/DynamicDropdownInput";
import AuthService from "@/services/authService";

import Edit from "@/assets/icons/edit.svg";
import DecorativeLink from "../DecorativeLink";
import RemoveAccount from "./RemoveAccount";
import ChangePassword from "./ChangePassword";
import { User } from "@/store/AuthStore";
import MyProfile from "./MyProfile";
import ConfirmationDialog from "./ConfirmationDialog";
import { UserData } from "@/lib/types";

interface UserDataFormProps {
  className?: string;
  // succes: {
  //   setSucces: React.Dispatch<React.SetStateAction<Boolean>>;
  //   setMail: React.Dispatch<React.SetStateAction<string>>;
  // };
}

const ChangeUserDataForm = ({ className }: UserDataFormProps) => {
  const user = useStoreState((store) => store.auth.user);
  const userId = useStoreState((store) => store.auth.getUserId);

  const formMethods = useForm<ChangeUserDataInput>({
    resolver: zodResolver(ChangeUserDataSchema),
    defaultValues: {
      firstName: user?.firstName ? user.firstName : "",
      lastName: user?.lastName ? user.lastName : "",
      email: user?.email ? user.email : "",
      phoneNumber: user?.phoneNumber ? user.phoneNumber : "",
      organisation: user?.organisation ? user.organisation : "",
      country: user?.country ? user.country : "",
    },
  });

  const handleDropdownSelect = (e: any, id: any) => {
    if (e.value) formMethods.setValue(id, e.value);
  };

  const setDialogContent = useStoreActions(
    (store) => store.app.setDialogContent
  );

  // const [optionalVisible, setOptionalVisible] = useState(false);

  const setRequestLoading = useStoreActions(
    (actions) => actions.app.setRequestLoading
  );

  const [optionalVisible, setOptionalVisible] = useState(false);

  const updateUser = useStoreActions((store) => store.auth.updateUserData);
  const userName = useStoreState((store) => store.auth.user?.firstName);

  // const signUpUser = useStoreActions((actions) => actions.auth.signUpUser);
  const { mutate: changeUserDataMuation } = useMutation(
    AuthService.ChangeUserData(userId),
    {
      onSuccess: async (res) => {
        if (user?.email === res?.payload?.email) updateUser();
        setDialogContent(() => {
          if (user?.email === res?.payload?.email) {
            return (
              <ConfirmationDialog
                text="Dane użytkownika zostały zmienione"
                redirect={<MyProfile />}
              />
            );
          } else
            return (
              <ConfirmationDialog
                text="Adres mail użytkonika został zmieniony, zaloguj się ponownie z jego wykorzystaniem"
                // redirect={<MyProfile />}
                onClose={() => {
                  updateUser();
                }}
              />
            );
        });
        console.log("changeUserData mutation success");
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
        console.log("changeUserData mutation error");
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
    console.log("user in context changed", user);
    reset();
  }, [user, reset]);

  useEffect(() => {
    if (isSubmitSuccessful) reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler = (data: ChangeUserDataInput) => {
    changeUserDataMuation(data);
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} className={className}>
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="space-y-1 mb-8 flex flex-row items-center">
              <FormLabel className="text-base font-normal w-[180px]">
                Imię:
              </FormLabel>
              <FormControl>
                <Input placeholder="Imię" {...field}></Input>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="space-y-1 mb-8 flex flex-row items-center">
              <FormLabel className="text-base font-normal w-[180px]">
                Nazwisko:
              </FormLabel>
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
            <FormItem className="space-y-1 mb-8 flex flex-row items-center">
              <FormLabel className="text-base font-normal w-[180px]">
                Email:
              </FormLabel>
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
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1 mb-8 flex flex-row items-center">
              <FormLabel className="text-base font-normal w-[140px]">
                Hasło:
              </FormLabel>
              <Edit
                onClick={() => {
                  setDialogContent(() => <ChangePassword />);
                }}
                className="fill-gray-600 text-gray-600 hover:fill-secondary hover:text-secondary"
                style={{ maxWidth: "30px", maxHeight: "30px", height: "auto" }}
              />
            </FormItem>
          )}
        ></FormField>

        {/* Optional Fields */}
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
              Edytuj dane dodatkowe
            </label>
          </div>
        </div>
        {optionalVisible && (
          <>
            <FormField
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="space-y-1 mb-8 flex flex-row items-center">
                  <FormLabel className="text-base font-normal w-[180px]">
                    Numer telefonu
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+48 123 456 789"
                      {...field}
                      className="mb-5"
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={control}
              name="organisation"
              render={({ field }) => (
                <FormItem className="space-y-1 mb-8 flex flex-row items-center">
                  <FormLabel className="text-base font-normal w-[180px]">
                    Organizacja
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Twoja firma"
                      {...field}
                      className="mb-5"
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={control}
              name="country"
              render={({ field }) => (
                <FormItem className="space-y-1 mb-8 flex flex-row items-center">
                  <FormLabel className="text-base font-normal w-[180px]">
                    Kraj
                  </FormLabel>
                  <FormControl>
                    <DynamicDropdownInput
                      endpoint={"countries"}
                      className="w-full"
                      // nameField={field.nameField}
                      id={"country"}
                      onChange={handleDropdownSelect}
                      initValueID={user?.country}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </>
        )}

        <div
          className="pt-4"
          onClick={() => {
            setDialogContent(() => <RemoveAccount />);
          }}
        >
          <DecorativeLink
            href=""
            className="text-gray-600"
            accentColor="bg-secondary group-hover:bg-secondary/75"
          >
            Usuń konto
          </DecorativeLink>
        </div>
        <div className="w-full flex-row flex justify-end">
          <Button size="lg" type="submit" className="mt-9 justify-end">
            Zmień dane
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangeUserDataForm;
