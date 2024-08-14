import React from 'react'
import EventCard from './event-card';
import axios from 'axios';
import PaginationControls from './pagination-controls';
import { getEvents } from '@/lib/server-utils';

type TEventsListProps = {
    city: string;
    page?: number;
}

export default async function EventsList({ city, page = 1 }: TEventsListProps) {

  const { eventsData, totalEvents } = await getEvents(city, page);
  const finalPage = Math.ceil(totalEvents / 6);

  return (
    <section className="max-w-[1100px] flex flex-wrap gap-10 justify-center">
        {eventsData.map((event) => {
            return (
            <section key={event.id}>
                <EventCard event={event} />
            </section>
            )
        }
    )}
    
    <PaginationControls city={city} page={page} finalPage={finalPage} />
    </section>
  )
}
