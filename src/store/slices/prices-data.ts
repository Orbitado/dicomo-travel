export interface PricesDataSlice {
  serviceDescription: string;
  quantity: string;
  unitPrice: string;
  taxesIncluded: boolean;
  subtotal: string;
  totalQuote: string;
  setServiceDescription: (serviceDescription: string) => void;
  setQuantity: (quantity: string) => void;
  setUnitPrice: (unitPrice: string) => void;
  setTaxesIncluded: (taxesIncluded: boolean) => void;
  setSubtotal: (subtotal: string) => void;
  setTotalQuote: (totalQuote: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPricesDataSlice = (set: any) => ({
  serviceDescription: "",
  quantity: "1",
  unitPrice: "",
  taxesIncluded: false,
  subtotal: "0.00",
  totalQuote: "0.00",
  setServiceDescription: (serviceDescription: string) =>
    set({ serviceDescription }),
  setQuantity: (quantity: string) => set({ quantity }),
  setUnitPrice: (unitPrice: string) => set({ unitPrice }),
  setTaxesIncluded: (taxesIncluded: boolean) => set({ taxesIncluded }),
  setSubtotal: (subtotal: string) => set({ subtotal }),
  setTotalQuote: (totalQuote: string) => set({ totalQuote }),
}); 