export interface FlightDetails {
  flightRoute: string;
  departure: {
    airline: string;
    origin: string;
    dateTime: string;
    layover: string | null;
    arrivalTime: string;
  };
  return: {
    airline: string;
    origin: string;
    dateTime: string;
    layover: string | null;
    arrivalTime: string;
  };
  luggage: string;
}

export interface FlightsDetailsSlice {
  flightDetails: FlightDetails | null;
  setFlightDetails: (flightDetails: FlightDetails) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createFlightsDetailsSlice = (set: any) => ({
  flightDetails: null,
  setFlightDetails: (flightDetails: FlightDetails) => set({ flightDetails }),
}); 