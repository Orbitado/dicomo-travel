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
import { ArrowRight, Building, User, Phone, Mail } from "lucide-react";
import { useStore } from "@/store";
import { Button } from "../ui/button";

const customerDataSchema = z.object({
  clientName: z
    .string()
    .min(1, { message: "El nombre del cliente es requerido" }),
  contactPerson: z
    .string()
    .min(1, { message: "La persona de contacto es requerida" }),
  phone: z.string().optional(),
  email: z.string().optional(),
});

export type CustomerDataFormValues = z.infer<typeof customerDataSchema>;

function CustomerData() {
  const {
    setClientName,
    setContactPerson,
    setPhone,
    setEmail,
    clientName,
    contactPerson,
    phone,
    email,
  } = useStore();
  const { currentStep, setCurrentStep } = useStore();

  const form = useForm<CustomerDataFormValues>({
    resolver: zodResolver(customerDataSchema),
    defaultValues: {
      clientName: clientName || "",
      contactPerson: contactPerson || "",
      phone: phone || "",
      email: email || "",
    },
  });

  const onSubmit = (data: CustomerDataFormValues) => {
    try {
      setClientName(data.clientName);
      setContactPerson(data.contactPerson);
      setPhone(data.phone || "No especificado");
      setEmail(data.email || "No especificado");
      setCurrentStep(currentStep + 1);
      toast.success("Datos del Cliente guardados correctamente");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error al guardar los datos del cliente");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Empresa / Nombre del cliente
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ej. Empresa S.A." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactPerson"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Persona de contacto
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ej. Juan Pérez" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Teléfono
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ej. +1 234 567 8900" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Correo electrónico
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ej. correo@empresa.com" {...field} />
                </FormControl>
                <FormMessage />
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

export default CustomerData;
