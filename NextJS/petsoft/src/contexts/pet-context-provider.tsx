"use client";
import { addPet, checkoutPet, editPet } from "@/actions/actions";
import { TPet, TPetEssentials } from "@/lib/types";
import { Pet } from "@prisma/client";
import { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

type TPetContextProvider = {
  data: TPet[];
  children: React.ReactNode;
};

type TPetContext = {
  pets: TPet[];
  selectedPetID: Pet["id"] | null;
  handleChangeSelectedPetID: (id: string) => void;
  selectedPet: TPet | undefined;
  numberOfPets: number;
  handleAddPet: (petData: TPetEssentials) => Promise<void>;
  handleEditPet: (petData: TPetEssentials) => Promise<void>;
  handleDeletePet: (id: Pet["id"]) => Promise<void>;
};

type TOptimisticReducer = {
  action: "add" | "edit" | "delete";
  payload: TPet | string;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data: pets,
  children,
}: TPetContextProvider) {
  const [selectedPetID, setSelectedPetID] = useState<Pet["id"] | null>(null);
  const [optimisticPets, setOptimisticPets] = useOptimistic<
    TPet[],
    TOptimisticReducer
  >(pets, (state: TPet[], { action, payload }) => {
    switch (action) {
      case "add":
        return [...state, payload as Pet];
      case "edit":
        return state.map((pet) =>
          pet.id === (payload as Pet).id ? { ...pet, ...(payload as Pet) } : pet
        );
      case "delete":
        return state.filter((pet) => pet.id !== (payload as Pet["id"]));
    }
  });

  // derived state
  const selectedPet: TPet | undefined = optimisticPets.find(
    (pet) => pet.id === selectedPetID
  );
  const numberOfPets = optimisticPets.length;

  // event handlers/actions
  const handleChangeSelectedPetID = (id: string) => {
    setSelectedPetID(id);
    console.log("selected pet id: ", id);
  };

  const handleAddPet = async (petData: TPetEssentials) => {
    setOptimisticPets({
      action: "add",
      payload: { ...petData, id: Date.now().toString() },
    });
    const error = await addPet(petData);
    if (error) {
      toast.warning(error.message);
    }
  };

  const handleDeletePet = async (id: Pet["id"]) => {
    setOptimisticPets({
      action: "delete",
      payload: id,
    });

    await checkoutPet(id);

    setSelectedPetID(null);
  };

  const handleEditPet = async (petData: TPetEssentials) => {
    const editPetWithID = editPet.bind(null, selectedPet!.id);

    const editedPetData = { ...petData, id: selectedPet!.id };
    setOptimisticPets({
      action: "edit",
      payload: editedPetData,
    });

    const error = await editPetWithID(petData);
    if (error) {
      toast.warning(error.message);
    }
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetID,
        handleChangeSelectedPetID,
        selectedPet,
        numberOfPets,
        handleAddPet,
        handleEditPet,
        handleDeletePet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
