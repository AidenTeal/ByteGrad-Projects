"use client";

import H1 from "@/components/h1";
import PaymentButton from "@/components/payment-button";
import React from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type PaymentPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({ searchParams }: PaymentPageProps) {
  const { update, status } = useSession();
  const router = useRouter();

  return (
    <main className="flex flex-col items-center space-y-10">
      <H1>Petsoft access requires payment</H1>

      {searchParams.success && (
        <Button
          onClick={async () => {
            await update(true);
            router.push("/app/dashboard");
          }}
          disabled={status === "loading"}
        >
          Access PetSoft
        </Button>
      )}

      {!searchParams.success && <PaymentButton />}

      {searchParams.success && (
        <p className="text-sm text-green-600">
          Payment successful! You now have lifetime access to Petsoft.
        </p>
      )}
    </main>
  );
}
