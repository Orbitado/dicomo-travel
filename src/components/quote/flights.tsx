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
import {
  ArrowRight,
  Plane,
  Calendar,
  Clock,
  Briefcase,
  MapPin,
} from "lucide-react";
import { useStore } from "@/store";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { format, startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import { TimePicker } from "../ui/time-picker";
import { DatePickerWithRange } from "../ui/date-picker-with-range";

const flightSchema = z.object({
  origin: z.string().min(1, { message: "El origen es requerido" }),
  destination: z.string().min(1, { message: "El destino es requerido" }),
  airline: z.string().min(1, { message: "La aerolínea es requerida" }),
  departureDate: z.date().min(startOfDay(new Date()), {
    message: `La fecha de salida debe ser mayor o igual a ${format(
      startOfDay(new Date()),
      "PPP",
      { locale: es }
    )}`,
  }),
  departureTime: z
    .date()
    .min(startOfDay(new Date()), { message: "La hora de salida es requerida" }),
  arrivalDate: z.date().min(startOfDay(new Date()), {
    message: `La fecha de llegada debe ser mayor o igual a ${format(
      startOfDay(new Date()),
      "PPP",
      { locale: es }
    )}`,
  }),
  arrivalTime: z.date().min(startOfDay(new Date()), {
    message: "La hora de llegada es requerida",
  }),
  includesHandLuggage: z.boolean().default(false),
});

export type FlightFormValues = z.infer<typeof flightSchema>;

// Custom component to handle the conversion between DateRange and Date
const DatePickerField = ({ value, onChange }: { value: Date; onChange: (date: Date) => void }) => {
  return (
    <DatePickerWithRange
      value={{ from: value, to: value }}
      onChange={(date) => {
        // @ts-expect-error - We know this is a DateRange object
        if (date?.from) {
          // @ts-expect-error - We know this is a DateRange object
          onChange(date.from);
        }
      }}
      className="w-full"
    />
  );
};

function Flights() {
  const {
    setOrigin,
    setDestination,
    setAirline,
    setDepartureDate,
    setDepartureTime,
    setArrivalDate,
    setArrivalTime,
    setIncludesHandLuggage,
    origin,
    destination,
    airline,
    departureDate,
    departureTime,
    arrivalDate,
    arrivalTime,
    includesHandLuggage,
    currentStep,
    setCurrentStep,
  } = useStore();

  const form = useForm<FlightFormValues>({
    resolver: zodResolver(flightSchema),
    defaultValues: {
      origin: origin || "",
      destination: destination || "",
      airline: airline || "",
      departureDate: departureDate || new Date(),
      departureTime: departureTime || new Date(),
      arrivalDate: arrivalDate || new Date(),
      arrivalTime: arrivalTime || new Date(),
      includesHandLuggage: includesHandLuggage || false,
    },
  });

  const onSubmit = (data: FlightFormValues) => {
    try {
      setOrigin(data.origin);
      setDestination(data.destination);
      setAirline(data.airline);
      setDepartureDate(data.departureDate);
      setDepartureTime(data.departureTime);
      setArrivalDate(data.arrivalDate);
      setArrivalTime(data.arrivalTime);
      setIncludesHandLuggage(data.includesHandLuggage);
      setCurrentStep(currentStep + 1);
      console.log(data);
      toast.success("Información de vuelos guardada correctamente");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error al guardar la información de vuelos");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Origen y Destino */}
          <FormField
            control={form.control}
            name="origin"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Origen
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ej. Madrid" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Destino
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ej. Barcelona" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Aerolínea */}
          <FormField
            control={form.control}
            name="airline"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Plane className="h-4 w-4" />
                  Aerolínea
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ej. Iberia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Fecha y hora de salida */}
          <FormField
            control={form.control}
            name="departureDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Fechas del viaje
                </FormLabel>
                <DatePickerField
                  value={field.value}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="departureTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Hora de salida
                </FormLabel>
                <TimePicker
                  value={field.value}
                  onChange={field.onChange}
                  className="w-full"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="arrivalTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Hora de llegada
                </FormLabel>
                <TimePicker
                  value={field.value}
                  onChange={field.onChange}
                  className="w-full"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Equipaje de mano (ocupa dos columnas) */}
          <FormField
            control={form.control}
            name="includesHandLuggage"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 md:col-span-2">
                <div className="space-y-0.5">
                  <FormLabel className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Incluye equipaje de mano
                  </FormLabel>
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
        </div>

        <Button type="submit" className="w-full cursor-pointer">
          <ArrowRight className="h-4 w-4" />
          Continuar
        </Button>
      </form>
    </Form>
  );
}

export default Flights;
