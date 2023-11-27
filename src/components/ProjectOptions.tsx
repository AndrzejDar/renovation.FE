import React from "react";
import Dots from "@/assets/icons/dots_h.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Edit from "@/assets/icons/edit.svg";
import Link from "@/assets/icons/link.svg";
import Info from "@/assets/icons/info.svg";
import Trash from "@/assets/icons/trash.svg";
import Archive from "@/assets/icons/archive.svg";
import { Button } from "./ui/button";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import DataService from "@/services/dataService";
import { useStoreActions } from "@/store/hooks";
import EditProjectDialog from "./DialogContent/EditProjectDialog";
import { cn } from "@/app/lib/utils";
import { ProjectData } from "@/lib/validations/project.schema";
import ConfirmOperation from "./DialogContent/ConfirmOperation";
import ProjectDetails from "./DialogContent/ProjectDetails";

const ProjectOptions = ({
  data,
  className,
}: {
  data: ProjectData;
  className: string;
}) => {
  const queryClient = useQueryClient();

  const { mutate: deleteMutation } = useMutation(
    DataService.projects.deleteProject(data.id),
    {
      onSettled: () => {
        queryClient.invalidateQueries("projects");
      },
    }
  );
  const { mutate: archiveMutation } = useMutation(
    DataService.projects.archiveProject(data.id),
    {
      onSettled: () => {
        queryClient.invalidateQueries("projects");
      },
    }
  );

  const toggleDialog = useStoreActions((store) => store.app.toggleDialogOpen);
  const setDialogContent = useStoreActions(
    (store) => store.app.setDialogContent
  );

  const deleteHandler = () => {
    setDialogContent(() => (
      <ConfirmOperation
        action={() => {
          deleteMutation();
          toggleDialog(false);
          queryClient.invalidateQueries("projects");
        }}
        cancelAction={() => toggleDialog(false)}
        label={`Potwierdź usunięcie projektu: "${data.name}"`}
        confirmLabel="Usuń projekt"
      />
    ));
    toggleDialog(true);

    // deleteMutation();
  };
  const archiveHandler = () => {
    archiveMutation();
  };
  const copyLinkHandler = () => {
    const link = process.env.NEXT_PUBLIC_CONFIGURATOR_URL + "/" + data.uuid;
    try {
      navigator.clipboard.writeText(link);
    } catch {
      (e: any) => {
        throw e;
      };
    }
  };

  const openInfoHandler = () => {
    setDialogContent(() => <ProjectDetails data={data} />);
    toggleDialog(true);
  };

  const editHandler = () => {
    setDialogContent(() => <EditProjectDialog data={data} />);
    toggleDialog(true);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <div
          className={cn(
            "w-[56px] h-[59px] rounded-[20px] flex items-center hover:bg-gray-200 transition-all justify-center bg-white text-primary fill-primaryhover:fill-secondary hover:text-secondary",
            className
          )}
        > */}
        <Button
          variant="ghost"
          className={cn(
            " w-[56px] h-[59px] rounded-[20px] flex items-center hover:bg-gray-300 transition-all justify-center bg-white text-primary fill-primaryhover:fill-secondary hover:text-secondary fill-inherit hover:fill-inherit",
            className
          )}
        >
          <Dots className="fill-inherit text-inherit hover:fill-inherit hover:text-inherit " />
        </Button>
        {/* </div> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-100 text-sm font-medium w-36">
        <DropdownMenuItem onClick={editHandler}>
          <Edit className="mr-2 h-4 w-4" />
          <span>Edytuj</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyLinkHandler}>
          <Link className="mr-2 h-4 w-4" />
          <span>Kopiuj link</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openInfoHandler}>
          <Info className="mr-2 h-4 w-4" />
          <span>Informacje</span>
        </DropdownMenuItem>
        {/* <DropdownMenuItem onClick={archiveHandler}>
          <Archive className="mr-2 h-4 w-4" />
          <span>Zarchiwizuj</span>
        </DropdownMenuItem> */}
        <DropdownMenuItem onClick={deleteHandler}>
          <Trash className="mr-2 h-4 w-4" />
          <span className="text-secondary">Usuń</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectOptions;
