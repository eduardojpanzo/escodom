import { Separator } from "~/components/ui/separator";
import clsx from "clsx";
import { Check } from "lucide-react";
import { Fragment } from "react";

interface StepperIndicatorProps {
  activeStep: number;
  totalSteps: number;
}

export function StepperIndicator({
  totalSteps,
  activeStep,
}: StepperIndicatorProps) {
  return (
    <div className="flex justify-center items-center">
      {Array.from({ length: totalSteps }, (_, index) => index + 1).map(
        (step) => (
          <Fragment key={step}>
            <div
              className={clsx(
                "w-[40px] h-[40px] flex justify-center items-center m-[5px] border-[2px] rounded-full",
                step < activeStep && "bg-primary text-white",
                step === activeStep && "border-primary text-primary"
              )}
            >
              {step >= activeStep ? step : <Check className="h-5 w-5" />}
            </div>
            {step !== totalSteps && (
              <Separator
                orientation="horizontal"
                className={clsx(
                  "w-[100px] h-[2px]",
                  step <= activeStep - 1 && "bg-primary"
                )}
              />
            )}
          </Fragment>
        )
      )}
    </div>
  );
}
