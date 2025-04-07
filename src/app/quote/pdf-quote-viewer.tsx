"use client";

import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import QuoteDocument from "@/components/quote/quote-pdf";

// Componente cliente que encapsula todo lo relacionado con PDF
export default function PDFQuoteViewer() {
  return (
    <PDFViewer width="100%" height="100%">
      <QuoteDocument />
    </PDFViewer>
  );
} 