"use client";

import {
  ResetPasswordInput,
  ResetPasswordPayload,
  ResetPasswordSchema,
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
import { useStoreActions } from "@/store/hooks";
import AuthService from "@/services/authService";
import { useRouter } from "next/navigation";
import ConfirmationDialog from "@/components/DialogContent/ConfirmationDialog";

interface ChangePasswordProps {
  className: string;
  token: string;
}

const ChangePasswordForm = ({ className, token }: ChangePasswordProps) => {
  const { push } = useRouter();

  const formMethods = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirm: "",
      token: "missing token",
    },
  });

  const setDialogContent = useStoreActions(
    (actions) => actions.app.setDialogContent
  );

  const toggleDialogOpen = useStoreActions(
    (actions) => actions.app.toggleDialogOpen
  );

  const setRequestLoading = useStoreActions(
    (actions) => actions.app.setRequestLoading
  );

  const { mutate: resetPasswordMutation } = useMutation(
    AuthService.ResetUserPassword,
    {
      onSuccess: (data) => {
        // push("/sign-in");
        console.log("resetPassword mutation success");
        setDialogContent(() => (
          <ConfirmationDialog
            text="Hasło zostało utworzone"
            redirect={"/sign-in"}
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
        console.log("resetPassword mutation error", e);
        push("/sign-in");
      },
    }
  );

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
    control,
  } = formMethods;

  useEffect(() => {
    if (isSubmitSuccessful) reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful, errors]);

  const onSubmitHandler = ({ password }: ResetPasswordPayload) => {
    console.log("in onsubmitHandle");
    resetPasswordMutation({ password: password, token: token });
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} className={className}>
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1 mb-4">
              <FormLabel className="text-base font-normal">
                Nowe hasło
              </FormLabel>
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
        <Button size="full" type="submit" className="mt-9">
          Utwórz nowe hasło
        </Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
