import React, {
  type ComponentClass,
  createContext,
  createElement,
  type FC,
  type FunctionComponent,
  type ReactNode,
  useState,
} from "react";
import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import type { FieldValues } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { toast, type ExternalToast } from "sonner";

interface ModalProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

const size = {
  xs: { minWidth: "240px", maxWidth: "320px" },
  sm: { minWidth: "320px", maxWidth: "400px" },
  md: { minWidth: "400px", maxWidth: "520px" },
  lg: { minWidth: "520px", maxWidth: "720px" },
  xl: { minWidth: "720px", maxWidth: "920px" },
  "2xl": { minWidth: "920px", maxWidth: "1040px" },
};

export interface DialogProps<Params extends object = object>
  extends Pick<ModalProps, "size"> {
  title?: string;
  message?: string | ReactNode;
  params?: Params;
  handleAccept?: (data?: FieldValues) => Promise<void>;
  customComponent?: FunctionComponent<Params> | ComponentClass<Params>;
}

type ToastOptions = { message: string; data?: ExternalToast };

export interface DialogContextProps {
  open: (config: Omit<DialogProps, "customComponent" | "params">) => void;
  openConfirm: (config: Omit<DialogProps, "customComponent">) => void;
  openDeleteConfirm: (config: Pick<DialogProps, "handleAccept">) => void;
  openCustomComponent: <Props extends object = object>(
    component: FunctionComponent<Props> | FC<Props>,
    config: Omit<DialogProps<Props>, "message" | "customComponent">
  ) => void;
  close: () => void;
  closeAndEmit: (toastOptions?: ToastOptions, data?: FieldValues) => void;
}

export const DialogContext = createContext<DialogContextProps>(
  {} as DialogContextProps
);

export function DialogContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState<
    Omit<DialogProps, "customComponent"> & { custom?: boolean }
  >();
  const [customComponent, setCustomComponent] = useState<ReactNode | null>(
    null
  );
  const [modalSize, setModalSize] = useState<ModalProps["size"]>("md");
  const [sendingRequest, setSendingRequest] = useState(false);

  const handleOpen = (
    config: Omit<DialogProps, "customComponent" | "params">
  ) => {
    setModalProps(config);
    setIsOpen(true);
  };

  const handleOpenDeleteConfirm = (config: {
    handleAccept?: (data?: FieldValues) => Promise<void>;
  }) => {
    setModalProps({
      message: "Tem a certeza que deseja excluir?",
      title: "Confirma Deletar",
      handleAccept: config.handleAccept,
    });
    setModalSize("md");
    setIsOpen(true);
  };

  const handleOpenCustomComponent = <Props extends object = object>(
    component: FunctionComponent<Props>,
    config: Omit<DialogProps<Props>, "message" | "customComponent">
  ) => {
    setModalProps({
      ...config,
      custom: true,
      params: config.params as object,
      title: config.title,
      handleAccept: config.handleAccept,
    });

    setModalSize(config?.size ?? "md");
    setCustomComponent(createElement(component, config.params));
    setIsOpen(true);
  };

  const handleOpenConfirm = <Props extends object = object>(
    config: Omit<DialogProps<Props>, "customComponent">
  ) => {
    setModalProps({
      ...config,
    });
    setModalSize(config.size ?? "md");
    setIsOpen(true);
  };

  const handleClose = async (
    toastOptions?: ToastOptions,
    data?: FieldValues
  ) => {
    try {
      if (toastOptions) toast(toastOptions.message, toastOptions.data);
      setSendingRequest(true);
      await modalProps?.handleAccept?.(data);
      setTimeout(() => {
        setIsOpen(false);
        setModalProps({} as DialogProps);
        setCustomComponent(null);
      }, 300);
      setSendingRequest(false);
    } catch {}
  };

  const close = () => {
    setIsOpen(false);
    setModalProps({} as DialogProps);
    setCustomComponent(null);
  };

  return (
    <DialogContext.Provider
      value={{
        open: handleOpen,
        openConfirm: handleOpenConfirm,
        openDeleteConfirm: handleOpenDeleteConfirm,
        openCustomComponent: handleOpenCustomComponent,
        close: close,
        closeAndEmit: handleClose,
      }}
    >
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="bg-white dark:bg-gray-800"
          style={{
            minWidth: size[modalSize ?? "md"].minWidth,
            maxWidth: size[modalSize ?? "md"].maxWidth,
          }}
        >
          {modalProps?.custom ? (
            customComponent
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>{modalProps?.title}</DialogTitle>
                <DialogDescription className="sr-only">
                  {modalProps?.message}
                </DialogDescription>
              </DialogHeader>
              <div>{modalProps?.message}</div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setIsOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => handleClose()} disabled={sendingRequest}>
                  Confirmar
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
}
