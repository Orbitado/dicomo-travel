"use client";

import { useState, useEffect, useMemo } from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

interface TimePickerProps {
  className?: string;
  label?: string;
  selected?: Date;
  onChange?: (date: Date) => void;
  onTimeChange?: (time: string) => void;
  id?: string;
  name?: string;
  disabled?: boolean;
}

export function TimePicker({
  className,
  label,
  selected,
  onChange,
  onTimeChange,
  id,
  name,
  disabled,
}: TimePickerProps) {
  const defaultTime = selected
    ? `${selected.getHours().toString().padStart(2, "0")}:${selected
        .getMinutes()
        .toString()
        .padStart(2, "0")}`
    : "12:00";

  const [time, setTime] = useState<string>(defaultTime);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (selected) {
      const newTime = `${selected
        .getHours()
        .toString()
        .padStart(2, "0")}:${selected
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
      setTime(newTime);
    }
  }, [selected]);

  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      const hourString = hour.toString().padStart(2, "0");
      slots.push(`${hourString}:00`);
      slots.push(`${hourString}:30`);
    }
    return slots;
  }, []);

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);

    if (onTimeChange) {
      onTimeChange(newTime);
    }

    if (onChange) {
      const [hours, minutes] = newTime.split(":").map(Number);
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      date.setSeconds(0);
      onChange(date);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      {label && <Label htmlFor={id || "time"}>{label}</Label>}
      <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !time && "text-muted-foreground",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <Clock className="mr-2 h-4 w-4" />
            {time ? time : <span>Seleccionar hora</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-32 p-4" side="top">
          <div className="h-64 overflow-y-auto">
            {timeSlots.map((timeSlot) => (
              <Button
                key={timeSlot}
                variant={timeSlot === time ? "default" : "ghost"}
                onClick={() => {
                  handleTimeChange(timeSlot);
                  setOpen(false);
                }}
                className="w-full justify-center mb-1 rounded-none"
              >
                {timeSlot}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <Input
        id={id || "time"}
        name={name}
        type="time"
        value={time}
        disabled={disabled}
        onChange={(e) => handleTimeChange(e.target.value)}
        className="sr-only w-fit overflow-hidden"
      />
    </div>
  );
}
