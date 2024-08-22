"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { usePetContext } from "@/lib/hooks";
import PetFormBtn from "./pet-form-btn";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_PET_IMAGE } from "@/lib/constants";
import { petSchema, TPetForm } from "@/lib/validations";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  const {
    register,
    trigger,
    formState: { errors },
    getValues,
  } = useForm<TPetForm>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      name: actionType === "edit" ? selectedPet?.name : "",
      ownerName: actionType === "edit" ? selectedPet?.ownerName : "",
      age: actionType === "edit" ? selectedPet?.age : undefined,
      imageUrl: actionType === "edit" ? selectedPet?.imageUrl : "",
      notes: actionType === "edit" ? selectedPet?.notes : "",
    }
  });

  return (
    <form
      className="flex flex-col"
      action={async () => {
        const result = await trigger();
        if (!result) return;

        onFormSubmission();

        const petData = getValues();
        petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE;

        if (actionType === "add") {
          await handleAddPet(petData);
        } else {
          await handleEditPet(petData);
        }
      }}
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            {...register("ownerName")}
          />
          {errors.ownerName && (
            <p className="text-red-500 text-sm">{errors.ownerName.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            {...register("age")}
          />
          {errors.age && (
            <p className="text-red-500 text-sm">{errors.age.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="iamgeUrl">ImageUrl</Label>
          <Input
            id="imageUrl"
            {...register("imageUrl")}
          />
          {errors.imageUrl && (
            <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            rows={3}
            {...register("notes")}
          />
          {errors.notes && (
            <p className="text-red-500 text-sm">{errors.notes.message}</p>
          )}
        </div>
      </div>
      <PetFormBtn actionType={actionType} />
    </form>
  );
}
