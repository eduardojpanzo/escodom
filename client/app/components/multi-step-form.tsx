import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import { Button } from "~/components/ui/button";
import { StepperIndicator } from "./stepper-indicator";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import type React from "react";

interface MultiStepFormProps<TFormValues extends FieldValues> {
  getStepContent: (step: number) => React.JSX.Element | string;
  totalSteps: number;
  activeStep: number;
  handleBack: () => void;
  handleNext: () => Promise<void>;
  isLoading?: boolean;
  methods: UseFormReturn<TFormValues>;
  onSubmit: SubmitHandler<TFormValues>;
}

export function MultiStepForm<TFormValues extends FieldValues>({
  activeStep,
  getStepContent,
  handleBack,
  handleNext,
  methods,
  onSubmit,
  totalSteps,
}: MultiStepFormProps<TFormValues>) {
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  return (
    <Card>
      <CardHeader>
        <StepperIndicator totalSteps={totalSteps} activeStep={activeStep} />
        {errors.root?.formError && (
          <Alert variant="destructive" className="mt-[28px]">
            <TriangleAlert className="h-4 w-4" />
            <AlertTitle>Form Error</AlertTitle>
            <AlertDescription>
              {errors.root?.formError?.message}
            </AlertDescription>
          </Alert>
        )}
      </CardHeader>
      <FormProvider {...methods}>
        <form noValidate>
          <CardContent>
            <div>{getStepContent(activeStep)}</div>
          </CardContent>
          <CardFooter>
            <Button
              type="button"
              className="w-[100px]"
              variant="secondary"
              onClick={handleBack}
              disabled={activeStep === 1}
            >
              Voltar
            </Button>
            {activeStep === totalSteps ? (
              <Button
                className="w-[100px] ml-auto"
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                Salvar
              </Button>
            ) : (
              <Button
                type="button"
                className="w-[100px] ml-auto"
                onClick={handleNext}
              >
                Próximo
              </Button>
            )}
          </CardFooter>
        </form>
      </FormProvider>
    </Card>
  );
}
