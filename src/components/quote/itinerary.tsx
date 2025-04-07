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
  Map,
  Building,
  Calendar,
  Users,
  Home,
  Baby,
} from "lucide-react";
import { useStore } from "@/store";
import { Button } from "../ui/button";
import { DatePickerWithRange } from "../ui/date-picker-with-range";

const itinerarySchema = z.object({
  origin: z.string().min(1, { message: "El origen es requerido" }),
  destination: z.string().min(1, { message: "El destino es requerido" }),
  rooms: z.string().min(1, { message: "El número de habitaciones es requerido" }),
  adults: z.string().min(1, { message: "El número de adultos es requerido" }),
  children: z.string().optional(),
});

export type ItineraryFormValues = z.infer<typeof itinerarySchema>;

function Itinerary() {
  const {
    origin,
    destination,
    dates,
    rooms,
    adults,
    children,
    setOrigin,
    setDestination,
    setDates,
    setRooms,
    setAdults,
    setChildren,
    currentStep,
    setCurrentStep,
  } = useStore();

  const form = useForm<ItineraryFormValues>({
    resolver: zodResolver(itinerarySchema),
    defaultValues: {
      origin: origin || "",
      destination: destination || "",
      rooms: rooms || "1",
      adults: adults || "2",
      children: children || "0",
    },
  });

  const onSubmit = (data: ItineraryFormValues) => {
    try {
      // Guardar todos los campos
      setOrigin(data.origin);
      setDestination(data.destination);
      setRooms(data.rooms);
      setAdults(data.adults);
      setChildren(data.children || "0");

      console.log(data);
      setCurrentStep(currentStep + 1);
      toast.success("Itinerario guardado correctamente");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error al guardar el itinerario");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Origin and Destination */}
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="origin"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Map className="h-4 w-4" />
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
                  <Map className="h-4 w-4" />
                  Destino
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ej. Barcelona" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Date Range Picker */}
        <div className="grid gap-6">
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Fechas de viaje
            </FormLabel>
            <DatePickerWithRange
              value={dates}
              onChange={(dates) => {
                if (dates && "from" in dates) setDates(dates);
              }}
            />
          </FormItem>
        </div>

        {/* Rooms and Occupancy */}
        <div className="space-y-4">
          <FormLabel className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Habitaciones y Ocupación
          </FormLabel>
          <div className="p-4 border rounded-lg space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="rooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      Número de habitaciones
                    </FormLabel>
                    <FormControl>
                      <Input type="number" min="1" placeholder="Ej. 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="adults"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Adultos
                    </FormLabel>
                    <FormControl>
                      <Input type="number" min="1" placeholder="Ej. 2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="children"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Baby className="h-4 w-4" />
                      Niños
                    </FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="Ej. 0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full cursor-pointer">
          <ArrowRight className="h-4 w-4 mr-2" />
          Continuar
        </Button>
      </form>
    </Form>
  );
}

export default Itinerary;
