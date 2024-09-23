"use client";

import { useEffect, useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

export default function DateTimePicker({ onUpdate }) {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    onUpdate(dateTime);
  }, [dateTime]);

  // Update the date portion of the datetime
  const handleDateChange = (newDate) => {
    // Preserve the current time while updating the date
    const updatedDateTime = new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDate(),
      dateTime.getHours(),
      dateTime.getMinutes(),
      dateTime.getSeconds(),
    );
    setDateTime(updatedDateTime);
  };

  // Update the time portion of the datetime
  const handleTimeChange = (e) => {
    const [hours, minutes, seconds] = e.target.value.split(":");
    const updatedDateTime = new Date(
      dateTime.getFullYear(),
      dateTime.getMonth(),
      dateTime.getDate(),
      parseInt(hours, 10),
      parseInt(minutes, 10),
      parseInt(seconds, 10),
    );
    setDateTime(updatedDateTime);
  };

  return (
    <div className="flex flex-col items-start space-y-4">
      <div className="flex w-full justify-between gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "text-left font-normal",
                !dateTime && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateTime ? (
                dateTime.toLocaleDateString()
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateTime}
              onSelect={handleDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Input
          type="time"
          step="1"
          value={dateTime.toTimeString().slice(0, 8)}
          onChange={handleTimeChange}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm leading-none text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
