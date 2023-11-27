import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { UserData } from "@/lib/types";
import RoleSwitch from "./RoleSwitch";
import IsLoadingOverlay from "./IsLoadingOverlay";

const UsersTable = ({
  data,
  isRefetching,
}: {
  data: UserData[];
  isRefetching: boolean;
}) => {
  return (
    <>
      {isRefetching && <IsLoadingOverlay />}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px] text-sm font-semibold text-black">
              ID
            </TableHead>
            <TableHead className="text-sm font-semibold text-black">
              Imię
            </TableHead>
            <TableHead className="text-sm font-semibold text-black">
              Nazwisko
            </TableHead>
            <TableHead className="text-sm font-semibold text-black">
              Email
            </TableHead>
            <TableHead className="text-sm font-semibold text-black">
              Telefon
            </TableHead>
            <TableHead className="text-sm font-semibold text-black">
              Organizacja
            </TableHead>
            <TableHead className="text-sm font-semibold text-black">
              Data dołączenia
            </TableHead>
            <TableHead className="text-sm font-semibold text-black">
              Projekty
            </TableHead>
            <TableHead className="text-sm font-semibold text-black">
              Dostęp do cennika
            </TableHead>
            {/* <TableHead className="text-sm font-semibold text-black">
              Comarch ID
            </TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((e, id) => {
            return (
              <TableRow key={id}>
                <TableCell>{e.id}</TableCell>
                <TableCell className="font-medium">{e.firstName}</TableCell>
                <TableCell className="font-medium">{e.lastName}</TableCell>
                <TableCell className="font-medium">{e.email}</TableCell>
                <TableCell>{e.phoneNumber || "-"}</TableCell>
                <TableCell className="font-medium">
                  {e.organisation || "-"}
                </TableCell>
                <TableCell>{e.createdAt}</TableCell>
                <TableCell>{e.totalProjects}</TableCell>
                <TableCell>
                  <RoleSwitch id={e.id} roles={e.comarch} />
                </TableCell>
                {/* <TableCell>{e?.commarchId || "-"}</TableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default UsersTable;
