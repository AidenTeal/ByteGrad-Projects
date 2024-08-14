import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

type TPaginationControls = {
  city: string;
  page: number;
  finalPage: number;
};

const btnStyles =
  "text-white px-5 py-3 bg-white/5 rounded-md opacity-75 flex items-center gap-x-2 hover:opacity-100 transition text-sm";

export default function PaginationControls({
  city,
  page,
  finalPage,
}: TPaginationControls) {
  return (
    <section className="flex justify-between w-full">
      {page > 1 ? (
        <Link className={btnStyles} href={`${city}?page=${page - 1}`}>
          <ArrowLeftIcon />
          Previous
        </Link>
      ) : (
        <div />
      )}
      {page < finalPage ? (
        <Link className={btnStyles} href={`/events/${city}?page=${page + 1}`}>
          Next
          <ArrowRightIcon />
        </Link>
      ) : null}
    </section>
  );
}
