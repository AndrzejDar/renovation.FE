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
import { Button } from "@/components/ui/button";
import { useStoreState } from "@/store/hooks";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format, parseISO } from "date-fns";
import { Calendar } from "./ui/calendar";
import CalendarIcon from "@/assets/icons/calendar.svg";
import { cn } from "@/app/lib/utils";
import Tags from "./Tags";
import { ProjectFilter, defaultProjectFilterValues } from "@/lib/types";

interface ProjectFilterFormProps {
  setCurrVals: React.Dispatch<React.SetStateAction<ProjectFilter>>;
  className?: string;
}

const ProjectFilterForm = ({
  setCurrVals,
  className,
}: ProjectFilterFormProps) => {
  const formMethods = useForm({
    defaultValues: defaultProjectFilterValues,
  });

  const { reset, control, watch, setValue } = formMethods;

  const searchShow = useStoreState((store) => store.app.searchShow);
  useEffect(() => {
    if (searchShow === false) reset();
  }, [searchShow, reset]);

  useEffect(() => {
    const subscription = watch((value) => setCurrVals(value));
    return () => subscription.unsubscribe();
  }, [watch, setCurrVals]);

  let prepTags: string[] = [""];
  if (watch().tags) prepTags = watch().tags?.split(", ") ?? [""];

  return (
    <Form {...formMethods}>
      <form
        className={cn("min-w-[640px] py-1", className)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex flex-row gap-x-10 gap-y-4 flex-wrap mb-4">
          <FormField
            control={control}
            name="fromDate"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-4 space-y-0">
                <FormLabel className="font-medium text-base text-gray-500">
                  Od:
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[170px] min-w-[170px] h-[60px] text-left font-normal flex flex-row items-center justify-start rounded-sm bg-gray-100 mt-0",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="h-5 w-5 ml-1 mr-4" />
                        {field.value ? (
                          format(new Date(field.value), "dd-MM-yyyy")
                        ) : (
                          <span>__-__-____</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("2000-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="toDate"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-4 space-y-0">
                <FormLabel className="font-medium text-base text-gray-500">
                  Do:
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[170px] min-w-[170px] h-[60px] text-left font-normal flex flex-row items-center justify-start rounded-sm bg-gray-100 mt-0",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="h-5 w-5 ml-1 mr-4" />
                        {field.value ? (
                          format(new Date(field.value), "dd-MM-yyyy")
                        ) : (
                          <span>__-__-____</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="customer"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-4 space-y-0 flex-grow min-w-[465px] max-w-[465px]">
                <FormLabel className="text-base font-normal">Klient:</FormLabel>
                <FormControl>
                  <Input {...field} className="min-w-[200px] h-[60px]"></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-4 space-y-0 flex-grow min-w-[465px] max-w-[465px]">
                <FormLabel className="text-base font-normal">
                  Nazwa projektu:
                </FormLabel>
                <FormControl>
                  <Input {...field} className="min-w-[170px] h-[60px] "></Input>
                </FormControl>
                {/* <FormDescription>This is your email</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        </div>
        <FormField
          control={control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-4 space-y-0 flex-grow max-w-[1520px] flex-wrap">
              <div className="min-w-[465px] flex flex-row items-center gap-4">
                <FormLabel className="text-base font-normal">Tagi:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="tagi..."
                    {...field}
                    className="h-[60px] max-w-[414px]"
                  ></Input>
                </FormControl>
              </div>
              <Tags
                setValue={setValue}
                selectedTags={prepTags}
                className="flex gap-2"
              />
            </FormItem>
          )}
        ></FormField>
      </form>
    </Form>
  );
};

export default ProjectFilterForm;
