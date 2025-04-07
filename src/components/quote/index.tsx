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
import QuoteForm from "./quote-form";
import { CalendarRange } from "lucide-react";

function Quote() {
  return (
    <Card className="w-full my-12 sm:my-0 max-w-4xl max-h-fit mx-auto shadow-lg">
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
      <CardContent>
        <div className="mb-4 flex items-center gap-2 text-muted-foreground">
          <CalendarRange className="h-5 w-5" />
          <h2 className="text-lg font-medium">Información General</h2>
        </div>
        <QuoteForm />
      </CardContent>
    </Card>
  );
}

export default Quote;
