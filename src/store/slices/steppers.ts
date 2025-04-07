export interface SteppersSlice {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createSteppersSlice = (set: any) => ({
  currentStep: 1,
  setCurrentStep: (step: number) => set({ currentStep: step }),
});
