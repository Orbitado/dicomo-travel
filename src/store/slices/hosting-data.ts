export interface HostingDataState {
  hotelName: string;
  location: string;
  mealPlan: string;
  roomType: string;
  maxAdults: string;
  maxChildren: string;
  cancellationPolicy: string;
  amenities: string;
}

export interface HostingDataSlice extends HostingDataState {
  setHotelName: (hotelName: string) => void;
  setLocation: (location: string) => void;
  setMealPlan: (mealPlan: string) => void;
  setRoomType: (roomType: string) => void;
  setMaxAdults: (maxAdults: string) => void;
  setMaxChildren: (maxChildren: string) => void;
  setCancellationPolicy: (cancellationPolicy: string) => void;
  setAmenities: (amenities: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createHostingDataSlice = (set: any) => ({
  hotelName: "",
  location: "",
  mealPlan: "",
  roomType: "",
  maxAdults: "2",
  maxChildren: "0",
  cancellationPolicy: "",
  amenities: "",
  
  setHotelName: (hotelName: string) => set({ hotelName }),
  setLocation: (location: string) => set({ location }),
  setMealPlan: (mealPlan: string) => set({ mealPlan }),
  setRoomType: (roomType: string) => set({ roomType }),
  setMaxAdults: (maxAdults: string) => set({ maxAdults }),
  setMaxChildren: (maxChildren: string) => set({ maxChildren }),
  setCancellationPolicy: (cancellationPolicy: string) => set({ cancellationPolicy }),
  setAmenities: (amenities: string) => set({ amenities }),
}); 