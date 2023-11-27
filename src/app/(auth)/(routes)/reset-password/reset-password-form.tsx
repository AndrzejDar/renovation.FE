"use client";

import {
  ResetUserPasswordInput,
  ResetUserPasswordSchema,
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStoreActions } from "@/store/hooks";
import Image from "next/image";
import Profile from "@/assets/icons/profile.svg";
import AuthService from "@/services/authService";
import { useRouter } from "next/navigation";
import ConfirmationDialog from "@/components/DialogContent/ConfirmationDialog";

interface ResetUserPasswordFormProps {
  className: string;
}

const ResetPasswordForm = ({ className }: ResetUserPasswordFormProps) => {
  const formMethods = useForm<ResetUserPasswordInput>({
    resolver: zodResolver(ResetUserPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { push } = useRouter();

  const setDialogContent = useStoreActions(
    (actions) => actions.app.setDialogContent
  );
  const toggleDialogOpen = useStoreActions(
    (actions) => actions.app.toggleDialogOpen
  );

  const setRequestLoading = useStoreActions(
    (actions) => actions.app.setRequestLoading
  );

  // const resetUserPassword = useStoreActions((actions) => actions.auth.);
  const { mutate: requestResetUserPasswordMuation } = useMutation(
    AuthService.RequestResetUserPassword,
    {
      onSuccess: (data) => {
        console.log("resetUserPassword mutation success");
        // push("/sign-in");
        setDialogContent(() => (
          <ConfirmationDialog
            text="Na wskazany adres, jeżeli znajduje się w naszej bazie użytkowników, został wysłany mail z linkiem do zresetowania hasła"
            redirect={"/sign-in"}
            autoclose={false}
            className="text-xl"
          />
        ));
        toggleDialogOpen(true);
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
        console.log("signIn mutation error");
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

  const onSubmitHandler = (data: ResetUserPasswordInput) => {
    requestResetUserPasswordMuation(data);
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} className={className}>
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-6">
              <FormControl>
                <Input placeholder="username@gmail.com" {...field}>
                  <Profile alt="" />
                </Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <Button size="full" type="submit" className="mt-9">
          Zresetuj hasło
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
