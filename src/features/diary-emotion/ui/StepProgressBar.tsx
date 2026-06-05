interface StepProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const StepProgressBar = ({ currentStep, totalSteps }: StepProgressBarProps) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex gap-1.75 px-5">
      {steps.map((step) => (
        <div
          key={step}
          className={`h-1.25 flex-1 rounded-[99px] ${step <= currentStep ? "bg-gray-500" : "bg-gray-200"}`}
        />
      ))}
    </div>
  );
};
