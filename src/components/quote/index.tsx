"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "../mode-toggle";
import CustomerData from "./customer-data";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useStore } from "@/store";
import { formSections } from "./data/form-sections";
import { ChevronDown, Eye } from "lucide-react";
import FlightsDetails from "./flights-details";

function Quote() {
  const { currentStep, setCurrentStep } = useStore();

  return (
    <Card className="w-full my-12 sm:my-0 max-w-4xl mx-auto shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 justify-between">
          <Avatar className="size-16 md:size-24">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-center space-y-2">
            <CardTitle className="text-2xl md:text-3xl font-bold">
              ¡Bienvenido a Dicomo Travel!
            </CardTitle>
            <CardDescription className="text-base md:text-lg">
              Complete el formulario para generar una cotización personalizada
            </CardDescription>
          </div>
          <div className="order-first md:order-last self-end md:self-auto">
            <ModeToggle />
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6 space-y-6">
        {formSections.map((section) => (
          <Collapsible
            key={section.id}
            open={currentStep === section.id}
            onOpenChange={() => setCurrentStep(section.id)}
            className="border rounded-md"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left cursor-pointer">
              <div className="flex items-center gap-2">
                <section.icon className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-lg font-medium">{section.title}</h2>
              </div>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  currentStep === section.id ? "transform rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              {section.id === 1 && <CustomerData />}
              {section.id === 2 && <FlightsDetails />}
              {section.id === 3 && (
                <div className="py-4 text-center text-muted-foreground">
                  Contenido de Servicios Terrestres y Alojamiento
                </div>
              )}
              {section.id === 4 && (
                <div className="py-4 text-center text-muted-foreground">
                  Contenido de Detalles de Precios y Condiciones
                </div>
              )}
              {section.id === 5 && (
                <div className="py-4 text-center text-muted-foreground">
                  Contenido de Datos de la Agencia
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        ))}

        <div className="flex justify-center pt-4">
          <Button className="w-full max-w-md flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Generar Cotización
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Quote;
