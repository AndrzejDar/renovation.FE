import React from "react";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { useStoreActions, useStoreState } from "@/store/hooks";
import MyProfile from "./MyProfile";
import DecorativeLink from "../DecorativeLink";
import { Button } from "../ui/button";
import { useMutation } from "react-query";
import AuthService from "@/services/authService";
import { useRouter } from "next/navigation";
import RemoveAccountConfirmation from "./RemoveAccountConfirmation";

const RemoveAccount = () => {
  const setDialogContent = useStoreActions(
    (store) => store.app.setDialogContent
  );

  const userId = useStoreState((store) => store.auth.user?.id) ?? 0;

  const setRequestLoading = useStoreActions(
    (store) => store.app.setRequestLoading
  );

  const { mutate: removeAccountMutation } = useMutation(
    AuthService.RemoveUserAccount(userId),
    {
      onSuccess: (data) => {
        console.log("changeUserPassword mutation success");
        setDialogContent(() => <RemoveAccountConfirmation />);
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
        console.log("changeUserPassword mutation error");
        console.log(e);
      },
    }
  );

  const handleRemove = () => {
    removeAccountMutation();
  };

  return (
    <>
      <DialogHeader className="pt-6">
        <DialogTitle className="text-3xl font-bold mb-6">
          Usuń konto
        </DialogTitle>
      </DialogHeader>
      <p>Czy napewno chcesz usunąć konto?</p>
      <div className="w-full flex-row flex justify-end mt-9 gap-10 items-center">
        <div
          onClick={() => {
            setDialogContent(() => <MyProfile />);
          }}
        >
          <DecorativeLink href="">Anuluj</DecorativeLink>
        </div>
        <Button
          size="lg"
          onClick={handleRemove}
          className="bg-secondary justify-end hover:bg-secondary/75"
        >
          Usuń konto
        </Button>
      </div>
    </>
  );
};

export default RemoveAccount;
