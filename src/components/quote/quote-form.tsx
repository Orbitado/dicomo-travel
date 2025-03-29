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
import { useState } from "react";

function QuoteForm() {
  const [dateRange, setDateRange] = useState<any>(undefined);
  
  const form = useForm({
    resolver: zodResolver(
      z.object({
        place: z.string().min(1, { message: "El lugar es requerido" }),
        date: z.date().min(new Date(), { message: "La fecha es requerida" }),
        time: z.date().min(new Date(), { message: "La hora es requerida" }),
      })
    ),
  });

  const onSubmit = (data: any) => {
    try {
      console.log(data);
      toast.success("Cotización creada correctamente");
    } catch (error) {
      toast.error("Error al crear la cotización");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="place"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lugar y fecha</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha</FormLabel>
              <FormControl>
                <div className="flex-1">
                  <DatePickerWithRange 
                    className="w-full"
                  />
                  <input 
                    type="hidden" 
                    value={field.value?.toISOString() ?? ''} 
                    onChange={field.onChange} 
                  />
                </div>
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
              <FormLabel>Hora</FormLabel>
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
        <Button type="submit">Crear cotización</Button>
      </form>
    </Form>
  );
}

export default QuoteForm;
