import { type ChangeEvent, useEffect, useState } from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type ImageChangeProps = (
  event: ChangeEvent<HTMLInputElement>,
  onChange: (event: File) => void
) => void;

export interface InputComponentProps<
  FormValues extends FieldValues = FieldValues
> extends UseControllerProps<FormValues> {
  initialPreviewUrl: string;
}

export default function UploadPreviewImage<
  FormValues extends FieldValues = FieldValues
>({ name, control, initialPreviewUrl }: InputComponentProps<FormValues>) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialPreviewUrl
  );

  useEffect(() => {
    setPreviewUrl(initialPreviewUrl);
  }, [initialPreviewUrl]);

  const handleImageChange: ImageChangeProps = (event, onChange) => {
    const file = event.target.files?.[0] ?? undefined;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);

      onChange(file);
    }
  };
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="relative max-w-80 w-full p-2 border rounded-md flex items-center flex-col gap-0 text-center">
          <FormLabel
            // data-preview={!!previewUrl}
            htmlFor={name}
            className="absolute top-1/2 left-1/2 w-52 h-52 rounded-full cursor-pointer bg-[rgba(0,0,0,0.4)] -translate-x-1/2 -translate-y-1/2 transition-all flex items-center justify-center data-[preview=true]:hidden hover:data-[preview=true]:flex"
          >
            <p className="font-bold text-lg text-white">
              {previewUrl ? "Alterar a imagem" : "Adicionar imagem"}
            </p>
          </FormLabel>
          <div className="w-52 h-52 border overflow-hidden rounded-full">
            {previewUrl && (
              <img
                className="w-full h-full rounded-full object-cover object-center"
                width={200}
                height={200}
                src={previewUrl}
                alt="foto tipo"
              />
            )}
          </div>
          <FormControl className="block w-0 h-0 opacity-0">
            <Input
              className="max-h-0 max-w-0 m-0 p-0"
              type="file"
              id={name}
              onChange={(envet) => {
                handleImageChange(envet, field.onChange);
              }}
            />
          </FormControl>
          <FormMessage className="absolute bottom-0" />
        </FormItem>
      )}
    />
  );
}
