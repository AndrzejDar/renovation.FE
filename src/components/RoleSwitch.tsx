import React, { useState } from "react";
import { Switch } from "./ui/switch";
import DataService from "@/services/dataService";
import { useMutation } from "react-query";

const RoleSwitch = ({ id, roles }: { id: number; roles: boolean }) => {
  const [checked, setChecked] = useState(roles);

  const { mutate: roleChangeMutation } = useMutation(
    DataService.users.changeUserAccess(id)
  );

  const handleChange = () => {
    setChecked((prev) => {
      roleChangeMutation(!prev);
      return !prev;
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch onCheckedChange={handleChange} checked={checked} />
    </div>
  );
};

export default RoleSwitch;
