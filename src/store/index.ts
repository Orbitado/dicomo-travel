import { create } from "zustand";
import { GeneralInformationSlice, createGeneralInformationSlice } from "./slices/general-information";
import { SteppersSlice, createSteppersSlice } from "./slices/steppers";
import { FlightsDetailsSlice, createFlightsDetailsSlice } from "./slices/flights-details";

export type StoreState = GeneralInformationSlice & SteppersSlice & FlightsDetailsSlice;

export const useStore = create<StoreState>((set) => ({
  ...createGeneralInformationSlice(set),
  ...createSteppersSlice(set),
  ...createFlightsDetailsSlice(set),
}));
