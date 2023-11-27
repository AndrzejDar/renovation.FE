"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useStoreState } from "@/store/hooks";

import { cn } from "@/app/lib/utils";
import { UsersFilter } from "@/lib/types";

interface UsersFilterFormProps {
  setCurrVals: React.Dispatch<React.SetStateAction<UsersFilter | undefined>>;
  className?: string;
}

const UsersFilterForm = ({ setCurrVals, className }: UsersFilterFormProps) => {
  const defaultVaules = {
    email: "",
  };
  // const defaultVaules = undefined;

  const formMethods = useForm({
    defaultValues: defaultVaules,
  });

  const { reset, control, watch } = formMethods;

  useEffect(() => {
    const subscription = watch((value) => setCurrVals(value));
    return () => subscription.unsubscribe();
  }, [watch, setCurrVals]);

  const searchShow = useStoreState((store) => store.app.searchShow);
  useEffect(() => {
    if (searchShow === false) reset();
  }, [searchShow, reset]);

  return (
    <Form {...formMethods}>
      <form
        className={cn("min-w-[640px] py-1", className)}
        onSubmit={(e) => e.preventDefault()}
      >
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-4 space-y-0 flex-grow min-w-[465px] max-w-[465px]">
              <FormLabel className="text-base font-medium text-gray-400">
                Wyszukaj po adresie email:
              </FormLabel>
              <FormControl>
                <Input {...field} className="min-w-[200px] h-[60px]"></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
      </form>
    </Form>
  );
};

export default UsersFilterForm;
