"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { es } from "date-fns/locale"

export function DatePickerWithRange({
  className,
  onChange,
}: React.HTMLAttributes<HTMLDivElement> & {
  onChange?: (date: DateRange | undefined) => void;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  const handleSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate)
    if (onChange) {
      onChange(selectedDate)
    }
  }

  return (
    <div className={cn("grid gap-2 w-full", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full h-12 justify-start text-left font-normal overflow-hidden",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-5 w-5 shrink-0" />
            <span className="truncate inline-block max-w-[calc(100%-2rem)]">
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "dd 'de' MMMM 'de' yyyy", { locale: es })} -{" "}
                    {format(date.to, "dd 'de' MMMM 'de' yyyy", { locale: es })}
                  </>
                ) : (
                  format(date.from, "dd 'de' MMMM 'de' yyyy", { locale: es })
                )
              ) : (
                <span>Seleccionar fecha</span>
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-4 max-w-[calc(100vw-2rem)]">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={1}
            className="md:p-0"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
