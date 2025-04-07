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
import { Calendar } from "../ui/calendar";
import { TimePicker } from "../ui/time-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Plane,
  Calendar as CalendarIcon,
  Clock,
  ArrowRight,
  Luggage,
} from "lucide-react";
import { useStore } from "@/store";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { FlightDetails } from "@/store/slices/flights-details";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const flightsDetailsSchema = z.object({
  flightRoute: z.string().min(1, { message: "La ruta de vuelo es requerida" }),
  // Departure Flight
  departureAirline: z.string().min(1, { message: "La aerolínea es requerida" }),
  departureOrigin: z.string().min(1, { message: "El origen es requerido" }),
  departureDate: z.date(),
  departureTime: z.date(),
  departureHasLayover: z.boolean().default(false),
  departureLayover: z.string().optional(),
  departureArrivalTime: z
    .string()
    .min(1, { message: "La hora de llegada es requerida" }),
  // Return Flight
  returnAirline: z.string().min(1, { message: "La aerolínea es requerida" }),
  returnOrigin: z.string().min(1, { message: "El origen es requerido" }),
  returnDate: z.date(),
  returnTime: z.date(),
  returnHasLayover: z.boolean().default(false),
  returnLayover: z.string().optional(),
  returnArrivalTime: z
    .string()
    .min(1, { message: "La hora de llegada es requerida" }),
  // Luggage
  luggage: z.string().min(1, { message: "El equipaje previsto es requerido" }),
});

// Tipos de equipaje en Argentina
const luggageTypes = [
  { value: "carry-on", label: "Equipaje de Mano (Carry-On)" },
  { value: "despachado-23kg", label: "Equipaje Despachado (23kg)" },
  { value: "despachado-32kg", label: "Equipaje Despachado (32kg)" },
  { value: "equipaje-extra", label: "Equipaje Extra" },
  {
    value: "equipaje-especial",
    label: "Equipaje Especial (instrumentos, deportivo, etc.)",
  },
];

export type FlightsDetailsFormValues = z.infer<typeof flightsDetailsSchema>;

// Date picker component similar to the one in general-information
function DatePicker({
  selected,
  onSelect,
}: {
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
}) {
  return (
    <div className="grid gap-2 w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className="w-full justify-start text-left font-normal h-12 px-3"
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
            {selected ? (
              <span className="block truncate text-sm">
                {format(selected, "dd MMMM yyyy", { locale: es })}
              </span>
            ) : (
              <span className="block text-sm">Selecciona una fecha</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 z-50" sideOffset={5}>
          <Calendar
            initialFocus
            mode="single"
            defaultMonth={selected || new Date()}
            selected={selected}
            onSelect={onSelect}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function FlightsDetails() {
  const { setFlightDetails, currentStep, setCurrentStep } = useStore();

  const form = useForm<FlightsDetailsFormValues>({
    resolver: zodResolver(flightsDetailsSchema),
    defaultValues: {
      flightRoute: "Ezeiza / La Habana",
      departureAirline: "Latam",
      departureOrigin: "Ezeiza",
      departureDate: new Date(),
      departureTime: new Date(new Date().setHours(3, 45, 0, 0)),
      departureHasLayover: true,
      departureLayover: "Lima",
      departureArrivalTime: "13:55 hs. a La Habana",
      returnAirline: "Latam",
      returnOrigin: "La Habana",
      returnDate: new Date(),
      returnTime: new Date(new Date().setHours(15, 5, 0, 0)),
      returnHasLayover: true,
      returnLayover: "Lima",
      returnArrivalTime: "06:15 hs. del 08/02/26 a Ezeiza",
      luggage: "carry-on",
    },
  });

  const onSubmit = (data: FlightsDetailsFormValues) => {
    try {
      const flightDetails: FlightDetails = {
        flightRoute: data.flightRoute,
        departure: {
          airline: data.departureAirline,
          origin: data.departureOrigin,
          dateTime: `${format(data.departureDate, "dd/MM/yy", {
            locale: es,
          })} a las ${format(data.departureTime, "HH:mm")} hs.`,
          layover: data.departureHasLayover
            ? data.departureLayover || null
            : null,
          arrivalTime: data.departureArrivalTime,
        },
        return: {
          airline: data.returnAirline,
          origin: data.returnOrigin,
          dateTime: `${format(data.returnDate, "dd/MM/yy", {
            locale: es,
          })} a las ${format(data.returnTime, "HH:mm")} hs.`,
          layover: data.returnHasLayover ? data.returnLayover || null : null,
          arrivalTime: data.returnArrivalTime,
        },
        luggage: data.luggage,
      };

      setFlightDetails(flightDetails);
      setCurrentStep(currentStep + 1);
      toast.success("Detalles de vuelos guardados correctamente");
      console.log(data);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error al guardar los detalles de vuelos");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="flightRoute"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="flex items-center gap-2">
                  <Plane className="h-4 w-4" />
                  Ruta de Vuelo
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ej. Ezeiza / La Habana" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Departure Flight Section */}
          <div className="md:col-span-2 border rounded-md p-4 space-y-4">
            <h3 className="font-medium">Vuelo de Ida</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="departureAirline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aerolínea</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. Latam" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="departureOrigin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origen</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. Ezeiza" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="departureDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      Fecha de Salida
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </FormControl>
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
                      Hora de Salida
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

              <FormField
                control={form.control}
                name="departureHasLayover"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2">
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="departure-has-layover"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <Label htmlFor="departure-has-layover">
                          ¿Tiene escala?
                        </Label>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.watch("departureHasLayover") && (
                <FormField
                  control={form.control}
                  name="departureLayover"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Escala</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej. Lima" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="departureArrivalTime"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Hora de Llegada a Destino</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej. 13:55 hs. a La Habana"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Return Flight Section */}
          <div className="md:col-span-2 border rounded-md p-4 space-y-4">
            <h3 className="font-medium">Vuelo de Regreso</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="returnAirline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aerolínea</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. Latam" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="returnOrigin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origen</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. La Habana" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="returnDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      Fecha de Salida
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="returnTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Hora de Salida
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

              <FormField
                control={form.control}
                name="returnHasLayover"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2">
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="return-has-layover"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <Label htmlFor="return-has-layover">
                          ¿Tiene escala?
                        </Label>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.watch("returnHasLayover") && (
                <FormField
                  control={form.control}
                  name="returnLayover"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Escala</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej. Lima" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="returnArrivalTime"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Hora de Llegada a Destino</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej. 06:15 hs. del 08/02/26 a Ezeiza"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Luggage - changed to use Select component */}
          <FormField
            control={form.control}
            name="luggage"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="flex items-center gap-2">
                  <Luggage className="h-4 w-4" />
                  Equipaje Previsto
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tipo de equipaje" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {luggageTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full cursor-pointer">
          <ArrowRight className="h-4 w-4 mr-2" />
          Continuar
        </Button>
      </form>
    </Form>
  );
}

export default FlightsDetails;
