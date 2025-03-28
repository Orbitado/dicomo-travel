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

function Quote() {
  return (
    <Card className="w-full max-w-7xl">
      <CardHeader>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 justify-between">
          <Avatar className="size-16 md:size-24">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-center space-y-2">
            <CardTitle className="text-2xl md:text-3xl font-bold">
              ¡Bienvenido de nuevo, Dicomo!
            </CardTitle>
            <CardDescription className="text-base md:text-lg">
              Complete los campos para generar una cotización
            </CardDescription>
          </div>
          <div className="order-first md:order-last self-end md:self-auto">
            <ModeToggle />
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent>
        <QuoteForm />
      </CardContent>
    </Card>
  );
}

export default Quote;
