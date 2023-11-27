"use client";

import {
  ChangeUserDataInput,
  ChangeUserDataSchema,
  RegisterUserSchema,
} from "@/lib/validations/user.schema";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "react-query";
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
import {
  NewProjectDataInput,
  NewProjectDataPayload,
  NewProjectDataSchema,
  ProjectData,
} from "@/lib/validations/project.schema";
import DataService from "@/services/dataService";
import ErrorDialog from "./ErrorDialog";
import Tags from "../Tags";

interface ProjectDataFormProps {
  className?: string;
  initData?: ProjectData;
  // succes: {
  //   setSucces: React.Dispatch<React.SetStateAction<Boolean>>;
  //   setMail: React.Dispatch<React.SetStateAction<string>>;
  // };
}

const NewProjectDataForm = ({ className, initData }: ProjectDataFormProps) => {
  // const user = useStoreState((store) => store.auth.user);
  // const userId = useStoreState((store) => store.auth.getUserId);

  const defultVaules = {
    name: "",
    customer: "",
    description: "",
    tags: "",
  };

  const formMethods = useForm<NewProjectDataInput>({
    resolver: zodResolver(NewProjectDataSchema),
    defaultValues: !initData
      ? defultVaules
      : { ...initData, tags: initData.tags.join(", ") },
  });

  const queryClient = useQueryClient();

  const toggleDialogOpen = useStoreActions(
    (store) => store.app.toggleDialogOpen
  );

  const setDialogContent = useStoreActions(
    (store) => store.app.setDialogContent
  );

  const setRequestLoading = useStoreActions(
    (actions) => actions.app.setRequestLoading
  );

  const { mutate: createNewProjectMutation } = useMutation(
    DataService.projects.createNewProject(),
    {
      onSuccess: async (data: ChangeUserDataInput) => {
        queryClient.invalidateQueries("projects");
        setDialogContent(() => (
          <ConfirmationDialog
            text="Nowy projekt został utworzony"
            redirect="/dashboard"
          />
        ));
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

  const { mutate: editProjectMutation } = useMutation(
    DataService.projects.editProject(initData ? initData.id : 0),
    {
      onSuccess: async (data: ChangeUserDataInput) => {
        queryClient.invalidateQueries("projects");
        setDialogContent(() => (
          <ConfirmationDialog
            text="Projekt został zmieniony"
            redirect="/dashboard"
          />
        ));
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
        setDialogContent(() => (
          <ErrorDialog text="Wystąpił błąd" redirect="/dashboard" />
        ));
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
    watch,
    setValue,
  } = formMethods;

  useEffect(() => {
    if (isSubmitSuccessful) reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler = (data: NewProjectDataInput) => {
    let parsedData: NewProjectDataPayload = {
      ...data,
      tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
    };
    if (!initData) createNewProjectMutation(parsedData);
    else editProjectMutation(parsedData);
  };

  let prepTags: string[] = [""];
  if (watch().tags) prepTags = watch().tags?.split(", ") ?? [""];

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} className={className}>
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1 mb-8 flex flex-row items-center">
              <FormLabel className="text-base font-normal min-w-[160px] w-[160px]">
                Nazwa projektu:
              </FormLabel>
              <FormControl>
                <Input placeholder="Mój projekt" {...field}></Input>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={control}
          name="customer"
          render={({ field }) => (
            <FormItem className="space-y-1 mb-8 flex flex-row items-center">
              <FormLabel className="text-base font-normal min-w-[160px] w-[160px]">
                Nazwa klienta:
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field}></Input>
              </FormControl>
              {/* <FormDescription>This is your email</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem className="space-y-1 mb-8 flex flex-row items-center">
              <FormLabel className="text-base font-normal min-w-[160px] w-[160px]">
                Opis:
              </FormLabel>
              <FormControl>
                <Input placeholder="opis" {...field}></Input>
              </FormControl>
              {/* <FormDescription>This is your email</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={control}
          name="tags"
          render={({ field }) => (
            <FormItem className="space-y-1 mb-8 flex flex-col items-start">
              <div className="w-full space-y-1 mb-2 flex flex-row items-center">
                <FormLabel className="text-base font-normal min-w-[160px] w-[160px]">
                  Tagi:
                </FormLabel>
                <FormControl>
                  <Input placeholder="tagi..." {...field}></Input>
                </FormControl>
              </div>
              <Tags
                setValue={setValue}
                selectedTags={prepTags}
                className="ml-[160px] flex gap-1 flex-wrap"
              />
              {/* <Edit
                onClick={() => {
                  setDialogContent(() => <ChangePassword />);
                }}
                className="fill-gray-600 text-gray-600 hover:fill-secondary hover:text-secondary"
                style={{ maxWidth: "30px", maxHeight: "30px", height: "auto" }}
              /> */}
            </FormItem>
          )}
        ></FormField>

        <div className="w-full flex-row flex justify-end mt-9 gap-10 items-center">
          <div
            onClick={() => {
              toggleDialogOpen(false);
              setDialogContent(() => <></>);
            }}
          >
            <DecorativeLink href="">Anuluj</DecorativeLink>
          </div>
          <Button size="lg" type="submit" className=" justify-end">
            {!initData ? "Zapisz nowy projekt" : "Zapisz zmiany"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewProjectDataForm;
