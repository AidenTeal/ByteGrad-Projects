"use client";

import { usePetContext, useSearchContext } from "@/lib/hooks";
import { TPet } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useMemo } from "react";

type TPetList = {
  pets: TPet[];
};

export default function PetList() {
  const { pets, handleChangeSelectedPetID, selectedPetID } = usePetContext();
  const { petSearchTerm } = useSearchContext();

  // derived state
  const filteredPets = useMemo(() => pets.filter((pet) => pet.name.toLowerCase().includes(petSearchTerm)), [pets, petSearchTerm]);

  return (
    <ul className="bg-white border-b border-light">
      {filteredPets.map((pet) => (
        <li key={pet.id}>
          <button
            onClick={() => handleChangeSelectedPetID(pet.id)}
            className={cn("flex h-[70px] w-full cursor-pointer items-center px-5 text-base gap-3 hover:bg-[#eff1f2] focus:bg-[#eff1f2] transition", {
                "bg-[#eff1f2]": pet.id === selectedPetID,
            })}
          >
            <Image
              src={pet.imageUrl}
              alt="Pet Image"
              width={45}
              height={45}
              className="rounded-full object-cover w-[45px] h-[45px]"
            />
            <p className="font-semibold"> {pet.name} </p>
          </button>
        </li>
      ))}
    </ul>
  );
}
