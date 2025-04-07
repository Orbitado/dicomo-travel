import { GeneralInformationFormValues } from "@/components/quote/general-information";
import { format, startOfDay } from "date-fns";

export type GeneralInformationState = Omit<GeneralInformationFormValues, 'time'> & {
  time?: Date;
  timeString: string;
};

export interface GeneralInformationSlice extends GeneralInformationState {
  setDestiny: (destiny: string) => void;
  setDateRange: (dateRange: { from: Date; to: Date }) => void;
  setTime: (time: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createGeneralInformationSlice = (set: any) => ({
  destiny: "",
  dateRange: { from: new Date(), to: new Date() },
  timeString: format(startOfDay(new Date(new Date().setHours(9, 0, 0, 0))), "HH:mm"),
  setDestiny: (destiny: string) => set({ destiny }),
  setDateRange: (dateRange: { from: Date; to: Date }) => set({ dateRange }),
  setTime: (time: string) => set({ timeString: time }),
});
