import { DialogContext } from "~/contexts/dialog-context";
import { useContext } from "react";

export const useDialog = () => {
  return useContext(DialogContext);
};
