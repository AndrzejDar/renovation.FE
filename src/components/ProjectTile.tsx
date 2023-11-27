import { projectTile } from "@/lib/types";
import Image from "next/image";
import React from "react";
import ProjectOptions from "./ProjectOptions";
import placeholder from "@/assets/misc/placeholder.jpg";
import { ProjectData } from "@/lib/validations/project.schema";

const ProjectTile = ({ data }: { data: ProjectData }) => {
  const projectLink = `${process.env.NEXT_PUBLIC_CONFIGURATOR_URL}/${data.uuid}`;
  const coverImageSrc = `${process.env.NEXT_PUBLIC_API_URL}/${data.imagePath}`;

  return (
    <div className="hover:scale-[1.02] min-w-[300px] max-w-[300px] min-h-[260px] max-h-[260px] bg-gray-200 rounded-[30px] flex flex-col gap-[10px] items-center justify-center p-[10px] transition-all overflow-hidden ">
      <a
        href={projectLink}
        className="rounded-[20px] relative overflow-hidden group"
      >
        <Image
          // src={data.imagePath.startsWith("http") ? data.imagePath : placeholder}
          src={coverImageSrc}
          alt=""
          // fill={true}
          width={280}
          height={175}
          priority
          // className="w-fill"
        />
      </a>
      <div className="flex flex-row gap-[10px] w-full">
        <a
          href={projectLink}
          className="bg-white rounded-[20px] h-[59px] text-sm flex-col flex justify-center flex-grow px-2 whitespace-nowrap  overflow-x-clip"
        >
          <h4 className="font-extrabold">{data.name}</h4>
          <p>{`(${data?.createdAt} ${
            data.customer ? ", " + data.customer : ""
          })`}</p>
        </a>
        <ProjectOptions data={data} className={"group-hover:bg-red-200"} />
      </div>
    </div>
  );
};

export default ProjectTile;
