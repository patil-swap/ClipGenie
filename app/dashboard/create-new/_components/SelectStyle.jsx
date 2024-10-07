"use client";
import Image from "next/image";
import React, { useState } from "react";

function SelectStyle({ onUserSelect }) {
  const styleOptions = [
    {
      name: "Realistic",
      image: "/real.jpg"
    },
    {
      name: "Cartoon",
      image: "/cartoon.jpg"
    },
    {
      name: "Comic",
      image: "/comic.jpg"
    },
    {
      name: "Water Color",
      image: "/water_color.jpg"
    },
    {
      name: "GTA",
      image: "/gta.jpg"
    }
  ];

  const [selectedOption, setSelectedOption] = useState();
  return (
    <div className="mt-7">
      <h2 className="font-bold text-primary text-2xl">Style</h2>
      <p className="text-gray-500">Select your video style</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-5">
        {styleOptions.map((item, index) => (
          <div
            key={index}
            className="relative hover:scale-105 transition-all cursor-pointer"
          >
            <Image
              className={`mt-3 h-40 object-cover rounded-lg w-full 
				${selectedOption == item.name && "border-4 border-muted"}`}
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              onClick={() => {
                setSelectedOption(item.name);
                onUserSelect("imageStyle", item.name);
              }}
            />
            <p className="w-full absolute p-1 bg-black bottom-0 rounded-b-lg text-primary">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectStyle;
