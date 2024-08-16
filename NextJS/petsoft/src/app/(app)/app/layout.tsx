import AppFooter from "@/components/app-footer";
import Appheader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import PetContextProvider from "@/contexts/pet-context-provider";
import React from "react";

export default async function Layout({ children }: { children: React.ReactNode }) {
  
  const response = await fetch("https://bytegrad.com/course-assets/projects/petsoft/api/pets");
  if (!response.ok) {
    throw new Error("Failed to fetch pet data");
  }
  const petData: TPets[] = await response.json();

  return (
    <>
      <BackgroundPattern />
      <div className="max-w-[1050px] mx-auto flex flex-col  min-h-screen">
        <Appheader />
        <PetContextProvider data={petData}>
          {children}
        </PetContextProvider>
        <AppFooter />
      </div>
    </>
  );
}
