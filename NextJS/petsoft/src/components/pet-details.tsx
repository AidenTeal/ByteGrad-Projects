"use client";

import { usePetContext } from "@/lib/hooks";
import Image from "next/image";
import React, { useTransition } from "react";
import PetButton from "./pet-button";
import { checkoutPet } from "@/actions/actions";
import { TPet } from "@/lib/types";

export default function PetDetails() {
  const { selectedPet } = usePetContext();

  return (
    <section className="flex flex-col h-full w-full">
      {!selectedPet ? (
        <div className="h-full justify-center flex items-center">
          <EmptyView />
        </div>
      ) : (
        <>
          <TopBar selectedPet={selectedPet} />
          <OtherInfo selectedPet={selectedPet} />
          <PetNotes selectedPet={selectedPet} />
        </>
      )}
    </section>
  );
}

type Props = {
  selectedPet: TPet;
};

function TopBar({ selectedPet }: Props) {
  const [isPending] = useTransition();
  const { handleDeletePet } = usePetContext();

  return (
    <div className="flex items-center bg-white px-8 py-5 border-b border-light">
      <Image
        src={selectedPet.imageUrl}
        alt="Selected Pet Image"
        height={75}
        width={75}
        className="h-[75px] w-75[px] rounded-full object-cover"
      />

      <h2 className="text-3xl font-semibold leading-7 ml-5">
        {selectedPet.name}
      </h2>
      <div className="ml-auto space-x-2">
        <PetButton actionType="edit">
          Edit Pet
        </PetButton>
        <PetButton actionType="checkout" disabled={isPending} onClick={async () => {
          await handleDeletePet(selectedPet.id);
        }}>
          Checkout
        </PetButton>
      </div>
    </div>
  );
}

function OtherInfo({ selectedPet }: Props) {
  return (
    <div className="flex justify-around py-10 px-5 text-center">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">
          Owner Name
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{selectedPet.ownerName}</p>
      </div>

      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
        <p className="mt-1 text-lg text-zinc-800"> {selectedPet.age} </p>
      </div>
    </div>
  );
}

function PetNotes({ selectedPet }: Props) {
  return (
    <section className="bg-white px-7 py-5 rounded-md mb-9 mx-8 flex-1 border border-light">
      {selectedPet.notes}
    </section>
  );
}

function EmptyView() {
  return <p className="text-2xl font-medium"> No Pet Selected </p>
}