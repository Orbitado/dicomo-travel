"use client";

import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import QuoteDocument from "@/components/quote/quote-pdf";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function QuotePage() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
      </div>

      <div className="h-[800px] w-full rounded-lg border bg-white shadow-sm">
        <PDFViewer width="100%" height="100%">
          <QuoteDocument />
        </PDFViewer>
      </div>
    </div>
  );
}
