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
import InfoRecord from "../InfoRecord";
import Image from "next/image";

interface ProjectDataFormProps {
  className?: string;
  data: ProjectData;
}

const NewProjectDataForm = ({ className, data }: ProjectDataFormProps) => {
  //   let prepTags: string[] = [""];
  // prepTags = data?.tags?.split(", ") ?? [""];

  const coverImageSrc = `${process.env.NEXT_PUBLIC_API_URL}/${data.imagePath}`;

  return (
    <div className={className}>
      <Image
        className="mb-8"
        src={coverImageSrc}
        alt=""
        width={280}
        height={175}
        priority
      />
      <InfoRecord
        data={data}
        field={"name"}
        label={"Nazwa:"}
        className="font-bold"
        // dataClassName="font-bold"
      />
      <InfoRecord data={data} field={"createdAt"} label={"Utworzony:"} />
      <InfoRecord data={data} field={"customer"} label={"Klient:"} />
      <InfoRecord data={data} field={"description"} label={"Opis:"} />
      <InfoRecord data={data} field={"tags"} label={"Tagi:"} />
    </div>
  );
};

export default NewProjectDataForm;
