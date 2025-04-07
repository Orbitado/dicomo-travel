"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils/cn"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { es } from "date-fns/locale";

export function DatePickerWithRange({
  className,
  value,
  onChange,
}: React.HTMLAttributes<HTMLDivElement> & {
  value?: DateRange;
  onChange?: (date: DateRange) => void;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>(value);

  const handleDateSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    if (onChange && selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <div className={cn("grid gap-2 w-full", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              "h-12 px-3 overflow-hidden"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
            <div className="overflow-hidden">
              {date?.from ? (
                date.to ? (
                  <span className="block truncate text-sm">
                    {format(date.from, "dd MMM yyyy", { locale: es })} al{" "}
                    {format(date.to, "dd MMM yyyy", { locale: es })}
                  </span>
                ) : (
                  <span className="block truncate text-sm">
                    {format(date.from, "dd MMMM yyyy", { locale: es })}
                  </span>
                )
              ) : (
                <span className="block text-sm">Selecciona una fecha</span>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 z-50"
          sideOffset={5}
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from || new Date()}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
