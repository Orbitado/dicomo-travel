import { CustomerDataFormValues } from "@/components/quote/customer-data";

export type CustomerDataState = CustomerDataFormValues & {
  clientName: string;
  contactPerson: string;
  phone: string;
  email: string;
};

export interface CustomerDataSlice extends CustomerDataState {
  setClientName: (clientName: string) => void;
  setContactPerson: (contactPerson: string) => void;
  setPhone: (phone: string) => void;
  setEmail: (email: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createCustomerDataSlice = (set: any) => ({
  clientName: "",
  contactPerson: "",
  phone: "",
  email: "",
  setClientName: (clientName: string) => set({ clientName }),
  setContactPerson: (contactPerson: string) => set({ contactPerson }),
  setPhone: (phone: string) => set({ phone }),
  setEmail: (email: string) => set({ email }),
});
