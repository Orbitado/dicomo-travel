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
      console.log(data);
      toast.success("Cotización creada correctamente");
    } catch (error) {
      toast.error("Error al crear la cotización");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="place"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lugar de destino</FormLabel>
              <FormControl>
                <Input placeholder="Ej. Cancún, México" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="dateRange"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fechas de viaje</FormLabel>
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
                <FormLabel>Hora de reserva</FormLabel>
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

        <Button type="submit" className="w-full sm:w-auto">
          Solicitar cotización
        </Button>
      </form>
    </Form>
  );
}

export default QuoteForm;