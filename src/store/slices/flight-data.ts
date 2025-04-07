import { FlightFormValues } from "@/components/quote/flights";
import { startOfDay } from "date-fns";

export interface FlightDataSlice extends FlightFormValues {
  setOrigin: (origin: string) => void;
  setDestination: (destination: string) => void;
  setAirline: (airline: string) => void;
  setDepartureDate: (departureDate: Date) => void;
  setDepartureTime: (departureTime: Date) => void;
  setArrivalDate: (arrivalDate: Date) => void;
  setArrivalTime: (arrivalTime: Date) => void;
  setIncludesHandLuggage: (includesHandLuggage: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createFlightDataSlice = (set: any) => ({
  origin: "",
  destination: "",
  airline: "",
  departureDate: startOfDay(new Date()),
  departureTime: startOfDay(new Date()),
  arrivalDate: startOfDay(new Date()),
  arrivalTime: startOfDay(new Date()),
  includesHandLuggage: false,

  setOrigin: (origin: string) => set({ origin }),
  setDestination: (destination: string) => set({ destination }),
  setAirline: (airline: string) => set({ airline }),
  setDepartureDate: (departureDate: Date) => set({ departureDate }),
  setDepartureTime: (departureTime: Date) => set({ departureTime }),
  setArrivalDate: (arrivalDate: Date) => set({ arrivalDate }),
  setArrivalTime: (arrivalTime: Date) => set({ arrivalTime }),
  setIncludesHandLuggage: (includesHandLuggage: boolean) =>
    set({ includesHandLuggage }),
});
