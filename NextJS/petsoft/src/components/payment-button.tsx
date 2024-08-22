import { useTransition } from "react";
import { Button } from "./ui/button";
import { createCheckoutSession } from "@/actions/actions";

export default function PaymentButton() {
  const [ isPending, startTransition ] = useTransition();
  return (
    <Button
      disabled={isPending}
      onClick={async () => {
        startTransition(async () => {
          await createCheckoutSession();
        });
      }}
    >
      Buy lifetime access for $299 CAD
    </Button>
  );
}
