import {
  FileChartColumn,
  FileIcon,
  FileImage,
  FileInputIcon,
  FileSearch,
  FileText,
  Trash,
} from "lucide-react";
import {
  type ChangeEventHandler,
  type DragEventHandler,
  type JSX,
  useRef,
  useState,
} from "react";
import {
  type FieldValues,
  useController,
  type UseControllerProps,
} from "react-hook-form";
import { Input } from "../ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export interface FileUploadComponentProps<FormValues extends FieldValues>
  extends UseControllerProps<FormValues> {
  label: string;
  isMulti?: boolean;
  children?: JSX.Element;
  isRequired?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  accept?: string;
}

const fileTypeIcons = {
  xlsx: <FileChartColumn />,
  docx: <FileText />,
  pdf: <FileIcon />,
  png: <FileImage />,
  jpg: <FileImage />,
  jpeg: <FileImage />,
};

export function FileUploadComponent<FormValues extends FieldValues>({
  name,
  control,
  label,
  isMulti,
  isRequired,
  isDisabled,
  isLoading,
  accept,
}: FileUploadComponentProps<FormValues>) {
  const {
    field,
    fieldState: { error },
  } = useController<FormValues>({
    name,
    control,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type == "dragover");
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const fileList = Array.from(e.dataTransfer.files).map((file) => ({
        file: file,
        fileContent: file.name,
      }));
      field.onChange([...(field.value ?? []), ...fileList]);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const fileList = Array.from(e.target.files).map((file) => ({
        file: file,
        fileContent: file.name,
      }));
      field.onChange([...(field.value ?? []), ...fileList]);
    }
  };

  const handleRemoveFile = (index: number, files: File[]) => {
    files.splice(index, 1);
    field.onChange(files);
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      data-disabled={isDisabled}
      className="pointer-events-none data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-auto"
    >
      {isLoading ? (
        <Skeleton />
      ) : (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl
                className="flex flex-col gap-2"
                //   isInvalid={!!error}
                //   isRequired={isRequired}
              >
                <Input
                  type="file"
                  multiple={isMulti}
                  onBlur={field.onBlur}
                  name={field.name}
                  onChange={handleChange}
                  required={isRequired}
                  ref={inputRef}
                  style={{ display: "none" }}
                  accept={accept ?? "*/*"}
                />
              </FormControl>
              <div
                data-disabled={isDisabled}
                data-dragActive={dragActive}
                className="w-full p-5 rounded-md flex items-center flex-col gap-2 data-[disabled=false]:cursor-pointer hover:data-[disabled=false]:border data-[dragActive=true]:text-white"
                //  border={dragActive ? "2px solid #922A58" : "2px dashed #DDD"}

                //  color={dragActive ? "white" : "inherit"}

                //  cursor={isDisabled ? "default" : "pointer"}
                onClick={() => !isDisabled && inputRef.current?.click()}
                {...(dragActive ? { bg: "#D88FA3" } : {})}
                //  _hover={{
                //    borderColor: !isDisabled ? "#D88FA3" : "",
                //  }}
              >
                <FileSearch size="40px" opacity={0.1} />
                <h6 className="text-sm">
                  {!!field.value?.length
                    ? `${field.value?.length} ficheiro(s) pronto(s)`
                    : "Clique ou solte ficheiros aqui para fazer upload"}
                </h6>
              </div>
              <FormMessage className="text-[8px] justify-end">
                {error?.message}
              </FormMessage>
              {!!field.value?.length && (
                <div className="flex justify-end">
                  <Button
                    onClick={() => field.onChange([])}
                    variant="outline"
                    //   leftIcon={}
                    size="sm"
                  >
                    <Trash />
                    Limpar Lista
                  </Button>
                </div>
              )}
              <div className="max-h-60 overflow-auto">
                {(
                  field.value as { file: File; fileContent: string }[] | null
                )?.map((file, index) => {
                  return (
                    <div key={index}>
                      <FileItemComponent
                        name={file.file.name.split(".").at(0)}
                        extension={file.file.name.split(".").at(1)}
                        size={file.file.size}
                        handleDeleteClick={() =>
                          handleRemoveFile(index, field.value)
                        }
                      />
                      {index < field.value.length - 1 && <Separator />}
                    </div>
                  );
                })}
              </div>
            </FormItem>
          )}
        />
      )}
    </div>
  );
}

function FileItemComponent({
  name,
  extension,
  size,
  children,
  handleDeleteClick,
}: {
  name?: string;
  extension?: string;
  size?: number;
  children?: React.ReactElement | JSX.Element;
  handleDeleteClick?: () => void;
}) {
  const convertSize = (bytes?: number) => {
    if (!bytes) return "0 bytes";
    const k = 1024;
    const sizes = ["bytes", "kb", "mb", "gb", "tb"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))}${sizes[i]}`;
  };

  return (
    <div className="flex items-center justify-between gap-2 w-full p-1">
      <div className="flex items-center gap-2 text-2xl">
        {fileTypeIcons[extension as keyof typeof fileTypeIcons] ?? (
          <FileInputIcon />
        )}
      </div>
      <div className="flex-1">
        <p>{name}</p>
        <div className="text-xs text-[#aaa]">
          {extension} {size && `• ${convertSize(size)}`}
        </div>
      </div>
      {handleDeleteClick && (
        <Button
          //  tooltip="Remover"
          onClick={() => handleDeleteClick()}
        >
          <Trash />
        </Button>
      )}
      {children}
    </div>
  );
}
