import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import React from "react";

function SelectDuration({ onUserSelect }) {
  return (
    <div className="mt-7">
      <h2 className="font-bold text-primary text-2xl">Duration</h2>
      <p className="text-gray-500">Select your video duration</p>
      <Select
        onValueChange={(value) => {
          onUserSelect("duration", value);
        }}
      >
        <SelectTrigger className="mt-2 p-6 text-lg w-full">
          <SelectValue placeholder="Content Duration" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="60 seconds" className="focus:text-primary">
            60 seconds
          </SelectItem>
          <SelectItem value="90 seconds" className="focus:text-primary">
            90 seconds
          </SelectItem>
          <SelectItem value="120 seconds" className="focus:text-primary">
            120 seconds
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectDuration;
