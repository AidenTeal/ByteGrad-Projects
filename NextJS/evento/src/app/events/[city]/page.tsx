import EventsList from '@/components/events-list';
import H1 from '@/components/h1';
import axios from 'axios';
import React, { Suspense } from 'react';
import Loading from './loading';
import { Metadata } from 'next';
import { capitalize } from '@/lib/utils';
import { z } from 'zod';

type TEventsPageMetadata = {
  params: {
    city: string;
  }
}

type TEventsPage = TEventsPageMetadata & {
  searchParams: {
    [key: string]: string | string[] | undefined;
  }
}

export function  generateMetadata({ params }: TEventsPageMetadata): Metadata {
  const city = params.city;

  return {
    title: city === "all" ? "All Events" : `Events in ${capitalize(city)}`,
  }
};

const pageNumberSchema = z.coerce.number().int().positive().optional();

export default async function EventsPage({
  params, searchParams
}: TEventsPage) {
  const city = params.city;
  const page = searchParams.page;
  const parsedPage = pageNumberSchema.safeParse(page)
  if (!parsedPage.success) {
    throw new Error("Invalid page number");
  }

  return (
    <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
      <H1 className="mb-28">
        { city === "all" && "All Events" }
        {city !== "all" && `Events in ${capitalize(city)}`}
      </H1>


      <Suspense key={city + page} fallback={<Loading />}>
        <EventsList city={city} page={parsedPage.data}/>
      </Suspense>
    </main>
  );
}