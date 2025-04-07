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
import { Button } from "../ui/button";
import { DatePickerWithRange } from "../ui/date-picker-with-range";
import { TimePicker } from "../ui/time-picker";
import { addDays, format, startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "../ui/card";
import {
  MapPin,
  Calendar,
  Clock,
  PlaneTakeoff,
  Send
} from "lucide-react";

const formSchema = z.object({
  place: z.string().min(1, { message: "El lugar es requerido" }),
  dateRange: z.object({
    from: z.date().min(startOfDay(new Date()), { message: `La fecha de inicio no puede ser anterior a ${format(startOfDay(new Date()), "dd MMMM yyyy", { locale: es })}` }),
    to: z.date().min(startOfDay(new Date()), { message: `La fecha de fin no puede ser anterior a ${format(startOfDay(new Date()), "dd MMMM yyyy", { locale: es })}` })
  }),
  time: z.date().optional(),
});

type FormValues = z.infer<typeof formSchema>;

function QuoteForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      place: "Punta Cana, República Dominicana",
      dateRange: {
        from: startOfDay(new Date()),
        to: addDays(startOfDay(new Date()), 1)
      },
      time: startOfDay(new Date(new Date().setHours(9, 0, 0, 0))),
    },
  });

  const onSubmit = (data: FormValues) => {
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
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="place"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Lugar de destino
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej. Cancún, México"
                    {...field}
                  />
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
                <FormMessage />
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

        <CardFooter className="flex justify-end px-0 pt-4">
          <Button
            type="submit"
            className="w-full md:w-auto flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            Solicitar cotización
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}

export default QuoteForm;