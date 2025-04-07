import { DateRange } from "react-day-picker";

export interface ItineraryState {
  origin: string;
  destination: string;
  dates: DateRange | undefined;
  rooms: string;
  adults: string;
  children: string;
}

export interface ItinerarySlice extends ItineraryState {
  setOrigin: (origin: string) => void;
  setDestination: (destination: string) => void;
  setDates: (dates: DateRange | undefined) => void;
  setRooms: (rooms: string) => void;
  setAdults: (adults: string) => void;
  setChildren: (children: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createItinerarySlice = (set: any) => ({
  origin: "",
  destination: "",
  dates: undefined,
  rooms: "1",
  adults: "2",
  children: "0",
  
  setOrigin: (origin: string) => set({ origin }),
  setDestination: (destination: string) => set({ destination }),
  setDates: (dates: DateRange | undefined) => set({ dates }),
  setRooms: (rooms: string) => set({ rooms }),
  setAdults: (adults: string) => set({ adults }),
  setChildren: (children: string) => set({ children }),
});
