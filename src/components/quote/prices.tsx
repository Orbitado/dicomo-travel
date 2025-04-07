"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  DollarSign,
  Receipt,
  Tag,
  Calculator,
  CheckCircle,
  Eye,
} from "lucide-react";
import { useStore } from "@/store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useRouter } from "next/navigation";

const pricesSchema = z.object({
  serviceDescription: z
    .string()
    .min(1, { message: "La descripción del servicio es requerida" }),
  quantity: z.string().min(1, { message: "La cantidad es requerida" }),
  unitPrice: z.string().min(1, { message: "El precio unitario es requerido" }),
  taxesIncluded: z.boolean().default(false),
});

type PricesFormValues = z.infer<typeof pricesSchema>;

function Prices() {
  const {
    setServiceDescription,
    setQuantity,
    setUnitPrice,
    setTaxesIncluded,
    setSubtotal,
    setTotalQuote,
    serviceDescription,
    quantity,
    unitPrice,
    taxesIncluded,
    subtotal,
    totalQuote,
  } = useStore();

  const router = useRouter();

  const form = useForm<PricesFormValues>({
    resolver: zodResolver(pricesSchema),
    defaultValues: {
      serviceDescription: serviceDescription || "",
      quantity: quantity || "1",
      unitPrice: unitPrice || "",
      taxesIncluded: taxesIncluded || false,
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      const qty = parseFloat(value.quantity || "0");
      const price = parseFloat(value.unitPrice || "0");
      const subtotalValue = qty * price;

      const taxRate = 0.21;
      const totalValue = value.taxesIncluded
        ? subtotalValue
        : subtotalValue * (1 + taxRate);

      setSubtotal(subtotalValue.toFixed(2));
      setTotalQuote(totalValue.toFixed(2));
    });

    return () => subscription.unsubscribe();
  }, [form, setSubtotal, setTotalQuote]);

  const onSubmit = (data: PricesFormValues) => {
    try {
      setServiceDescription(data.serviceDescription);
      setQuantity(data.quantity);
      setUnitPrice(data.unitPrice);
      setTaxesIncluded(data.taxesIncluded);
      toast.success("Cotización generada correctamente", {
        action: {
          label: "Ver",
          onClick: () => router.push("/quote"),
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error al guardar la información de precios");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          {/* Descripción del servicio */}
          <FormField
            control={form.control}
            name="serviceDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Descripción del servicio
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ej. Paquete turístico de 7 días en Buenos Aires"
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-6 md:grid-cols-2">
            {/* Cantidad */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Calculator className="h-4 w-4" />
                    Cantidad
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      placeholder="Ej. 2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Precio unitario */}
            <FormField
              control={form.control}
              name="unitPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Precio unitario
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Ej. 1500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Subtotal (read-only) */}
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Subtotal
            </FormLabel>
            <FormControl>
              <Input value={subtotal || "0.00"} readOnly className="bg-muted" />
            </FormControl>
            <FormDescription>
              Calculado automáticamente: Cantidad × Precio unitario
            </FormDescription>
          </FormItem>

          {/* Impuestos incluidos */}
          <FormField
            control={form.control}
            name="taxesIncluded"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Impuestos incluidos
                  </FormLabel>
                  <FormDescription>
                    Marque si el precio ya incluye impuestos (IVA)
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Total cotización (read-only) */}
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              Total cotización
            </FormLabel>
            <FormControl>
              <Input
                value={totalQuote || "0.00"}
                readOnly
                className="bg-muted font-bold"
              />
            </FormControl>
            <FormDescription>
              {taxesIncluded
                ? "Total con impuestos incluidos"
                : "Total con impuestos calculados (21% IVA)"}
            </FormDescription>
          </FormItem>
        </div>

        <Button type="submit" className="w-full cursor-pointer">
          <Eye className="h-4 w-4 mr-2" />
          Generar Cotización
        </Button>
      </form>
    </Form>
  );
}

export default Prices;
