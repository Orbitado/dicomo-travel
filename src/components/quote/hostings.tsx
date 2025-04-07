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
  Building,
  MapPin,
  Utensils,
  Bed,
  Users,
  CalendarX,
  Star,
  X,
} from "lucide-react";
import { useStore } from "@/store";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { useState } from "react";
import {
  mealPlans,
  commonAmenities,
  MealPlan,
  Amenity,
} from "./data/hostings-data";

const hostingSchema = z.object({
  hotelName: z.string().min(1, { message: "El nombre del hotel es requerido" }),
  location: z.string().min(1, { message: "La ubicación es requerida" }),
  mealPlan: z.string().min(1, { message: "El régimen es requerido" }),
  roomType: z
    .string()
    .min(1, { message: "El tipo de habitación es requerido" }),
  maxAdults: z
    .string()
    .min(1, { message: "La ocupación máxima de adultos es requerida" }),
  maxChildren: z
    .string()
    .min(1, { message: "La ocupación máxima de niños es requerida" }),
  cancellationPolicy: z
    .string()
    .min(1, { message: "La política de cancelación es requerida" }),
  amenities: z
    .string()
    .min(1, { message: "Las amenidades destacadas son requeridas" }),
});

export type HostingFormValues = z.infer<typeof hostingSchema>;

function Hostings() {
  const {
    setHotelName,
    setLocation,
    setMealPlan,
    setRoomType,
    setMaxAdults,
    setMaxChildren,
    setCancellationPolicy,
    setAmenities,
    hotelName,
    location,
    mealPlan,
    roomType,
    maxAdults,
    maxChildren,
    cancellationPolicy,
    amenities,
    currentStep,
    setCurrentStep,
  } = useStore();

  // Estado para manejar las amenidades seleccionadas
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    amenities ? amenities.split(",").map((a) => a.trim()) : []
  );

  const form = useForm<HostingFormValues>({
    resolver: zodResolver(hostingSchema),
    defaultValues: {
      hotelName: hotelName || "",
      location: location || "",
      mealPlan: mealPlan || "",
      roomType: roomType || "",
      maxAdults: maxAdults || "2",
      maxChildren: maxChildren || "0",
      cancellationPolicy: cancellationPolicy || "",
      amenities: amenities || "",
    },
  });

  // Función para manejar la selección/deselección de amenidades
  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities((prev) => {
      if (prev.includes(amenityId)) {
        return prev.filter((id) => id !== amenityId);
      } else {
        return [...prev, amenityId];
      }
    });
  };

  const onSubmit = (data: HostingFormValues) => {
    try {
      setHotelName(data.hotelName);
      setLocation(data.location);
      setMealPlan(data.mealPlan);
      setRoomType(data.roomType);
      setMaxAdults(data.maxAdults);
      setMaxChildren(data.maxChildren);
      setCancellationPolicy(data.cancellationPolicy);

      // Convertir las amenidades seleccionadas a string
      const amenitiesString = selectedAmenities.join(", ");
      setAmenities(amenitiesString);

      setCurrentStep(currentStep + 1);
      toast.success("Información de hospedaje guardada correctamente");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error al guardar la información de hospedaje");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Hotel y Ubicación */}
          <FormField
            control={form.control}
            name="hotelName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Hotel / Resort
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ej. Grand Hotel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Ubicación
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej. Playa del Carmen, México"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Régimen y Tipo de habitación */}
          <FormField
            control={form.control}
            name="mealPlan"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Utensils className="h-4 w-4" />
                  Régimen
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione un régimen" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mealPlans.map((plan: MealPlan) => (
                      <SelectItem key={plan.value} value={plan.value}>
                        {plan.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roomType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Bed className="h-4 w-4" />
                  Tipo de habitación
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej. Habitación Doble con Vista al Mar"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Ocupación máxima */}
          <FormField
            control={form.control}
            name="maxAdults"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Ocupación máxima (adultos)
                </FormLabel>
                <FormControl>
                  <Input type="number" min="1" max="10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxChildren"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Ocupación máxima (niños)
                </FormLabel>
                <FormControl>
                  <Input type="number" min="0" max="10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Amenidades destacadas */}
          <FormItem className="md:col-span-2">
            <FormLabel className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Amenidades destacadas
            </FormLabel>
            <div className="flex flex-wrap gap-2 mt-2">
              {commonAmenities.map((amenity: Amenity) => (
                <Badge
                  key={amenity.id}
                  variant={
                    selectedAmenities.includes(amenity.id)
                      ? "default"
                      : "outline"
                  }
                  className="cursor-pointer hover:bg-white/90 hover:text-black transition-colors duration-200 text-sm"
                  onClick={() => toggleAmenity(amenity.id)}
                >
                  {amenity.label}
                  {selectedAmenities.includes(amenity.id) && (
                    <X className="ml-1 h-3 w-3" />
                  )}
                </Badge>
              ))}
            </div>
            <input
              type="hidden"
              {...form.register("amenities")}
              value={selectedAmenities.join(", ")}
            />
            {form.formState.errors.amenities && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.amenities.message}
              </p>
            )}
          </FormItem>
        </div>

        {/* Política de cancelación */}
        <FormField
          control={form.control}
          name="cancellationPolicy"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="flex items-center gap-2">
                <CalendarX className="h-4 w-4" />
                Política de cancelación
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ej. Cancelación gratuita hasta 24 horas antes de la llegada"
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full cursor-pointer">
          <ArrowRight className="h-4 w-4" />
          Continuar
        </Button>
      </form>
    </Form>
  );
}

export default Hostings;
