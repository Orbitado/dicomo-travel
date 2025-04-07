"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DatePickerWithRange } from "../ui/date-picker-with-range";
import { TimePicker } from "../ui/time-picker";
import { addDays, format, startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import { MapPin, Calendar, Clock, ArrowRight } from "lucide-react";
import { useStore } from "@/store";
import { Button } from "../ui/button";

const generalInformationSchema = z.object({
  destiny: z.string().min(1, { message: "El lugar es requerido" }),
  dateRange: z.object({
    from: z.date().min(startOfDay(new Date()), {
      message: `La fecha de inicio no puede ser anterior a ${format(
        startOfDay(new Date()),
        "dd MMMM yyyy",
        { locale: es }
      )}`,
    }),
    to: z.date().min(startOfDay(new Date()), {
      message: `La fecha de fin no puede ser anterior a ${format(
        startOfDay(new Date()),
        "dd MMMM yyyy",
        { locale: es }
      )}`,
    }),
  }),
  time: z.date(),
});

export type GeneralInformationFormValues = z.infer<
  typeof generalInformationSchema
>;

function GeneralInformation() {
  const { setDestiny, setDateRange, setTime } = useStore();
  const { currentStep, setCurrentStep } = useStore();

  const form = useForm<GeneralInformationFormValues>({
    resolver: zodResolver(generalInformationSchema),
    defaultValues: {
      destiny: "Punta Cana, República Dominicana",
      dateRange: {
        from: startOfDay(new Date()),
        to: addDays(startOfDay(new Date()), 1),
      },
      time: new Date(new Date().setHours(9, 0, 0, 0)),
    },
  });

  const onSubmit = (data: GeneralInformationFormValues) => {
    try {
      setDestiny(data.destiny);
      setDateRange(data.dateRange);
      setTime(format(data.time, "HH:mm"));
      setCurrentStep(currentStep + 1);
      toast.success("Datos de Información General guardados correctamente");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error al crear la cotización");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="destiny"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Lugar de destino
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ej. Cancún, México" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateRange"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Fechas de viaje
                </FormLabel>
                <FormControl>
                  <DatePickerWithRange
                    onChange={field.onChange}
                    value={field.value}
                    className="w-full [&>div]:w-full"
                  />
                </FormControl>
                {form.formState.errors.dateRange?.to && (
                  <p className="text-destructive text-sm">
                    {form.formState.errors.dateRange.to.message}
                  </p>
                )}
                {form.formState.errors.dateRange?.from && (
                  <p className="text-destructive text-sm">
                    {form.formState.errors.dateRange.from.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Hora de reserva
                </FormLabel>
                <FormControl>
                  <TimePicker
                    selected={field.value}
                    onChange={field.onChange}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full cursor-pointer">
          <ArrowRight className="h-4 w-4" />
          Continuar
        </Button>
      </form>
    </Form>
  );
}

export default GeneralInformation;
