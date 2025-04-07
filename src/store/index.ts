import { create } from "zustand";
import { GeneralInformationSlice, createGeneralInformationSlice } from "./slices/general-information";
import { SteppersSlice, createSteppersSlice } from "./slices/steppers";

export type StoreState = GeneralInformationSlice & SteppersSlice;

export const useStore = create<StoreState>((set) => ({
  ...createGeneralInformationSlice(set),
  ...createSteppersSlice(set),
}));
