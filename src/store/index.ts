import { create } from "zustand";
import { SteppersSlice, createSteppersSlice } from "./slices/steppers";
import {
  CustomerDataSlice,
  createCustomerDataSlice,
} from "./slices/customer-data";
import {
  ItinerarySlice,
  createItinerarySlice,
} from "./slices/itinerary";
import {
  FlightDataSlice,
  createFlightDataSlice,
} from "./slices/flight-data";

export type StoreState = CustomerDataSlice & SteppersSlice & ItinerarySlice & FlightDataSlice;

export const useStore = create<StoreState>((set) => ({
  ...createSteppersSlice(set),
  ...createCustomerDataSlice(set),
  ...createItinerarySlice(set),
  ...createFlightDataSlice(set),
}));
