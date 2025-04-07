import { create } from "zustand";
import { CustomerDataSlice, createCustomerDataSlice } from "./slices/customer-data";
import { SteppersSlice, createSteppersSlice } from "./slices/steppers";
import { FlightsDetailsSlice, createFlightsDetailsSlice } from "./slices/flights-details";

export type StoreState = CustomerDataSlice & SteppersSlice & FlightsDetailsSlice;

export const useStore = create<StoreState>((set) => ({
  ...createCustomerDataSlice(set),
  ...createSteppersSlice(set),
  ...createFlightsDetailsSlice(set),
}));
