"use client";
import { logoutUser } from "@/actions/actions";
import { Button } from "./ui/button";
import { useTransition } from "react";

export default function AccountButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      onClick={async () =>
        startTransition(async () => {
          await logoutUser();
        })
      }
    >
      Sign Out
    </Button>
  );
}
