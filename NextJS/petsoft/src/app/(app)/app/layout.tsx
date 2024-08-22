import AppFooter from "@/components/app-footer";
import Appheader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import { Toaster } from "@/components/ui/sonner";
import PetContextProvider from "@/contexts/pet-context-provider";
import SearchContextProvider from "@/contexts/search-context-provider";
import React from "react";
import { checkAuth, getPetsByUserID } from "@/lib/server-utils";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await checkAuth();
  const petData = await getPetsByUserID(session.user.id);

  return (
    <>
      <BackgroundPattern />
      <div className="max-w-[1050px] mx-auto flex flex-col  min-h-screen">
        <Appheader />
        <PetContextProvider data={petData}>
          <SearchContextProvider>{children}</SearchContextProvider>
        </PetContextProvider>
        <AppFooter />
      </div>

      <Toaster position="top-right" />
    </>
  );
}
