import "server-only"
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import prisma from "./db";
import { capitalize } from "./utils";

export const getEvents = unstable_cache(async (city: string, page: number) => {
    const eventsData = await prisma.eventoEvent.findMany({
      where: {
        city: city === "all" ? undefined : capitalize(city),
      },
      orderBy: {
        date: "asc"
      },
      take: 6,
      skip: page < 1 ? 0 : (page - 1) * 6,
    });
  
    if (eventsData.length === 0) {
      return notFound();
    }
  
    const totalEvents = await prisma.eventoEvent.count({
      where: {
        city: city === "all" ? undefined : capitalize(city),
      },
    })
  
    return { eventsData, totalEvents };
  });
  
  export const getEvent = unstable_cache(async (slug: string) => {
    const event = await prisma.eventoEvent.findUnique({
      where: {
        slug: slug,
      },
    });
  
    if (!event) {
      return notFound();
    }
  
    return event;
  });
  