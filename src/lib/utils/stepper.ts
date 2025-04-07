export const handleNextStep = (
  setCurrentStep: (step: number) => void,
  currentStep: number
) => {
  setCurrentStep(currentStep + 1);
};

export const handlePreviousStep = (
  setCurrentStep: (step: number) => void,
  currentStep: number
) => {
  setCurrentStep(currentStep - 1);
};
