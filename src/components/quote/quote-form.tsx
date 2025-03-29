"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "../ui/form";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { DatePickerWithRange } from "../ui/date-picker-with-range";
import { TimePicker } from "../ui/time-picker";
import { Card, CardContent } from "../ui/card";
import { CalendarRange, Clock, MapPin, Send } from "lucide-react";
import { addDays, startOfToday, addHours } from "date-fns";
import { DateRange } from "react-day-picker";

function QuoteForm() {
  const MIN_DATE = startOfToday();
  const MAX_DATE = addDays(MIN_DATE, 30);
  const MIN_TIME = addHours(startOfToday(), 12);

  const form = useForm({
    resolver: zodResolver(
      z.object({
        place: z.string().min(1, { message: "El lugar es requerido" }),
        date: z.custom<DateRange>(),
        time: z.date().min(MIN_TIME, { message: "La hora es requerida" }),
      })
    ),
    defaultValues: {
      place: "Aeropuerto de Ezeiza",
      date: {
        from: MIN_DATE,
        to: MAX_DATE,
      },
      time: MIN_TIME,
    },
  });

  const onSubmit = (data: any) => {
    try {
      console.log("Form data:", data);
      toast.success("Cotización creada correctamente");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error al crear la cotización");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <FormField
                control={form.control}
                name="place"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="flex items-center gap-2 text-xl font-medium">
                      <MapPin className="size-6" />
                      Lugar
                    </FormLabel>
                    <FormDescription>
                      Ingrese el destino o lugar del servicio
                    </FormDescription>
                    <FormControl>
                      <Input
                        placeholder="Ej: Aeropuerto de Ciudad de Ezeiza"
                        className="w-full h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="flex items-center gap-2 text-xl font-medium">
                      <CalendarRange className="size-6" />
                      Fecha
                    </FormLabel>
                    <FormDescription>
                      Seleccione el rango de fechas para el servicio
                    </FormDescription>
                    <FormControl>
                      <DatePickerWithRange
                        onChange={field.onChange}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="flex items-center gap-2 text-xl font-medium">
                    <Clock className="size-6" />
                    Hora
                  </FormLabel>
                  <FormDescription>
                    Seleccione la hora de inicio del servicio
                  </FormDescription>
                  <FormControl>
                    <TimePicker
                      selected={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="h-12 px-8 py-5 text-base font-medium cursor-pointer"
            size="lg"
          >
            <Send className="mr-2 size-6" />
            Crear cotización
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default QuoteForm;
