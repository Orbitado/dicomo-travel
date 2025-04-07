export interface MealPlan {
  value: string;
  label: string;
}

export interface Amenity {
  id: string;
  label: string;
}

export const mealPlans: MealPlan[] = [
  { value: "solo-alojamiento", label: "Solo Alojamiento" },
  { value: "desayuno", label: "Desayuno" },
  { value: "media-pension", label: "Media Pensión" },
  { value: "pension-completa", label: "Pensión Completa" },
  { value: "todo-incluido", label: "Todo Incluido" },
  { value: "todo-incluido-premium", label: "Todo Incluido Premium" },
];

export const commonAmenities: Amenity[] = [
  { id: "wifi", label: "WiFi Gratuito" },
  { id: "pool", label: "Piscina" },
  { id: "spa", label: "Spa" },
  { id: "gym", label: "Gimnasio" },
  { id: "restaurant", label: "Restaurante" },
  { id: "bar", label: "Bar" },
  { id: "beach", label: "Acceso a Playa" },
  { id: "parking", label: "Estacionamiento" },
  { id: "room-service", label: "Servicio a Habitación" },
  { id: "kids-club", label: "Club de Niños" },
  { id: "conference", label: "Salas de Conferencia" },
  { id: "business", label: "Centro de Negocios" },
];
