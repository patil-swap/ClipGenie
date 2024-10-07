"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function SelectTopic({ onUserSelect }) {
  const options = [
    "Custom Prompt",
    "Random AI Story",
    "Scary Story",
    "Historical Facts",
    "BedTime Story",
    "Motivational Story",
    "Fun Facts"
  ];

  const [selectedOption, setSelectedOption] = useState();
  return (
    <div>
      <h2 className="font-bold text-primary text-2xl">Content</h2>
      <p className="text-gray-500">What is the topic of your video</p>
      <Select
        onValueChange={(value) => {
          setSelectedOption(value);
          value != "Custom Prompt" && onUserSelect("topic", value);
        }}
      >
        <SelectTrigger className="mt-2 p-6 text-lg w-full">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          {options.map((item, index) => (
            <SelectItem key={index} value={item} className="focus:text-primary">
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedOption == "Custom Prompt" && (
        <Textarea
          className="mt-3"
          onChange={(e) => onUserSelect("topic", e.target.value)}
          placeholder="Write prompt on which you want to generate video"
        />
      )}
    </div>
  );
}

export default SelectTopic;
