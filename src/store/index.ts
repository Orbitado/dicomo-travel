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
import {
  HostingDataSlice,
  createHostingDataSlice,
} from "./slices/hosting-data";

export type StoreState = CustomerDataSlice & SteppersSlice & ItinerarySlice & FlightDataSlice & HostingDataSlice;

export const useStore = create<StoreState>((set) => ({
  ...createSteppersSlice(set),
  ...createCustomerDataSlice(set),
  ...createItinerarySlice(set),
  ...createFlightDataSlice(set),
  ...createHostingDataSlice(set),
}));
